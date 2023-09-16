import { Card } from '../index';

export default function Gallery(props) {
  function getDate(timestamp) {
    let date = new Date();
    date.setTime(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
  return (
    <div className="gallery">
      {props.cards.map(card => (
        <Card
          key={card.id}
          title={card.title}
          username={card.username}
          date={getDate(card.date)}
          votes={(card.likes.length - card.dislikes.length)}
          id={card.id}
          likes={card.likes}
          dislikes={card.dislikes}
          comments={card.comments}
          imageSrc={card.imageSrc} />
      ))}
    </div>
  )
}