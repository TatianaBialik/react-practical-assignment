import { useDispatch, useSelector } from 'react-redux';
import { openEditPostModal, openAddCommentModal } from '../../services/modal/modalSlice';
import { deletePost, updatePost } from '../../services/post/postSlice';
import Comment from '../Comment/Comment';
import { useEffect, useState } from 'react';

export default function Card(props) {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.login.username);
  const [isCommentsOpened, setIsCommentsOpened] = useState(false);

  const handleOpenEditPost = () => {
    dispatch(openEditPostModal(props.id));
  }

  const handleOpenAddComment = () => {
    dispatch(openAddCommentModal(props.id));
  }

  const handleDeleteCard = () => {
    dispatch(deletePost(props.id));
  }

  const handleOpenCommentsButton = () => {
    setIsCommentsOpened(!isCommentsOpened);
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
        <button className="card_edit-button" onClick={handleOpenEditPost} style={{ display: props.username !== username && 'none' }}>Edit</button>
        <button className="card_delete-button" onClick={handleDeleteCard} style={{ display: props.username !== username && 'none' }}>Delete</button>
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
        <button className="card_comments-button" onClick={handleOpenCommentsButton}>See comments</button>
        <button className="card_add-comment-button" onClick={handleOpenAddComment}>Add Comment</button>
      </div>

      <div className="card_comments" style={{ display: !isCommentsOpened && 'none' }}>
        <h3 className="card_comments-title">Comments</h3>
        {props.comments && props.comments.length > 0
          ? props.comments.map((comment) => (
            <Comment
              key={comment.id}
              text={comment.text}
              username={comment.username}
              id={comment.id}
              postId={comment.postId} />
          ))
          : <p>No comments yet</p>}
      </div>
    </div>
  )
}