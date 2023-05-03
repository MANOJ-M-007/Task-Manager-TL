import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import "./style.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { listTasksAction } from "../actions/userActions";
import { deleteTaskAction } from "../actions/userActions";
import { format } from "date-fns";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import AddAlarmTwoToneIcon from "@mui/icons-material/AddAlarmTwoTone";
import IconButton from "@mui/material/IconButton";
import moment from "moment";
import { toast, Toaster } from "react-hot-toast";


import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import styled from "@emotion/styled";
import Slider from "@mui/material/Slider";
import { updateTaskAction } from "../actions/userActions";
import { setRemainderAction } from "../actions/userActions";

const PrettoSlider = styled(Slider)({
  color: "#52af77",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const Body = () => {
  const dispatch = useDispatch();
  const { addTasksSuccess } = useSelector((state) => state.addTasks);
  const { deleteTaskSuccess } = useSelector((state) => state.deleteTask);

  const { listTasks } = useSelector((state) => state.listTasks);
  console.log(listTasks);

  const deleteTask = (id) => {
    dispatch(deleteTaskAction(id));
  };

  //pagenation

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [pageNumberLimit, setPageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const handlePage = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(listTasks.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listTasks.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handlePage}
          className={currentPage === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementButton = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementButton = <li onClick={handleNextbtn}> &hellip;</li>;
  }

  let pageDecrementButton = null;
  if (pages.length > maxPageNumberLimit) {
    pageDecrementButton = <li onClick={handlePrevbtn}> &hellip;</li>;
  }

  // for dialog box
  const [open, setOpen] = useState(false);
  const [openr, setOpenr] = useState(false);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [title, setTitle] = useState("");
  /////////////////////slider
  const [progress, setProgress] = useState("");
  const [id, setId] = useState("");

  const handleOpen = (id) => {
    const task = listTasks.find((task) => task.id === id);
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStartDate(task.start);
      setEndDate(task.end);
      setProgress(task.progress);
      setId(id);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdate = () => {
    dispatch(
      updateTaskAction(id, title, description, startDate, endDate, progress)
    );
    // resetHandler();
    handleClose();
  };

  //remainder
  const [valueDate, onChange] = useState(new Date());
  const [taskId, seTaskId] = useState();

  // console.log(value1,taskId+'value,taskId')
  const handleOpenr = () => {
    setOpenr(true);
  };
  const handleCloser = () => {
    setOpenr(false);
  };

  const handleUpdater = (e) => {
    e.preventDefault();
    const value1 = { valueDate };
    console.log(value1 + "ppppppppppp");
    dispatch(setRemainderAction(taskId, value1));
    handleCloser();
  };

  function TaskList({ tasks }) {
    useEffect(() => {
      const intervalId = setInterval(() => {
        checkReminders();
      }, 60000); // check reminders every minute

      return () => clearInterval(intervalId); // clear interval on unmounting the component
    }, []); // run the effect only on component mounting

    const checkReminders = () => {
      const now = moment();
      tasks.forEach((task) => {
        // console.log(remainder);
        const remainderDateTime = moment.utc(task.remainder);
        console.log(remainderDateTime);
        if (remainderDateTime.isSame(now, "minute")) {
          toast.success(`Remainder for task "${task.title}"`);
        }
      });
    };
  }

  useEffect(() => {
    dispatch(listTasksAction());
  }, [dispatch, addTasksSuccess, deleteTaskSuccess]);
  return (
    <>
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
          EDIT YOUR TASKS
        </DialogTitle>

        <form onSubmit={handleUpdate}>
          <DialogContent>
            <TextField
              name="title"
              label="title"
              defaultValue={title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              name="description"
              label="description"
              defaultValue={description}
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
                      // defaultValue={new Date()}
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
                      // defaultValue={endDate}
                      disablePast={true}
                      onChange={(newDate) => setEndDate(newDate)}
                      fullWidth
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Typography gutterBottom>Progress</Typography>
            <PrettoSlider
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              defaultValue={progress}
              onChange={(event, newValue) => setProgress(newValue)}
            />
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
      <Toaster/>
<TaskList tasks={listTasks}/>

      <Dialog open={openr} onClose={handleCloser}>
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
          SET REMAINDER FOR THIS TASK
        </DialogTitle>

        <form onSubmit={handleUpdater}>
          <DialogContent>
            <Typography
              sx={{
                marginBottom: "200px",
                marginRight: "95px",
                marginLeft: "95px",
              }}
              gutterBottom
            >
              Choose Date and Time
            </Typography>
            <DateTimePicker onChange={onChange} value={valueDate} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloser} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Box
        sx={{
          // marginTop: "400px",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "100",
          p: { xs: 1, md: 2, lg: 3 },
        }}
      >
        <Box sx={{ justifyContent: "center" }}>
          <Typography
            sx={{
              backgroundImage: "linear-gradient(to right, #AD85FF, #C452BE)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginTop: "10px",
              fontFamily: "monospace",
              fontSize: "1.25rem",
              fontWeight: 1000,
              marginBottom: "0.5rem",
              paddingLeft: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            YOUR TASKS
          </Typography>
        </Box>
        <Grid container spacing={2} justifyContent="center">
          {currentItems.map((task) => (
            <Grid item xs={12} sm={6} lg={4} key={task.id}>
              <Card
                key={task.id}
                sx={{
                  backgroundColor: "#ffffff",
                  boxShadow: "3px 3px 10px rgba(190, 133, 255,1)",
                  marginTop: "10px",
                  borderRadius: "1rem",
                  // display: "flex",
                  // flexDirection: { xs: "column", md: "row" },
                }}
              >
                <CardContent
                  sx={{
                    // p: 2,
                    // marginLeft:'50px'
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    p: { xs: 1, md: 1 },
                  }}
                >
                  <Card
                    sx={{
                      p: 1,
                      backgroundColor: "#F6F5F4",
                      display: "flex", // Add this property to display items in a row
                      flexDirection: "row",
                      flexWrap: "wrap", // Add this line to wrap the options to the next line if needed
                    }}
                  >
                    <Box
                      sx={{
                        flexDirection: "column",
                        width: { xs: "30%", md: "30%" },
                        mb: { xs: 1, md: 0 },
                        lineHeight: "2",
                        display: "flex",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 550,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "1.5",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Task
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 550,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "2",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Details
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 550,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "2",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Start Date
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 550,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "2",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        End Date
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 550,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "2",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Progress
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 550,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "2",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Status
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 550,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "2",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Remainder
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        flexDirection: "column",
                        width: { xs: "70%", md: "70%" },
                        mb: { xs: 1, md: 0 },
                        lineHeight: "2",
                        display: "flex",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 500,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "1.5",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        : {task.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 500,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "2",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        : {task.description}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 500,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "2",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        : {format(new Date(task.startDate), "dd-MM-yyyy")}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 500,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "2",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        : {format(new Date(task.endDate), "dd-MM-yyyy")}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 500,
                          color: "#757575",
                          marginBottom: "0.5rem",
                          lineHeight: "2",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        : {task.progress} % Completed
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 600,
                          color: task.status ? "#007A1B" : "#C80404",
                          marginBottom: "0.5rem",
                          lineHeight: "2",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        : {task.status ? "Completed" : "Not Completed"}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "sans-serif",
                          fontSize: "1rem",
                          fontWeight: 600,
                          color: task.remainder ? "#007A1B" : "#C80404",
                          marginBottom: "0.5rem",
                          lineHeight: "2",
                        }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        :{" "}
                        {task.remainder
                          ? format(
                              new Date(task.remainder),
                              "dd-MM-yyyy hh:mm:ss a"
                            )
                          : "No Remainders"}
                      </Typography>
                    </Box>
                  </Card>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                    }}
                  >
                    <Button
                      sx={{
                        color: "#000000",
                        backgroundColor: "#FFC2C2",
                        boxShadow: "1px 1px 5px rgba(190, 133, 255,1)",
                        width: "70px",
                        marginLeft: "2.5px",
                      }}
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      sx={{
                        color: "#000000",
                        backgroundColor: "#C2C2C2",
                        boxShadow: "1px 1px 5px rgba(190, 133, 255,1)",
                        width: "70px",
                        marginLeft: "8px",
                      }}
                      onClick={() => {
                        // setId(task.id);
                        handleOpen(task.id);
                      }}
                    >
                      Edit
                    </Button>
                    <IconButton
                      sx={{
                        boxShadow: "1px 1px 5px rgb(66, 105, 213)",
                        marginLeft: "8px",
                        color: "#7770FF",
                      }}
                      onClick={() => {
                        seTaskId(task.id);
                        handleOpenr();
                      }}
                    >
                      <AddAlarmTwoToneIcon />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <ul className="pageNumbers">
          <li>
            <button
              onClick={handlePrevbtn}
              disabled={currentPage === pages[0] ? true : false}
            >
              prev
            </button>
          </li>
          {pageDecrementButton}
          {renderPageNumbers}
          {pageIncrementButton}
          <li>
            <button
              onClick={handleNextbtn}
              disabled={currentPage === pages[pages.length - 1] ? true : false}
            >
              Next
            </button>
          </li>
        </ul>
      </Box>
    </>
  );
};

export default Body;
