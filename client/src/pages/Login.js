import { useNavigate } from 'react-router';
import { Form } from '../components';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function Login() {
  const username = useSelector((state) => state.login.username);
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      navigate('/gallery');
    }
  }, [username]);

  return (
    <div className="login">
      <h1>login</h1>
      <Form />
    </div>
  )
}