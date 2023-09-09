import {useEffect} from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';

function App() {

  useEffect(() => {
    // TEST API, it might be removed
    fetch('http://localhost:8080/live').then(res => res.json()).then(res => {
      console.log('API CONNECTION IS OK');
    }).catch((e) => console.error('API CONNECTION FAILED, PLEASE CHECK SERVER APP AND TRY AGAIN'))
  }, []);

  return (
      <Login />
  );
}

export default App;
