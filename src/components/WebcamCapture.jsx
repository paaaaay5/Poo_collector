import React, { useState } from 'react';
import Webcam from "react-webcam";
import {Button} from '@aws-amplify/ui-react';
//import { listNotes } from './graphql/queries';
import { API ,Storage} from 'aws-amplify';
import { createTodo as createNoteMutation, deleteTodo as deleteNoteMutation } from '../graphql/mutations';
import { UserCount } from '../App'

const WebcamCapture = (props) => {

    const [imageSrc, setImageSrc] = useState(null);
    const [sensor_Memo, setValues] = useState({
        lat : 0,
        lng : 0,
        acc_x : 0,
        acc_y : 0,
        acc_z : 0
    })

    const username = props.user.username || 'guest' + props.user;
    const webcamRef = React.useRef(null);

    //captureボタンが押された際の関数
    const use_Sensor = () => {
        capture();
        get_sensor_values();
    }

    //レンダリングの負荷を抑える
    const capture = React.useCallback(
    () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImageSrc(imageSrc);
    },
    [webcamRef]
    );

    //センサの値を取得
    function get_sensor_values () {
        setValues({
            lat : UserCount.lat || 0,
            lng : UserCount.lng || 0,
            acc_x : UserCount.acc_x || 0,
            acc_y : UserCount.acc_y || 0,
            acc_z : UserCount.acc_z || 0
        })
    }

    //DBとSTORGEにPOST
    const send_server = () => {
        async function send () {      
            if (imageSrc) {
                let now = new Date();
                let file_name = now.getFullYear() + '_' + (now.getMonth() + 1) + '_' + 
                                now.getDate() + '_' + now.getHours() + '_' + now.getMinutes() + '_' + username + '.jpeg'
                let formData = { name: 0, lat: sensor_Memo.lat, lng: sensor_Memo.lng, 
                    acc_x: sensor_Memo.acc_x, acc_y: sensor_Memo.acc_y, acc_z: sensor_Memo.acc_z, 
                    image:file_name};
                //console.log(formData);
                await API.graphql({ query: createNoteMutation, variables: { input: formData } });//DB
                await Storage.put(file_name, imageSrc);//FILE STORAGE
                setImageSrc(null);
            }
        }
        send()
    }

    //際撮影を行うための関数
    const remove_img = () => {
        setImageSrc(null);
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
                <div style= {{ width: '30%' , margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 }}>
                    <Button onClick={use_Sensor}>Capture</Button>
                </div>
            </div>
        ) : (        
            <div>
                <img src={imageSrc} alt="webcam capture" />
                <div style= {{ width: '30%' , margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 }}>
                            <Button onClick={send_server}>Send</Button>
                            <Button onClick={remove_img}>Retake</Button>
                </div>
            </div>     
        )}
    </>
    );
};

export default WebcamCapture;