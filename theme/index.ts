export interface Theme {
  colors: {
    primary: string;
    primaryLight: string;
    accent: string;
    background: string;
    cardBackground: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    shadow: string;
  };
  isDark: boolean;
}

export const lightTheme: Theme = {
  colors: {
    primary: '#0066CC',
    primaryLight: '#CCE0FF',
    accent: '#E63946',
    background: '#F8F9FA',
    cardBackground: '#FFFFFF',
    text: '#212529',
    textSecondary: '#6C757D',
    border: '#DEE2E6',
    success: '#28A745',
    warning: '#FFC107',
    error: '#DC3545',
    shadow: '#000000',
  },
  isDark: false,
};

export const darkTheme: Theme = {
  colors: {
    primary: '#3F8CFF',
    primaryLight: '#2A4056',
    accent: '#E63946',
    background: '#121212',
    cardBackground: '#1E1E1E',
    text: '#F8F9FA',
    textSecondary: '#ADB5BD',
    border: '#343A40',
    success: '#2ECC71',
    warning: '#F39C12',
    error: '#E74C3C',
    shadow: '#000000',
  },
  isDark: true,
};