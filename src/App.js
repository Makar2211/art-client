import { Header } from './components/Header/Header';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { ThemeProvider } from '@mui/material';
import theme from './theme.js';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
