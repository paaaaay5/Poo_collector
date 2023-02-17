import React from 'react'
import { Button } from '@aws-amplify/ui-react';

const GyroSensorPermission = () => {
    const get_gyro_permission = () => {
        // ジャイロセンサーが使用可能だったら
        if(window.DeviceOrientationEvent){ // ユーザーにアクセスの許可を求める関数があったら（iOS13以降の対応）
            if(DeviceOrientationEvent.requestPermission){
                DeviceOrientationEvent.requestPermission();
            
            }else{// アクセスの許可を求める関数がなかったら
                console.log('no permission')
                }
            }
        }
    return (
    <>
        <div style= {{ width: '50%' , margin: '0 auto',justifyContent: 'center', padding: 20 }}>
            <Button onClick={get_gyro_permission}>Enable Gyro</Button>
        </div>
    </>
    )
}

export default GyroSensorPermission;