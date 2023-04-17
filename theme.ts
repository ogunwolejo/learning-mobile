import { MD3LightTheme, useTheme } from 'react-native-paper';

export const theme = {
    ...MD3LightTheme, // or MD3DarkTheme
    roundness: 2,
    colors: {
      ...MD3LightTheme.colors,
      brandPrimary: '#33907C',
    },
};

export type AppTheme = typeof theme;

export const useAppTheme = () => useTheme<AppTheme>();
