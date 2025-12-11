import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';


import LoginScreen from './src/screens/LoginScreen'; 

export default function App() {
  return (
    //Prueba para ver la conexion con Laravel, pueden borrarlo luego
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <LoginScreen />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
});