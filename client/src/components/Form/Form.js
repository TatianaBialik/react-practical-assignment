import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../services/login/loginSlice';

export default function Form() {
  const usernameRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;

    dispatch(login({ username }));
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>Username</label>
      <input
        type="text"
        name="username"
        className="form_input"
        placeholder="Enter your username"
        ref={usernameRef} />
      <button type="submit" className="form_button">login</button>
    </form>
  )
}