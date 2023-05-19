import React from 'react'

function ReservationList(props) {
  return (
    <div>
      {props.reservations && props.reservations.map(reservation => {
        return (
         <div key={reservation.id}>
          <h3>{reservation.seatNum}</h3>
          <h5>{reservation.stuNum}</h5>
         </div> 
        )
      })}


    </div>
  )
}

export default ReservationList