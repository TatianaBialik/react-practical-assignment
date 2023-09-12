import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Gallery, SearchForm, Modal, ModalWindowForm } from '../../components';
import { logout } from '../../services/login/loginSlice';
import { openAddPostModal, closeAllModals } from '../../services/modal/modalSlice';
import { createPost, getPostsByPage, updatePost, createComment } from '../../services/post/postSlice';

export default function Main() {
  const username = useSelector((state) => state.login.username);
  const posts = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

      <Modal
        isOpen={isAddPostModalOpen}
        name={'Add post'}>
        <ModalWindowForm
          inputs={[
            { type: 'text', name: 'title', placeholder: 'Enter post title', labelText: 'Title' },
            { type: 'file', name: 'image', placeholder: 'Upload file', labelText: 'Upload file' }
          ]}
          buttonText={'Add'}
          onSubmit={handleCreatePost} />
      </Modal>

      <Modal
        isOpen={isEditPostModalOpen}
        name={'Edit post'}>
        <ModalWindowForm
          inputs={[
            { type: 'text', name: 'title', placeholder: 'Enter post title', labelText: 'Title' },
            { type: 'file', name: 'image', placeholder: 'Upload file', labelText: 'Upload file' }
          ]}
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
          modalType={'comment'}
          buttonText={'Edit'}
          onSubmit={handleCreateComment} />
      </Modal>
    </main>
  )
}