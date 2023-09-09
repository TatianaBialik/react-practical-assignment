export default function Card(props) {
  return (
    <div className="card">
      <div className="card_header">
        <p className="card_text card_date">09/09/2023</p>
        <button className="card_delete-button">Delete</button>
      </div>

      <h2 className="card_title">Title</h2>
      <img className="card_picture" src='https://img.freepik.com/free-photo/red-white-cat-i-white-studio_155003-13189.jpg?w=2000' />

      <div className="card_info">
        <p className="card_text card_username">Username</p>
        <button className="card_like-button">Like</button>
        <button className="card_deslike-button">Dislike</button>
        <p className="card_text card_votes">Votes: 180</p>
      </div>
    </div>
  )
}