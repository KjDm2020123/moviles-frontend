import { Platform } from 'react-native';

export const getShadowStyle = (elevation = 3, shadowOpacity = 0.1, shadowRadius = 4) => {
  if (Platform.OS === 'web') {
    return {
      boxShadow: `0px 2px ${shadowRadius}px rgba(0,0,0,${shadowOpacity})`,
    };
  }
  return {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: shadowOpacity,
    shadowRadius: shadowRadius,
    elevation: elevation,
  };
};