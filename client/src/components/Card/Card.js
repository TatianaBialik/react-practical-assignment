import { useDispatch } from 'react-redux';
import { openEditPostModal } from '../../services/modal/modalSlice';
import { deletePost } from '../../services/post/postSlice';

export default function Card(props) {
  const dispatch = useDispatch();

  const handleOpenEditPost = () => {
    dispatch(openEditPostModal());
  }

  const handleDeleteCard = () => {
    dispatch(deletePost(props.id));
  }

  return (
    <div className="card">
      <div className="card_header">
        <p className="card_text card_date">{props.date}</p>
        <button className="card_edit-button" onClick={handleOpenEditPost}>Edit</button>
        <button className="card_delete-button" onClick={handleDeleteCard}>Delete</button>
      </div>

      <h2 className="card_title">{props.title}</h2>
      <img className="card_picture" src='https://img.freepik.com/free-photo/red-white-cat-i-white-studio_155003-13189.jpg?w=2000' />

      <div className="card_info">
        <p className="card_text card_username">{props.username}</p>
        <button className="card_like-button">Like</button>
        <button className="card_dislike-button">Dislike</button>
        <p className="card_text card_votes">Votes: {props.votes}</p>
      </div>
    </div>
  )
}