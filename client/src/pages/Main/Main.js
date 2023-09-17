import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Gallery, SearchForm, Modal, CommentModalWindowForm, PostModalWindowForm, Button } from '../../components';
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
      dispatch(getPostsByPage(page));
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
        <Button onClick={handleLogout} text='Logout' />
      </header>
      <Button
        className='main_add-post-button'
        onClick={handleOpenAddPost}
        text='Add post'/>
      <SearchForm />
      <Gallery cards={posts.posts} page={page} />

      <div className='main_paginator'>
        <Button
          style={{ display: page === 1 && 'none' }}
          onClick={handlePrevPageLoading}
          text='Previous page' />
        <p className='main_paginator-page-number' style={{ display: posts.totalPages === 1 && 'none' }}>{`${page}/${posts.totalPages}`}</p>
        <Button
          style={{ display: page === posts.totalPages && 'none' }}
          onClick={handleNextPageLoading}
          text='Next page' />
      </div>

      {isAddPostModalOpen
        && <Modal
          isOpen={isAddPostModalOpen}
          name={'Add post'}>
          <PostModalWindowForm
            type='add'
            buttonText={'Add'}
            onSubmit={handleCreatePost} />
        </Modal>}


      {isEditPostModalOpen
        && <Modal
          isOpen={isEditPostModalOpen}
          name={'Edit post'}>
          <PostModalWindowForm
            type='edit'
            buttonText={'Edit'}
            onSubmit={handleUpdatePost} />
        </Modal>}

      {isAddCommentModalOpen
        && <Modal
          isOpen={isAddCommentModalOpen}
          name={'Add comment'}>
          <CommentModalWindowForm
            username={username}
            modalType={'add'}
            buttonText={'Add'}
            onSubmit={handleCreateComment} />
        </Modal>}

      {isEditCommentModalOpen
        && <Modal
          isOpen={isEditCommentModalOpen}
          name={'Edit comment'}>
          <CommentModalWindowForm
            username={username}
            buttonText={'Edit'}
            onSubmit={handleUpdateComment} />
        </Modal>}
    </main>
  )
}