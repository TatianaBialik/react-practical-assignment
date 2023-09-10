import { MAIN_URL } from "../../utils/constants";

const createPost = async (post, username) => {
  const response = await fetch(
    `${MAIN_URL}/post/`,
    {
      method: 'POST',
      body: JSON.stringify({
        title: post.title,
        username: post.username
      })
    }
  );

  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

const getPostsByPage = async (pageNumber) => {
  const response = await fetch(
    `${MAIN_URL}/post/page/${pageNumber}`
  );

  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.message);
  }

  return data;
}

const postService = {
  createPost,
  getPostsByPage
};

export default postService;