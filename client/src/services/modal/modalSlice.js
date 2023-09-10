import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isEditPostModalOpen: false,
  isAddPostModalOpen: false,
  isEditCommentModalOpen: false,
  isAddCommentModalOpen: false
};

export const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openEditPostModal: (state) => {
      state.isEditPostModalOpen = true;
    },
    openAddPostModal: (state) => {
      state.isAddPostModalOpen = true;
    },
    openEditCommentModal: (state) => {
      state.isEditCommentModalOpen = true;
    },
    openAddCommentModal: (state) => {
      state.isAddCommentModalOpen = true;
    },
    closeAllModals: (state) => {
      state.isEditPostModalOpen = false;
      state.isAddPostModalOpen = false;
      state.isEditCommentModalOpen = false;
      state.isAddCommentModalOpen = false;
    }
  }
});

export const { 
  openEditPostModal, 
  openAddPostModal, 
  openEditCommentModal, 
  openAddCommentModal, 
  closeAllModals } = modalSlice.actions;
export default modalSlice.reducer;