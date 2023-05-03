import { configureStore } from '@reduxjs/toolkit'
//user
import userLoginReducer from '../slices/userLoginSlice'
import addTasksReducer from '../slices/addTasksSlice'
import listTasksReducer from '../slices/listTasksSlice'
import deleteTaskReducer from '../slices/deleteTaskSlice'
import updateTaskReducer from '../slices/updateTaskslice'
import setRemainderReducer from '../slices/setRemainderSlice'

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    addTasks: addTasksReducer,
    listTasks: listTasksReducer,
    deleteTask: deleteTaskReducer,
    updateTask: updateTaskReducer,
    setRemainder: setRemainderReducer
  }
})

export default store;