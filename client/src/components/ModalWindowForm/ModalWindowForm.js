import React from 'react';
import useForm from '../../utils/useForm';
import { createPost } from '../../services/post/postSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function ModalWindowForm(props) {
  const { values, handleChange } = useForm({});
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} className="modal-window-form">
      {props.inputs.map(input => (
        <React.Fragment key={input.name}>
          <label>{input.labelText}</label>
          <input
            className="modal-window-form_input"
            type={input.type}
            name={input.name}
            onChange={handleChange}
            id={input.name}
            placeholder={input.placeholder} />
        </React.Fragment>
      ))}
      <button type="submit" className="modal-window-form_button">{props.buttonText}</button>
    </form>
  )
}