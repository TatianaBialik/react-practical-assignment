import React, { useState } from 'react';
import useForm from '../../utils/useForm';
import { createPost } from '../../services/post/postSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function PostModalWindowForm(props) {
  const { values, handleChange } = useForm({});
  const openedId = useSelector((state) => state.modal.openedId);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...values };
    data.id = openedId;

    if (props.username)
      data.username = props.username;

    if (selectedImage)
      data.image = selectedImage;
    console.log(data)
    props.onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit} className="modal-window-form">
      <label>Title</label>
      <input
        className="modal-window-form_input"
        type='text'
        name='title'
        placeholder='Enter post title'
        onChange={handleChange} />
      <label>Upload file</label>
      <input
        className="modal-window-form_input"
        type='file'
        name='file'
        onChange={handleImageChange} />
      <button type="submit" className="modal-window-form_button">{props.buttonText}</button>
    </form>
  )
}