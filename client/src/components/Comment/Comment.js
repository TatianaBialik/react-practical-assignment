import { deleteComment, updateComment } from '../../services/post/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { openEditCommentModal } from '../../services/modal/modalSlice';

export default function Comment(props) {
  const username = useSelector((state) => state.login.username);
  const dispatch = useDispatch();

  const handleDeleteComment = () => {
    dispatch(deleteComment({ id: props.id }));
  }

  const handleOpenEditComment = () => {
    dispatch(openEditCommentModal(props.id));
  }

  const handleLikeComment = () => {
    if (!props.likes.includes(username)) {
      let dislikes = props.dislikes.filter(item => item !== username);
      let likes = [...props.likes];
      likes.push(username);
      dispatch(updateComment({ id: props.id, likes, dislikes }));
    }
  }

  const handleDislikeComment = () => {
    if (!props.dislikes.includes(username)) {
      let likes = props.likes.filter(item => item !== username);
      let dislikes = [...props.dislikes];
      dislikes.push(username);
      dispatch(updateComment({ id: props.id, likes, dislikes }));
    }
  }

  return (
    <div className="comment">
      <p className="comment_title">{props.username}</p>
      <p className="comment_text">{props.text}</p>
      <div className="comment_buttons">
        <button onClick={handleOpenEditComment} style={{ display: props.username !== username && 'none' }}>Edit</button>
        <button onClick={handleDeleteComment} style={{ display: props.username !== username && 'none' }}>Delete</button>
        <button onClick={handleLikeComment}>Like</button>
        <button onClick={handleDislikeComment}>Dislike</button>
        <p>{props.likes.length - props.dislikes.length}</p>
      </div>
    </div>
  )
}