import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    listTasksloading: true,
    listTasks:[]
};

const listTasksSlice = createSlice({
    name: 'listTasks',
    initialState,
    reducers:{
        listTasksReq: (state, action) => {
            state.listTasksloading = true;
        },
        listTasksSuccess: (state, action) => {
            state.listTasksloading = false;
            state.listTasks = action.payload;
            state.listTasksSuccess = true;
        },
        listTasksFail: (state, action) => {
            state.listTasksloading = false;
            state.listTaskserror = action.payload;
        },
    }
})
export default listTasksSlice.reducer;
export const { listTasksReq, listTasksSuccess, listTasksFail } =
listTasksSlice.actions