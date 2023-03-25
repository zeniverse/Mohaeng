import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  modalType: string;
}

const initialState: ModalState = {
  isOpen: false,
  modalType: " ",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, actions) {
      const { modalType } = actions.payload;
      state.isOpen = true;
      state.modalType = modalType;
    },
    closeModal(state) {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModal = (state: { modal: any }) => state.modal;

export default modalSlice.reducer;
