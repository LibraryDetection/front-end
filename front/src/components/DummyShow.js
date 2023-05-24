import React, {useEffect, useState} from "react";

const DummyShow = () => {

    const [data, setData] = useState([]);


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

    return (
        <div>
            {data.map((item) => (
                <div key={item.className}>
                    <span>{item.className}  {item.classCount}</span>
                </div>
            ))}
        </div>
    )

}

export default DummyShow;