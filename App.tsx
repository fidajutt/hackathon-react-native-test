
import { StyleSheet} from 'react-native';
import { useEffect, useState } from 'react';
import Router from './src/router/route'
import { Provider } from "react-redux";
import store from "./src/redux/store/index";
import * as ScreenOrientation from 'expo-screen-orientation';
console.warn = () => {};
console.error = () => {};
export default function App() {
  
  useEffect(() => {
    async function setOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    }

    setOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);


  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
});
