
import { userLoginFail, userLoginReq, userLoginSuccess, userLogout, } from '../slices/userLoginSlice'
import { addTasksReq, addTasksSuccess, addTasksFail } from '../slices/addTasksSlice'
import { listTasksReq, listTasksSuccess, listTasksFail } from '../slices/listTasksSlice'
import { deleteTaskReq, deleteTaskSuccess, deleteTaskFail } from '../slices/deleteTaskSlice'
import { updateTaskReq, updateTaskSuccess, updateTaskFail } from '../slices/updateTaskslice'
import {setRemainderReq, setRemainderSuccess, setRemainderFail} from '../slices/setRemainderSlice'
import { axiosInstance } from '../ApiCalls/axios'

export const login = (email, password) => async (dispatch) => {
  console.log(email, password);
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(userLoginReq());
    const { data } = await axiosInstance.post(
      "/api/users/login",
      { email, password, },
      config
    );
    dispatch(userLoginSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userLoginFail(errorIs))
  }
}

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(userLogout());
};

export const addTasksAction = (title, description, startDate, endDate) => async (dispatch, getState) => {
  try {
    console.log(title, description, startDate, endDate);
    dispatch(addTasksReq());
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    console.log(userInfo.token);
    const { data } = await axiosInstance.post("/api/users/addTasks", { title, description, startDate, endDate }, config);
    console.log(data);
    dispatch(addTasksSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(addTasksFail(message));
  }
};

export const listTasksAction = () => async (dispatch, getState) => {
  try {
    dispatch(listTasksReq());
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axiosInstance.get("/api/users/listTasks", config);
    console.log(data);
    dispatch(listTasksSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(listTasksFail(message));
  }
};

export const deleteTaskAction = (id) => async (dispatch, getState) => {
  try {
    dispatch(deleteTaskReq());
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axiosInstance.get(`/api/users/deleteTask/${id}`, config);
    console.log(data);
    dispatch(deleteTaskSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(deleteTaskFail(message));
  }
};

export const updateTaskAction = (id,title, description, startDate, endDate, progress) => async (dispatch, getState) => {
  try {
    dispatch(updateTaskReq());
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    console.log(userInfo.token);
    const { data } = await axiosInstance.post("/api/users/updateTask", {id,title, description, startDate, endDate, progress }, config);
    console.log(data);
    dispatch(updateTaskSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(updateTaskFail(message));
  }
};


export const setRemainderAction = (taskId, value1) => async (dispatch, getState) => {
  try {
    console.log( value1);
    dispatch(setRemainderReq());
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    console.log(userInfo.token);
    const { data } = await axiosInstance.put(`/api/users/setRemainder/${taskId}`,value1, config);
    console.log(data);
    dispatch(setRemainderSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setRemainderFail(message));
  }
};

