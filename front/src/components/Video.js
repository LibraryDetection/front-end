import React, {useState} from 'react';
import './MainPage.css';
import YouTubePlayer from "./YouTubePlayer";

function Video() {
    const [url, setUrl] = useState("https://www.youtube.com/embed/VVFtWKCHkL0?autoplay=1&mute=1")

    return (
            <div className='video'>
                <div className="video-streaming">
                    <YouTubePlayer/>
                </div>
                <div className='url'>
                    <p className='url-text'>Input URL</p>
                    <input className='url-input' type='url' onChange={(e)=>setUrl(e.target.value)}></input>
                </div>
            </div>
    )
}

export default Video