import { useDispatch, useSelector } from 'react-redux';
import { openEditPostModal, openAddCommentModal } from '../../services/modal/modalSlice';
import { deletePost, updatePost, getPostsByPage } from '../../services/post/postSlice';
import { Button, Comment } from '../';
import { useEffect, useState } from 'react';

export default function Card(props) {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.login.username);
  const [isCommentsOpened, setIsCommentsOpened] = useState(false);

  const handleOpenEditPost = () => {
    dispatch(openEditPostModal({id: props.id, index: props.index}));
  }

  const handleOpenAddComment = () => {
    dispatch(openAddCommentModal({id: props.id, index: props.index}));
  }

  const handleDeleteCard = () => {
    dispatch(deletePost(props.id));
    dispatch(getPostsByPage(props.page));
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
        <Button 
        className="button_card" 
        onClick={handleOpenEditPost} 
        style={{ display: props.username !== username && 'none' }}
        text='Edit' />
        <p className="card_text card_date">{props.date}</p>
        <Button 
        className="button_card" 
        onClick={handleDeleteCard} 
        style={{ display: props.username !== username && 'none' }}
        text='Delete' />
      </div>

      <h2 className="card_title">{props.title}</h2>
      <img 
      className="card_picture" 
      src={props.imageSrc 
      ? props.imageSrc 
      : 'https://img.freepik.com/free-photo/red-white-cat-i-white-studio_155003-13189.jpg?w=2000'} />

      <div className="card_info">
        <p className="card_text card_username">{props.username}</p>
        <Button 
        className="button_card" 
        onClick={handleLikeCard}
        text='Like' />
        <Button 
        className="button_card" 
        onClick={handleDislikeCard}
        text='Dislike' />
        <p className="card_text card_votes">Votes: {props.votes}</p>
      </div>
      <div className="card_buttons-wrapper">
        <Button 
        className="button_card" 
        onClick={handleOpenCommentsButton}
        text='See comments' />
        <Button 
        className="button_card" 
        onClick={handleOpenAddComment}
        text='Add Comment' />
      </div>

      <div className="card_comments" style={{ display: !isCommentsOpened && 'none' }}>
        <h3 className="card_comments-title">Comments</h3>
        {props.comments && props.comments.length > 0
          ? props.comments.map((comment, index) => (
            <Comment
              key={comment.id}
              text={comment.text}
              username={comment.username}
              id={comment.id}
              postId={comment.postId}
              likes={comment.likes} 
              dislikes={comment.dislikes}
              cardId={props.id}
              cardIndex={props.index}
              index={index} />
          ))
          : <p>No comments yet</p>}
      </div>
    </div>
  )
}