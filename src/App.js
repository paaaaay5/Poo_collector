import React from 'react';
import WebcamCapture from './WebcamCapture';
import CameraPermission from './CameraPermission';
//import GyroSensor from './GyroSensor';

import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App({signOut, user}) {
  return (
    <>
      <div className="App">
        <CameraPermission />
        <WebcamCapture />
        {/* <GyroSensor /> */}
      </div>
      <div style={styles.container}>
        <Heading level={1}>{user.username}さん、こんにちは</Heading>
        <Button onClick={signOut}>Sign out</Button>
      </div>
    </>
  );
}
const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default withAuthenticator(App);