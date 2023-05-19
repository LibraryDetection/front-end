import React, {useState, useEffect} from 'react';
import './MainPage.css';
import axios from "axios";
import APIService from '../APIService';
import Video from './Video';

function MainPage(props) {

  const [message, setMessage] = useState("Please select the seat");
  const [clicked1, setClicked1] = useState(false);
  const [clicked2, setClicked2] = useState(false);
  const [clicked3, setClicked3] = useState(false);
  const [clicked4, setClicked4] = useState(false);
  const [clicked5, setClicked5] = useState(false);
  const [clicked6, setClicked6] = useState(false);
  const [clicked7, setClicked7] = useState(false);
  const [clicked8, setClicked8] = useState(false);
  const [clicked9, setClicked9] = useState(false);
  const [clicked10, setClicked10] = useState(false);
  const [clicked11, setClicked11] = useState(false);
  const [clicked12, setClicked12] = useState(false);
  const [stuNum, setStuNum] = useState(''); //학번
  const [seatNum, setSeatNum] = useState(''); //좌석번호

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
    if (seatNum == 1) {
      setClicked1(true);
    } else if (seatNum == 2) {
      setClicked2(true);
    } else if (seatNum == 3) {
      setClicked3(true);
    } else if (seatNum == 4) {
      setClicked4(true);
    } else if (seatNum == 5) {
      setClicked5(true);
    } else if (seatNum == 6) {
        setClicked6(true);
    } else if (seatNum == 7) {
      setClicked7(true);
    } else if (seatNum == 8) {
      setClicked8(true);
    } else if (seatNum == 9) {
      setClicked9(true);
    } else if (seatNum == 10) {
      setClicked10(true);
    } else if (seatNum == 11) {
      setClicked11(true);
    } else if (seatNum == 12) {
      setClicked12(true);
    }
    setMessage("Please select the seat");
    APIService.InsertReservation({seatNum, stuNum})
    .then(resp => console.log(resp))
  };
      

  return (      
    <div className="all">
      <div className='main'>
        <Video></Video>
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
          {/* seatNum get해서 일치하는거는 classname을 seat sold로 변경해줘야 함. */}
          {/* {props.reservations.seatNum} */}
          <div className="container">
            <div className="row">
              <button className={clicked1 ? "seat sold" : "seat 1"} value='1' onClick={onClickHandler}>1</button>
              <button className={clicked2 ? "seat sold" : "seat 2"} value='2' onClick={onClickHandler}>2</button>
              <button className={clicked3 ? "seat sold" : "seat 3"} value='3' onClick={onClickHandler}>3</button>
              <button className={clicked4 ? "seat sold" : "seat 4"} value='4' onClick={onClickHandler}>4</button>
              <button className={clicked5 ? "seat sold" : "seat 5"} value='5' onClick={onClickHandler}>5</button>
              <button className={clicked6 ? "seat sold" : "seat 6"} value='6' onClick={onClickHandler}>6</button>
            </div>
  
            <div className="row">
              <button className={clicked7 ? "seat sold" : "seat 7"} value='7' onClick={onClickHandler}>7</button>
              <button className={clicked8 ? "seat sold" : "seat 8"} value='8' onClick={onClickHandler}>8</button>
              <button className={clicked9 ? "seat sold" : "seat 9"} value='9' onClick={onClickHandler}>9</button>
              <button className={clicked10 ? "seat sold" : "seat 10"} value='10' onClick={onClickHandler}>10</button>
              <button className={clicked11 ? "seat sold" : "seat 11"} value='11' onClick={onClickHandler}>11</button>
              <button className={clicked12 ? "seat sold" : "seat 12"} value='12' onClick={onClickHandler}>12</button>
            </div>
          </div>

          <p className="text">
            {message}
          </p>
          <button className='selection' onClick={onClickSelection}>select</button>

        </div>
      </div>           
    </div>

  );
}
  
export default MainPage;