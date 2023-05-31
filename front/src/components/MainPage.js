import React, {useState, useEffect} from 'react';
import './MainPage.css';
import axios from "axios";
import APIService from '../APIService';
import Video from './Video';

function MainPage(props) {

  const [message, setMessage] = useState("Please select the seat");
  const [clickedSeats, setClickedSeats] = useState(Array(12).fill(false));
  const [stuNum, setStuNum] = useState(''); //학번
  const [seatNum, setSeatNum] = useState(''); //좌석번호
  const {reservations} = props
  //reservations 렌더링될 때
  useEffect(() => {
    setStuNum(props.reservations.stuNum)
    setSeatNum(props.reservations.seatNum)
  }, [props.reservations])

  const onClickHandler = e => {
    if (
      e.target.classList.contains("seat") &&
      !e.target.classList.contains("sold")
      ) {
        e.target.classList.toggle("selected");
        setSeatNum(e.target.value);
        setMessage("You have selected seat number " + e.target.value);
      } else {
        setMessage("This seat is unavailable");
      }
  };    
    
  const onClickSelection = () => {
    alert("Student number : " + stuNum + "\nSeat number : " + seatNum);
    const clickedIndex = parseInt(seatNum) - 1;
    setClickedSeats((prevSeats) => {
      const newClickedSeats = [...prevSeats];
      newClickedSeats[clickedIndex] = true;
      return newClickedSeats;
    });
    setMessage("Please select the seat");
    APIService.InsertReservation({seatNum, stuNum})
    .then(resp => console.log(resp))
  };

  const onClickDelete = () => {
    // 입력한 학번과 일치하는 예약 데이터 삭제
      const reservedStuNums = props.reservations.filter((reservation) => {
        if (reservation.stuNum === stuNum) {

          // 해당 좌석의 클래스명을 "seat"으로 변경
          const seatIndex = parseInt(reservation.seatNum) - 1;
          setClickedSeats(prevSeats => {
            const newClickedSeats = [...prevSeats];
            newClickedSeats[seatIndex] = false;
            return newClickedSeats;
          });         
          APIService.DeleteReservation(reservation.id)
            .then(resp => {
              console.log(resp);
          // console.log(reservation.id)         
            })
      // console.log(reservation.stuNum)
    }})


  }

  // useEffect(() => {
  //   // 데이터베이스에서 이미 예약된 seatNum 값을 가져옵니다.
  //   const reservedSeatNums = props.reservations.map((reservation) => reservation.seatNum);
  //   // 가져온 seatNum 값을 가진 버튼의 클래스명을 "seat sold"로 변경합니다.
  //   const updatedClickedSeats = clickedSeats.map((clicked, index) => {
  //     const seatNumber = index + 1;
  //     if (reservedSeatNums.includes(seatNumber.toString())) {
  //       return true;
  //     } else {
  //       return clicked;
  //     }
  //   });
  //   setClickedSeats(updatedClickedSeats);
  // }, [props.reservations]);

  useEffect(() => {
    // 클라이언트의 clickedSeats에서 해당 예약 정보 제거
    const updatedClickedSeats = clickedSeats.map((clicked, index) => {
      const seatNumber = index + 1;
      const isReserved = props.reservations.some(reservation => reservation.seatNum === seatNumber.toString());
      return isReserved ? true : clicked;
    });
    setClickedSeats(updatedClickedSeats);
  }, [props.reservations]);
  
  return (      
    <div className="all">
      <div className='main'>
        <Video reservations={reservations}></Video>
        <div className="library-selection">
            
          <div className="library-container">
              <label> Student number :</label>
              <input type='text' style={{marginLeft:'5px', marginRight:'5px'}} value={stuNum} placeholder='학번을 입력하세요' onChange={(e) => setStuNum(e.target.value)}></input>
          </div>

          <ul className="showcase">
            <li>
              <div className="seat"></div>
              <small>Available</small>
            </li>
            <li>
              <div className="seat selected"></div>
              <small>Selected</small>
            </li>
            <li>
              <div className="seat sold"></div>
              <small>Unavailable</small>
            </li>
          </ul>
          
          <div className="container">
            <div className="row">
            {clickedSeats.slice(0,6).map((clicked, index) => (
                    <button
                      className={clicked ? "seat sold" : "seat"}
                      value={index + 1}
                      onClick={onClickHandler}
                      key={index + 1}
                    >
                      {index + 1}
                    </button>
            ))}
            </div>
            <div className="row">
            {clickedSeats.slice(6).map((clicked, index) => (
                    <button
                      className={clicked ? "seat sold" : "seat"}
                      value={index + 7}
                      onClick={onClickHandler}
                      key={index + 7}
                    >
                      {index + 7}
                    </button>
            ))}
            </div>

            <p className="text">{message}</p>
            <button className='selection' onClick={onClickSelection}>select</button>
            <button className='selection' onClick={onClickDelete}>delete</button>
          </div>          

        </div>
      </div>           
    </div>

  );
}
  
export default MainPage;