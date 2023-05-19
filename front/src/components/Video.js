import React, {useState} from 'react';
import './MainPage.css';

function Video() {
    const [url, setUrl] = useState("https://www.youtube.com/embed/VVFtWKCHkL0?autoplay=1&mute=1")

    return (
            <div className='video'>
                <div className="video-streaming">
                    <iframe width="560" height="315" src={url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                <div className='url'>
                    <p className='url-text'>Input URL</p>
                    <input className='url-input' type='url' onChange={(e)=>setUrl(e.target.value)}></input>
                </div>
            </div>
    )
}

export default Video