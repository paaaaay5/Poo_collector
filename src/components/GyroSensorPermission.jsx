import React from 'react'

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
        <button onClick={get_gyro_permission}>Gyro permission</button>
    </>
    )
}

export default GyroSensorPermission