export default function Form() {
  return (
    <form className="form">
      <label>Username</label>
      <input type="text" name="username" className="form_input" placeholder="Enter your username" />
      <button type="submit" className="form_button">login</button>
    </form>
  )
}