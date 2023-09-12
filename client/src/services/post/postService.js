import { MAIN_URL } from "../../utils/constants";

const createPost = async (post) => {
  const response = await fetch(
    `${MAIN_URL}/post/`,
    {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        'title': post.title,
        'username': post.username
      })
    }
  );

  const data = await response.json();

  if (response.status !== 201) {
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
};

const deletePost = async (postId) => {
  const response = await fetch(
    `${MAIN_URL}/post/${postId}`,
    {
      method: 'DELETE'
    }
  );

  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

const updatePost = async (values) => {
  const reqBody = {};
  if (values.title) reqBody.title = values.title;
  if (values.likes) reqBody.likes = values.likes;
  if (values.dislikes) reqBody.dislikes = values.dislikes;
  const response = await fetch(
    `${MAIN_URL}/post/${values.id}`,
    {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody)
    }
  )
  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.message);
  }

  return data;
}

const createComment = async(values) => {
  const response = await fetch(
    `${MAIN_URL}/comment`,
    { 
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    }
  );

  const data = await response.json();

  if (response.status !== 201) {
    throw new Error(data.message);
  }

  return data;
}

const deleteComment = async(values) => {
  const response = await fetch(
    `${MAIN_URL}/comment/${values.id}`,
    { method: 'DELETE' }
  );

  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.message);
  }

  return data;
}

const updateComment = async(values) => {
  const response = await fetch(
    `${MAIN_URL}/comment/${values.id}`,
    {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: values.text,
        likes: values.likes,
        dislikes: values.dislikes
      })
    }
  );

  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.message);
  }

  return data;
}

const postService = {
  createPost,
  getPostsByPage,
  deletePost,
  updatePost,
  createComment,
  deleteComment,
  updateComment,
};

export default postService;