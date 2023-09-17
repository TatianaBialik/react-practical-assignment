import React, { useState, useEffect } from 'react';
import useForm from '../../utils/useForm';
import { createPost } from '../../services/post/postSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function PostModalWindowForm(props) {
  const openedId = useSelector((state) => state.modal.openedId);
  const openedIndex = useSelector((state) => state.modal.openedIndex);
  const posts = useSelector((state) => state.post.posts);
  const [selectedImage, setSelectedImage] = useState(null);
  const { values, handleChange } = useForm({title: openedId ? posts[openedIndex].title : ''});

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
        onChange={handleChange}
        value={values.title || ''} />
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