/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


/////////////////////////module imports
import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';


////////////////////////Navigation Imports
import MainStack from './Components/Navigations/MainStack'

const App = (props) => {

  
  return (
    <>
      <MainStack />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};


export default App;
