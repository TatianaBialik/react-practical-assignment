export default function Button(props) {
  return (
    <button
      className={`button ${props.className ? props.className : ''}`}
      onClick={props.onClick}
      style={props.style && props.style}>
      {props.text}
    </button>
  )
}