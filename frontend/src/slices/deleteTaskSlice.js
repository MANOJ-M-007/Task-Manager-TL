import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    deleteTaskloading: true
};

const deleteTaskSlice = createSlice({
    name: 'deleteTask',
    initialState,
    reducers:{
        deleteTaskReq: (state, action) => {
            state.deleteTaskloading = true;
        },
        deleteTaskSuccess: (state, action) => {
            state.deleteTaskloading = false;
            state.deleteTaskAdd = action.payload;
            state.deleteTaskSuccess = true;
        },
        deleteTaskFail: (state, action) => {
            state.deleteTaskloading = false;
            state.deleteTaskerror = action.payload;
        },
    }
})
export default deleteTaskSlice.reducer;
export const { deleteTaskReq, deleteTaskSuccess, deleteTaskFail } =
deleteTaskSlice.actions