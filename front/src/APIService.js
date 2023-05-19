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
}