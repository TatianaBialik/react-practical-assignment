import { useRef, useState } from 'react';
import { searchPosts } from '../../services/post/postSlice';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { Button } from '../';

export default function SearchForm() {
  const keywordRef = useRef();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');

  const debouncedSearch = debounce((keyword) => {
    dispatch(searchPosts(keyword));
  }, 500);

  const handleChange = (e) => {
    const { value } = e.target;
    setKeyword(value);
    if (value)
      debouncedSearch(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword)
      dispatch(searchPosts(keyword));
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-form_input"
        placeholder="Input a keyword"
        name="keyword"
        onChange={handleChange}
        value={keyword}
      />
      <Button type="submit" text='Search' />
    </form>
  )
}