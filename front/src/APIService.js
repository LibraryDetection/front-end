export default class APIService {

  static InsertReservation(body) {
      return fetch('http://127.0.0.1:8000/reservations/', {
          'method' : 'POST',
          headers : {
            'Content-Type' : 'application/json',
          },
          body:JSON.stringify(body)
        }).then(resp => resp.json())
        .catch(error => console.log(error))
  }

  static DeleteReservation(reservations_id) {
    return fetch(`http://127.0.0.1:8000/reservations/${reservations_id}`, {
        'method' : 'DELETE',
        headers : {
          'Content-Type' : 'application/json',
        }
      })
  }

  // static GetReservation(body) {
  //   return fetch('http://127.0.0.1:8000/reservations/', {
  //     'method' : 'GET',
  //     headers : {
  //       'Content-Type' : 'application/json',
  //     },
  //     body:JSON.stringify(body)
  //   }).then(resp => resp.json())
  //   .catch(error => console.log(error))

  // }
}
