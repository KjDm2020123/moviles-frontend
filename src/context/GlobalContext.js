import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const GlobalContext = createContext();

// URL base de tu API Laravel
const API_URL = 'http://tu-dominio-laravel.com/api'; // Cambia esto por tu URL
// Para desarrollo local (Android):
// const API_URL = 'http://10.0.2.2:8000/api';
// Para desarrollo local (iOS):
// const API_URL = 'http://localhost:8000/api';

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Cargar datos al iniciar
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('@user');
      const savedToken = await AsyncStorage.getItem('@token');
      const savedTheme = await AsyncStorage.getItem('@theme');

      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedToken) setToken(savedToken);
      if (savedTheme === 'dark') setIsDarkMode(true);
    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Headers comunes para las peticiones
  const getHeaders = () => {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  };

  // Función genérica para hacer peticiones
  const apiRequest = async (endpoint, method = 'GET', data = null) => {
    const url = `${API_URL}${endpoint}`;
    
    const config = {
      method,
      headers: getHeaders(),
    };

    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, config);
      const result = await response.json();

      if (!response.ok) {
        // Si el token expiró
        if (response.status === 401) {
          await logout();
          Alert.alert('Sesión expirada', 'Por favor inicia sesión nuevamente');
        }
        throw new Error(result.message || 'Error en la petición');
      }

      return result;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const data = await apiRequest('/auth/login', 'POST', {
        email,
        password,
      });

      if (data.success) {
        await AsyncStorage.setItem('@user', JSON.stringify(data.user));
        await AsyncStorage.setItem('@token', data.token);
        setUser(data.user);
        setToken(data.token);
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Registro
  const register = async (userData) => {
    try {
      const data = await apiRequest('/auth/register', 'POST', userData);
      
      if (data.success) {
        await AsyncStorage.setItem('@user', JSON.stringify(data.user));
        await AsyncStorage.setItem('@token', data.token);
        setUser(data.user);
        setToken(data.token);
      }

      return data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      if (token) {
        await apiRequest('/auth/logout', 'POST');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await AsyncStorage.multiRemove(['@user', '@token']);
      setUser(null);
      setToken(null);
    }
  };

  // Recuperar contraseña
  const forgotPassword = async (email) => {
    return apiRequest('/auth/forgot-password', 'POST', { email });
  };

  // Verificar código
  const verifyResetCode = async (email, code) => {
    return apiRequest('/auth/verify-reset-code', 'POST', { email, code });
  };

  // Restablecer contraseña
  const resetPassword = async (resetToken, password, passwordConfirmation) => {
    return apiRequest('/auth/reset-password', 'POST', {
      reset_token: resetToken,
      password,
      password_confirmation: passwordConfirmation,
    });
  };

  // Obtener perfil
  const getProfile = async () => {
    const data = await apiRequest('/auth/profile');
    
    if (data.success) {
      await AsyncStorage.setItem('@user', JSON.stringify(data.user));
      setUser(data.user);
    }

    return data;
  };

  // Actualizar perfil
  const updateProfile = async (profileData) => {
    const data = await apiRequest('/auth/profile', 'PUT', profileData);
    
    if (data.success) {
      await AsyncStorage.setItem('@user', JSON.stringify(data.user));
      setUser(data.user);
    }

    return data;
  };

  // Cambiar contraseña
  const changePassword = async (currentPassword, newPassword) => {
    return apiRequest('/auth/change-password', 'POST', {
      current_password: currentPassword,
      password: newPassword,
      password_confirmation: newPassword,
    });
  };

  // Toggle tema oscuro
  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem('@theme', newMode ? 'dark' : 'light');
  };

  const value = {
    user,
    token,
    loading,
    isDarkMode,
    login,
    register,
    logout,
    forgotPassword,
    verifyResetCode,
    resetPassword,
    getProfile,
    updateProfile,
    changePassword,
    toggleDarkMode,
    apiRequest,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);