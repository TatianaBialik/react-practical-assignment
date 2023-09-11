import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isEditPostModalOpen: false,
  isAddPostModalOpen: false,
  isEditCommentModalOpen: false,
  isAddCommentModalOpen: false,
  openedId: null
};

export const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openEditPostModal: (state, { payload }) => {
      state.isEditPostModalOpen = true;
      state.openedId = payload;
    },
    openAddPostModal: (state) => {
      state.isAddPostModalOpen = true;
    },
    openEditCommentModal: (state, { payload }) => {
      state.isEditCommentModalOpen = true;
      state.openedId = payload;
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