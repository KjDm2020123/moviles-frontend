import React from 'react';
import { View, Button, Alert, Text } from 'react-native';
import api from '../api/axios'; 


//Prueba para ver la conexion con Laravel, puede borrarlo luego
const LoginScreen = () => {

  const verificarConexion = async () => {
    try {
      console.log("Intentando conectar...");
      
      const response = await api.get('/prueba');
      
      console.log("Respuesta:", response.data);
      Alert.alert("Éxito", response.data.mensaje); 
      
    } catch (error) {
      console.error("Error de conexión:", error);
      
      if (error.response) {
        Alert.alert("Error servidor", `Código: ${error.response.status}`);
      } else if (error.request) {
        Alert.alert("Error de Red", "No se pudo conectar con el servidor. Verifica la IP.");
      } else {
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{textAlign: 'center', marginBottom: 20}}>Pantalla de Login</Text>
      
      <Button title="Probar Conexión con Laravel" onPress={verificarConexion} />
    </View>
  );
};

export default LoginScreen;