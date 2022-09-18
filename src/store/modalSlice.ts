import { createSlice } from "@reduxjs/toolkit";

const initialModalSlice = {
    isModal : false
}

const modalSlice = createSlice({
    name : 'modal',
    initialState : initialModalSlice,
    reducers : {
        open(state) {
            state.isModal = true;
        },
        close(state) {
            state.isModal = false;
        }
    }
})

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;