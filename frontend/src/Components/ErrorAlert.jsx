import { Alert } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const ErrorAlert = ({ children }) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert variant="outlined" severity="error">
        <h6 sx={{ color: "red" }}>{children}</h6>
      </Alert>
      {/* <Alert variant="outlined" severity="warning">
        This is a warning alert — check it out!
      </Alert>
      <Alert variant="outlined" severity="info">
        This is an info alert — check it out!
      </Alert>
      <Alert variant="outlined" severity="success">
        This is a success alert — check it out!
      </Alert> */}
    </Stack>
  );
};

export default ErrorAlert;
