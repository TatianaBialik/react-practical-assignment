import { useDispatch, useSelector } from 'react-redux';
import { openEditPostModal, openAddCommentModal } from '../../services/modal/modalSlice';
import { deletePost, updatePost } from '../../services/post/postSlice';
import { useEffect, useState } from 'react';

export default function Card(props) {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.login.username);

  const handleOpenEditPost = () => {
    dispatch(openEditPostModal(props.id));
  }

  const handleOpenAddComment = () => {
    dispatch(openAddCommentModal());
  }

  const handleDeleteCard = () => {
    dispatch(deletePost(props.id));
  }

  const handleLikeCard = () => {
    if (!props.likes.includes(username)) {
      let dislikes = props.dislikes.filter(item => item !== username);
      let likes = [...props.likes];
      likes.push(username);
      dispatch(updatePost({ id: props.id, likes, dislikes }));
    }
  }

  const handleDislikeCard = () => {
    if (!props.dislikes.includes(username)) {
      let likes = props.likes.filter(item => item !== username);
      let dislikes = [...props.dislikes];
      dislikes.push(username);
      dispatch(updatePost({ id: props.id, likes, dislikes }));
    }
  }

  return (
    <div className="card">
      <div className="card_header">
        <p className="card_text card_date">{props.date}</p>
        <button className="card_edit-button" onClick={handleOpenEditPost} style={{display: props.username !== username && 'none'}}>Edit</button>
        <button className="card_delete-button" onClick={handleDeleteCard} style={{display: props.username !== username && 'none'}}>Delete</button>
      </div>

      <h2 className="card_title">{props.title}</h2>
      <img className="card_picture" src={props.imgSrc ? props.imgSrc : 'https://img.freepik.com/free-photo/red-white-cat-i-white-studio_155003-13189.jpg?w=2000'} />

      <div className="card_info">
        <p className="card_text card_username">{props.username}</p>
        <button className="card_like-button" onClick={handleLikeCard}>Like</button>
        <button className="card_dislike-button" onClick={handleDislikeCard}>Dislike</button>
        <p className="card_text card_votes">Votes: {props.votes}</p>
      </div>
      <div className="card_buttons-wrapper">
        <button className="card_comments-button">See comments</button>
        <button className="card_add-comment-button" onClick={handleOpenAddComment}>Add Comment</button>
      </div>
    </div>
  )
}