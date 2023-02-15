import React, {createContext} from 'react';

import WebcamCapture from './components/WebcamCapture';
import CameraPermission from './components/CameraPermission';

import GyroSensor from './components/GyroSensor';
import Geolocation from './components/Geolocation';

import GyroSensorPermission from './components/GyroSensorPermission';
import { RequireAuth } from './components/RequireAuth';
import { Login } from './components/Login';

import { BrowserRouter, Route, Routes,useNavigate} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { useAuthenticator ,Authenticator, Button } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

function Myroutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'element={<LOGIN />} />
          <Route path='/home' element ={
            <RequireAuth>
              <Home />
            </RequireAuth>} />
        <Route path='/guest' element={<GUEST />} />
      <Route path="/login" element={<Login />} />

      </Routes>
        </BrowserRouter>
  )
}

function App() {  
  return (
    <Authenticator.Provider>
      <Myroutes/>
    </Authenticator.Provider>
  );
}

function LOGIN(){
  const navigate = useNavigate();
  return (
    <>
    <div style = {{textalign: 'center'}}>
      <div style= {{ width: '50%' , margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 }}>
        <Button onClick={() => navigate('/guest')}>ゲスト</Button>
      </div>
      <div style= {{ width: '50%' , margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 }}>
        <Button onClick={() => navigate('/home')}>ログイン</Button>
      </div>
    </div>
    </>
  )
}

function Home({}){
  const {signOut,user} = useAuthenticator((context) => [
    context.route,
    context.user,
    context.signOut,
  ]);

  return (
    <>
      <div>
        <CameraPermission />
        <WebcamCapture user = {user}/>
      </div>
      <div style={styles.container}>
        <GyroSensorPermission />
        <GyroSensor />
        <Geolocation />
        <Button onClick={signOut}>SignOut</Button>
      </div>
    </>
  )
}

function GUEST(){
  return (
    <>
      <div>
        <CameraPermission />
        <WebcamCapture user = {uuidv4()}/>
      </div>
      <div style={styles.container}>
        <GyroSensorPermission />
        <GyroSensor />
        <Geolocation />
      </div>
    </>
  )
}

const styles = {
  container: { width: '30%', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export const UserCount = createContext({lat:0.0, lng:0.0, acc_x: 0.0,acc_y: 0.0, acc_z: 0.0})
export default App;

//TODO
//1.ギャラリー機能の追加(https://aws.amazon.com/jp/getting-started/hands-on/build-react-app-amplify-graphql/module-four/)
//2.ゲストユーザでのログイン(https://zenn.dev/toromo/scraps/5d3d2ac7e92fba)
//3.固定されたヘッダー、フッター
//4.UI(https://mui.com/)