import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import img from "../assets/img.jpg";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { addTasksAction } from "../actions/userActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { keyframes } from "@emotion/react";

const shake = keyframes`
  0% {
    transform: translate(-50%, -50%) translate3d(0, 0, 0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translate(-50%, -50%) translate3d(-2px, 2px, 2px);
  }
  20%, 40%, 60%, 80% {
    transform: translate(-50%, -50%) translate3d(2px, -2px, -2px);
  }
  100% {
    transform: translate(-50%, -50%) translate3d(0, 0,0);
  }
`;

const ShakeText = ({ children }) => (
  <Typography
    sx={{
      fontFamily: "cursive",
      fontSize: { xs: "20px", sm: "25px", md: "32px", lg: "40px" },
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundImage: "linear-gradient(to right, #E9DAAD, #FFA05C)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textAlign: "center",
      fontWeight: 800,
      animation: `${shake} 4s infinite`,
    }}
  >
    {children}
  </Typography>
);

const Banner = () => {
  const { listTasks } = useSelector((state) => state.listTasks);
  const numTasks = listTasks.length;
  const numTasksCompleted = listTasks.reduce(
    (acc, cur) => acc + (cur.status ? 1 : 0),
    0
  );

  ////dailog
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [title, setTitle] = useState("");
  //   const [title, setTitle] = useState("");
  const resetHandler = () => {
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    resetHandler();
    setOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    if (!title || !description || !startDate || !endDate) return;

    dispatch(addTasksAction(title, description, startDate, endDate));
    resetHandler();
    handleClose();
  };

  return (
    <Box
      position="relative"
      sx={{
        width: "100%",
        height: "35vh",
        borderRadius: ".5rem",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(50%)",
          borderRadius: ".5rem",
        }}
      />
      <ShakeText>WELCOME TO TASK MANAGER</ShakeText>
      <Box
        sx={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            flex: "1",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              marginBottom: "5px",
              margin: "10px",
              fontFamily: "monospace",
            }}
          >
            ADD YOUR TASKS
          </Typography>
          <Button
            variant="contained"
            sx={{
              color: "#000000",
              backgroundColor: "#C2C2C2",
              boxShadow: "5px 5px 15px rgba(190, 133, 255,1)",
              width: "70px",
              marginRight: { xs: "50px" },
            }}
            onClick={handleOpen}
          >
            ADD
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "auto",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              marginBottom: "5px",
              marginRight: "10px",
              fontFamily: "monospace",
              fontSize:'20px'
            }}
          >
            Task Progress
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              marginTop: "5px",
              marginBottom: "5px",
              fontFamily: "cursive",
              marginRight: "5px",
              fontSize: "25px",
              fontWeight: "2rem",
            }}
          >
            {numTasksCompleted} / {numTasks}
          </Typography>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            backgroundImage: "linear-gradient(to right, #AD85FF, #C452BE)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginTop: "10px",
            fontFamily: "monospace",
            fontSize: "1.25rem",
            fontWeight: 800,
            marginBottom: "0.5rem",
            paddingLeft: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          ADD TASKS HERE
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              name="title"
              label="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              name="description"
              label="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      value={startDate}
                      disablePast={true}
                      onChange={(newDate) => setStartDate(newDate)}
                      fullWidth
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      value={endDate}
                      disablePast={true}
                      onChange={(newDate) => setEndDate(newDate)}
                      fullWidth
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
            </Grid>
            {/* <TextField
              name="name"
              label="Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              name="name"
              label="Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
            /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Banner;
