import React, {useEffect, useState} from 'react';
import html2canvas from "html2canvas";
import axios from "axios";
import DummyShow from "./DummyShow";

const YouTubePlayer = () => {

    const [isPlaying, setIsPlaying] = useState(true);
    const [currentCount, setCurrentCount] = useState(0); //확인용
    const [imageUrl, setImageUrl] = useState('');

    const handlePause = () => {
        setIsPlaying(false);
    }

    const handlePlay = () => {
        setIsPlaying(true);
    }

    useEffect(() => {

        const interval = setInterval(() => {
            if (isPlaying) {
                setCurrentCount(currentCount + 1);
                sendCurrentScreenShotToServer();
            }
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [isPlaying]);

    const sendCurrentScreenShotToServer = async () => {
        try {
            const canvas = await html2canvas(document.getElementById("videoId"), {
                backgroundColor: '#342D2D',
                allowTaint: true
            });

            const c_url = canvas.toDataURL("image/jpeg");
            setImageUrl(c_url)

            await sendImageToServer(c_url)

        } catch (e) {
            console.error(e);
        }
    };

    const sendImageToServer = async (imageData) => {
        const formData = new FormData();
        formData.append("data", imageData)

        await axios.post('http://127.0.0.1:8000/upload/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.log(error)
        })
    }

    return (
        <div>
            <video id='videoId'
                   src='/test.mp4'
                   loop muted controls autoPlay
                   width="560"
                   height="360"
                   onPause={handlePause}
                   onPlay={handlePlay}
            />
            <p>CurrentCount : {currentCount}</p>
            <img src={imageUrl} width='560' height="360"/>
            <div><DummyShow/></div>
        </div>
    )

}

export default YouTubePlayer;