import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isEditPostModalOpen: false,
  isAddPostModalOpen: false,
  isEditCommentModalOpen: false,
  isAddCommentModalOpen: false,
  openedId: null,
  openedIndex: null,
  openedCommentId: null,
  openedCommentIndex: null
};

export const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openEditPostModal: (state, { payload }) => {
      state.isEditPostModalOpen = true;
      state.openedId = payload.id;
      state.openedIndex = payload.index;
    },
    openAddPostModal: (state) => {
      state.isAddPostModalOpen = true;
    },
    openEditCommentModal: (state, { payload }) => {
      state.isEditCommentModalOpen = true;
      state.openedId = payload.cardId;
      state.openedIndex = payload.cardIndex;
      state.openedCommentId = payload.id;
      state.openedCommentIndex = payload.index;
    },
    openAddCommentModal: (state, { payload }) => {
      state.isAddCommentModalOpen = true;
      state.openedId = payload.id;
      state.openedIndex = payload.index;
    },
    closeAllModals: (state) => {
      state.isEditPostModalOpen = false;
      state.isAddPostModalOpen = false;
      state.isEditCommentModalOpen = false;
      state.isAddCommentModalOpen = false;
      state.openedId = null;
      state.openedIndex = null;
      state.openedCommentId = null;
      state.openedCommentIndex = null;
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