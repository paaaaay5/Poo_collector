import React, {useState,createContext} from 'react';
import WebcamCapture from './WebcamCapture';

import CameraPermission from './CameraPermission';
import GyroSensor from './GyroSensor';
import Geolocation from './Geolocation';

import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator, Button} from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

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


function App({user}) {  
  return (
    <>
      <div className="App">
        <CameraPermission />
        <WebcamCapture user = {user}/>
      </div>
      <div style={styles.container}>
        <button onClick={get_gyro_permission}>Gyro</button>
        <GyroSensor />
        <Geolocation />
      </div>
    </>
  );
}

const styles = {
  container: { width: '30%', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export const UserCount = createContext({ name: -1, lat:0.0, lng:0.0, acc_x: 0.0,acc_y: 0.0, acc_z: 0.0, image:''})
export default withAuthenticator(App);