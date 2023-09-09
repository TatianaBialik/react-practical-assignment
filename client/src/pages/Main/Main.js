import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Gallery, SearchForm } from '../../components';
import { logout } from '../../services/login/loginSlice';

export default function Main() {
  const username = useSelector((state) => state.login.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate('/');
    }
  }, [username]);

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <main className='main'>
      <header className='main_header'>
        <h1 className='main_title'>Hello, {username}</h1>
        <button className='main_logout-button' onClick={handleLogout}>Logout</button>
      </header>
      <SearchForm />
      <Gallery />
    </main>
  )
}