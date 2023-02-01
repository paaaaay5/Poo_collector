import React, { useState } from 'react';
import Webcam from "react-webcam";

const WebcamCapture = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const webcamRef = React.useRef(null);

    const capture = React.useCallback(
    () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImageSrc(imageSrc);
    },
    [webcamRef]
    );

    const send_server = () => {
        //サーバーに画像を送る処理を追加
        async function send () {
            setImageSrc(null);
        }
        send()
    }

    return (
    <>
        {!imageSrc ? (
            <div>
                <div style={{position: 'relative' }}>
                    <Webcam
                    audio={false}
                    height={'100%'}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={'100%'}
                    videoConstraints={{
                        facingMode: "environment"
                        }}
                    onUserMediaError={() => window.alert('cant access your camera')}
                    />
                </div>
                <div style= {{align:"center" }}>
                    <button onClick={capture} style={{width: '100%'}}>Capture!!</button>
                </div>
            </div>
        ) : (        
            <div>
                <img src={imageSrc} alt="webcam capture" />
                <div align="center">
                    <button onClick={send_server} style={{width: '100%'}}>Send</button>
                </div>
            </div>     
        )}
    </>
    );
};

export default WebcamCapture;


