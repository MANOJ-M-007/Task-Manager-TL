import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    addTasksloading: true
};

const addTasksSlice = createSlice({
    name: 'addTasks',
    initialState,
    reducers:{
        addTasksReq: (state, action) => {
            state.addTasksloading = true;
        },
        addTasksSuccess: (state, action) => {
            state.addTasksloading = false;
            state.addTasksAdd = action.payload;
            state.addTasksSuccess = true;
        },
        addTasksFail: (state, action) => {
            state.addTasksloading = false;
            state.addTaskserror = action.payload;
        },
    }
})
export default addTasksSlice.reducer;
export const { addTasksReq, addTasksSuccess, addTasksFail } =
addTasksSlice.actions