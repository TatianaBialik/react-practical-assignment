import { deleteComment } from '../../services/post/postSlice';
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

  return (
    <div className="comment">
      <p className="comment_title">{props.username}</p>
      <p className="comment_text">{props.text}</p>
      <div className="comment_buttons">
        <button onClick={handleOpenEditComment} style={{ display: props.username !== username && 'none' }}>Edit</button>
        <button onClick={handleDeleteComment} style={{ display: props.username !== username && 'none' }}>Delete</button>
        <button>Like</button>
        <button>Dislike</button>
      </div>
    </div>
  )
}