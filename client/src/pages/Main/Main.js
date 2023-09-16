import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Gallery, SearchForm, Modal, ModalWindowForm, PostModalWindowForm } from '../../components';
import { logout } from '../../services/login/loginSlice';
import { openAddPostModal, closeAllModals } from '../../services/modal/modalSlice';
import { createPost, getPostsByPage, updatePost, createComment, updateComment } from '../../services/post/postSlice';

export default function Main() {
  const username = useSelector((state) => state.login.username);
  const posts = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const isAddPostModalOpen = useSelector((state) => state.modal.isAddPostModalOpen);
  const isEditPostModalOpen = useSelector((state) => state.modal.isEditPostModalOpen);
  const isAddCommentModalOpen = useSelector((state) => state.modal.isAddCommentModalOpen);
  const isEditCommentModalOpen = useSelector((state) => state.modal.isEditCommentModalOpen);

  useEffect(() => {
    dispatch(getPostsByPage(1));
  }, [dispatch]);

  useEffect(() => {
    if (!username) {
      navigate('/');
    }
  }, [username]);

  const handleLogout = () => {
    dispatch(logout());
  }

  const handleOpenAddPost = () => {
    dispatch(openAddPostModal());
  }

  const handleCreatePost = (values) => {
    values.username = username;
    dispatch(createPost({ ...values }));
    if (posts.success) {
      dispatch(closeAllModals());
    }
  }

  const handleUpdatePost = (data) => {
    dispatch(updatePost({ ...data }));
    if (posts.success) {
      dispatch(closeAllModals());
    }
  }

  const handleCreateComment = (data) => {
    dispatch(createComment({ ...data }));
    if (posts.success) {
      dispatch(closeAllModals());
    }
  }

  const handleUpdateComment = (data) => {
    dispatch(updateComment({ ...data }));
    if (posts.success) {
      dispatch(closeAllModals());
    }
  }

  const handleNextPageLoading = () => {
    dispatch(getPostsByPage(page + 1));
    setPage(page + 1);
  }

  const handlePrevPageLoading = () => {
    dispatch(getPostsByPage(page - 1));
    setPage(page - 1);
  }

  return (
    <main className='main'>
      <header className='main_header'>
        <h1 className='main_title'>Hello, {username}</h1>
        <button className='main_logout-button' onClick={handleLogout}>Logout</button>
      </header>
      <button
        className='main_add-post-button'
        onClick={handleOpenAddPost}>Add Post</button>
      <SearchForm />
      <Gallery cards={posts.posts} />

      <div className='main_paginator'>
        <button
          className='main_paginator-button'
          style={{ display: page === 1 && 'none' }}
          onClick={handlePrevPageLoading}>
          Previous page
        </button>
        <p className='main_paginator-page-number' style={{ display: posts.totalPages === 1 && 'none' }}>{`${page}/${posts.totalPages}`}</p>
        <button
          className='main_paginator-button'
          style={{ display: page === posts.totalPages && 'none' }}
          onClick={handleNextPageLoading}>
          Next page
        </button>
      </div>

      <Modal
        isOpen={isAddPostModalOpen}
        name={'Add post'}>
        <PostModalWindowForm
          buttonText={'Add'}
          onSubmit={handleCreatePost} />
      </Modal>

      <Modal
        isOpen={isEditPostModalOpen}
        name={'Edit post'}>
        <PostModalWindowForm
          buttonText={'Edit'}
          onSubmit={handleUpdatePost} />
      </Modal>

      <Modal
        isOpen={isAddCommentModalOpen}
        name={'Add comment'}>
        <ModalWindowForm
          inputs={[
            { type: 'text', name: 'text', placeholder: 'Enter comment', labelText: 'Comment text' },
          ]}
          username={username}
          modalType={'comment'}
          buttonText={'Add'}
          onSubmit={handleCreateComment} />
      </Modal>

      <Modal
        isOpen={isEditCommentModalOpen}
        name={'Edit comment'}>
        <ModalWindowForm
          inputs={[
            { type: 'text', name: 'text', placeholder: 'Enter comment', labelText: 'Comment text' },
          ]}
          username={username}
          buttonText={'Edit'}
          onSubmit={handleUpdateComment} />
      </Modal>
    </main>
  )
}