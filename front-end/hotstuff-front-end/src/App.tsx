import './App.css';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#d32f2f',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeightLight: 200,
    fontWeightRegular: 300,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header/>
        <Outlet/>
      </div>
    </ThemeProvider>
  );
}

export default App;
