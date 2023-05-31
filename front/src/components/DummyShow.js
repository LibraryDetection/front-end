import React, {useEffect, useState} from "react";
import APIService from "../APIService";

function DummyShow(props) {

    const [data, setData] = useState([]);
    const {reservations} = props
    const [stuNum, setStuNum] = useState(''); //학번
    const [seatNum, setSeatNum] = useState(''); //좌석번호
  

    useEffect(() => {

        const interval = setInterval(() => {
            getDummyData();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const getDummyData = async () => {
        fetch('http://127.0.0.1:8000/dummyModel/', {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(resp => resp.json())
            .then(resp => setData(resp))
            .catch(error => console.log(error))
    }
    useEffect(() => {
        setStuNum(props.reservations.stuNum)
        setSeatNum(props.reservations.seatNum)
      }, [props.reservations])
    
    return (
        <div>
            {data.map((item) => (
                <div key={item.className}>
                    <span>{item.className}  {item.classCount}</span>
                </div>
            ))}
            {data.find((item) => item.className === 'seat' && item.classCount >= 15) && (
                // console.log("Seat count is 15 or more")
                // console.log(props.reservations)
                props.reservations.filter((reservation) => {
                    if (reservation.seatNum === '12') {
                        APIService.DeleteReservation(reservation.id)
                        .then(resp => {
                            console.log(resp);
                        })
                    }
                })
            )}
        </div>
    )

}

export default DummyShow;