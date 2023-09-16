import { useRef } from 'react';
import { searchPosts } from '../../services/post/postSlice';
import { useDispatch } from 'react-redux';

export default function SearchForm() {
  const keywordRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keywordRef.current.value)
      dispatch(searchPosts(keywordRef.current.value));
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