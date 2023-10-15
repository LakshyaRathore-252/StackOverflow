// ================================================ Import Dependenices =========================================
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';


// ================================================= Import Components =============================================


import AllRoutes from './AllRoutes'
import { fetchAllQuestions } from './actions/question';
import { fetchAllUsers } from './actions/users';

// ================================================= Import CSS ===================================================
import './App.css';


function App() {

  const dispatch = useDispatch();
  const [theme, setTheme] = useState('light-theme');

  useEffect(() => {

    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch])


  useEffect(() => {

    const currentHour = new Date().getHours();
    console.log(currentHour)
    setTheme(currentHour >= 6 && currentHour < 18 ? 'light-theme' : 'dark-theme');
  }, []);

  useEffect(() => {

    document.body.className = theme;

  }, [theme])

  const [slideIn, setSlideIn] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 760) {
      setSlideIn(false);
    }
  }, []);

  const handleSlideIn = () => {
    if (window.innerWidth <= 760) {
      setSlideIn((state) => !state);
    }
  };

  return (
    <div className='App'>
      <Router>
        <Navbar handleSlideIn={handleSlideIn} />
        <AllRoutes slideIn={slideIn} handleSlideIn={handleSlideIn} />
      </Router>
    </div>
  );
}

export default App;
