export default function Card(props) {
  return (
    <div className="card">
      <h2 className="card_title">Title</h2>
      <img className="card_picture" src='https://img.freepik.com/free-photo/red-white-cat-i-white-studio_155003-13189.jpg?w=2000' />
      <p className="card_text card_date">09/09/2023</p>
      <div className="card_info">
        <p className="card_text card_username">Username</p>
        <p className="card_text card_votes">Votes: 180</p>
      </div>
    </div>
  )
}