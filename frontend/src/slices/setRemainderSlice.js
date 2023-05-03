import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    setRemainderloading: true
};

const setRemainderSlice = createSlice({
    name: 'setRemainder',
    initialState,
    reducers:{
        setRemainderReq: (state, action) => {
            state.setRemainderloading = true;
        },
        setRemainderSuccess: (state, action) => {
            state.setRemainderloading = false;
            state.setRemainder = action.payload;
            state.setRemainderSuccess = true;
        },
        setRemainderFail: (state, action) => {
            state.setRemainderloading = false;
            state.setRemaindererror = action.payload;
        },
    }
})
export default setRemainderSlice.reducer;
export const { setRemainderReq, setRemainderSuccess, setRemainderFail } =
setRemainderSlice.actions