import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    updateTaskloading: true
};

const updateTaskSlice = createSlice({
    name: 'updateTask',
    initialState,
    reducers:{
        updateTaskReq: (state, action) => {
            state.addTasksloading = true;
        },
        updateTaskSuccess: (state, action) => {
            state.updateTaskloading = false;
            state.updateTask = action.payload;
            state.updateTaskSuccess = true;
        },
        updateTaskFail: (state, action) => {
            state.updateTaskloading = false;
            state.updateTaskerror = action.payload;
        },
    }
})
export default updateTaskSlice.reducer;
export const { updateTaskReq, updateTaskSuccess, updateTaskFail } =
updateTaskSlice.actions