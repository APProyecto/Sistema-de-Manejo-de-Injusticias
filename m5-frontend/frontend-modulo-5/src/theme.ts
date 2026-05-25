import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    primary: { main: '#eeca3c' },
    secondary: {main: '#d5dcdc' },
    background: { default: '#292924', paper: '#292924'},
    text: {primary: '#ffffff'}
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, fontSize: '40px', color: '#ffffff'},
    h2: { fontWeight: 700, fontSize: '32px', color: '#ffffff'},
    h3: { fontWeight: 600, fontSize: '24px', color: '#ffffff'},
    body1: { fontWeight: 400, fontSize: '17px', color: '#ffffff'},
    body2: { fontWeight: 700, fontSize: '18px', color: '#ffffff'},
    caption: { fontWeight: 300, fontSize: '12px', color: '#ffffff'},
    button: { textTransform: 'none' },  // Botones sin mayúsculas automáticas
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          // Esto aplica a TODOS los Container
          paddingTop: '0px',
          paddingBottom: '0px',
          padding: 0,
          margin: 0,
          backgroundColor: 'red',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: { main: '#eeca3c' },
    secondary: {main: '#d5dcdc'},
    background: { default: '#292924', paper: '#d5dcdc'},
    text: {primary: '#ffffff'},
    action: {hover: '#ffffff3b'},
    grey: {"100": '#3e3e3a', "200": '#848787'},
    success: {main: '#eeca3c'},
    error: {main: '#640d0d'},
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, fontSize: '40px', color: '#ffffff'},
    h2: { fontWeight: 700, fontSize: '32px', color: '#ffffff'},
    h3: { fontWeight: 600, fontSize: '24px', color: '#ffffff'},
    body1: { fontWeight: 400, fontSize: '17px', color: '#ffffff'},
    body2: { fontWeight: 700, fontSize: '18px', color: '#ffffff'},
    caption: { fontWeight: 300, fontSize: '12px', color: '#ffffff'},
    button: { textTransform: 'none' },  // Botones sin mayúsculas automáticas
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: false,    // quita el límite de ancho por defecto
        disableGutters: true, // quita el padding lateral por defecto
      },
      styleOverrides: {
        root: {
          padding: 0,       // sin padding
          backgroundColor: 'transparent',
        },
      },
    },
  },

});
