import { useRef } from 'react';

export default function SearchForm() {
  const keywordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-form_input"
        placeholder="Input a keyword"
        name="keyword"
        ref={keywordRef}
      />
      <button className="search-form_button" type="submit">search</button>
    </form>
  )
}