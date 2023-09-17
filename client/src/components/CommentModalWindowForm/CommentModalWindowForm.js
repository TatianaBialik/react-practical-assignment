import React, { useEffect } from 'react';
import useForm from '../../utils/useForm';
import { createPost } from '../../services/post/postSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function CommentModalWindowForm(props) {
  const openedCommentId = useSelector((state) => state.modal.openedCommentId);
  const openedCommentIndex = useSelector((state) => state.modal.openedCommentIndex);
  const openedCardId = useSelector((state) => state.modal.openedId);
  const openedCardIndex = useSelector((state) => state.modal.openedIndex);
  const comments = useSelector((state) => state.post.posts[openedCardIndex].comments);
  const { values, handleChange } = useForm({text: openedCommentId ? comments[openedCommentIndex].text : ''});

  useEffect(() => {
    console.log(openedCommentIndex, values)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...values };
    if (openedCardId)
      if (props.modalType === 'add')
        data.postId = openedCardId;
      else data.id = openedCommentId;
    if (props.username)
      data.username = props.username;
    props.onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit} className="modal-window-form">
      <label>Comment text</label>
        <input
        className="modal-window-form_input"
        type='text'
        name='text'
        onChange={handleChange}
        value={values.text || ''}
        placeholder='Enter comment text' />
      <button type="submit" className="modal-window-form_button">{props.buttonText}</button>
    </form>
  )
}