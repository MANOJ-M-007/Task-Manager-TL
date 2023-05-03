import React from "react";
import Container from "@mui/material/Container";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
// import { toast, Toaster } from "react-hot-toast";

// import ErrorAlert from "./ErrorAlert";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import { useState } from "react";
import { axiosInstance } from "../ApiCalls/axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { userRegisterSchema } from "../utils/validation";
const Register = () => {
  const navigate = useNavigate();
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [mobile, setMobile] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // console.log(name);
  // console.log(email);
  // console.log(mobile);
  // console.log(password);
  // console.log(confirmPassword);
  const initialValues = {
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: userRegisterSchema,
      onSubmit: (values) => {
        submitHandler();
        //   moblieVerify();
        console.log(values);
      },
    });

  const submitHandler = async () => {
    // if (!name || !email || !mobile || !password || !confirmPassword) {
    //   return;
    // } else {
    //   console.log(name, email, password);
    const Data = await axiosInstance.post(`/api/users/register`, {
      name: values.name,
      email: values.email,
      mobile: values.mobile,
      password: values.password,
    });
    console.log(Data);
    if (Data) {
      navigate("/login");
    }
    // localStorage.setItem("userInfo", JSON.stringify(Data));
  };
  // };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {/* <Toaster toastOptions={{ duration: 2000 }} /> */}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  name="name"
                  value={values.name}
                  error={errors.name && touched.name ? true : false}
                  label={errors.name && touched.name ? errors.name : "Name"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  value={values.email}
                  error={errors.email && touched.email ? true : false}
                  label={
                    errors.email && touched.email ? errors.email : "E mail"
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  name="mobile"
                  value={values.mobile}
                  error={errors.mobile && touched.mobile ? true : false}
                  label={
                    errors.mobile && touched.mobile
                      ? errors.mobile
                      : "Mobile No"
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  name="password"
                  value={values.password}
                  error={errors.password && touched.password ? true : false}
                  label={
                    errors.password && touched.password
                      ? errors.password
                      : "Password"
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  error={
                    errors.confirmPassword && touched.confirmPassword
                      ? true
                      : false
                  }
                  label={
                    errors.confirmPassword && touched.confirmPassword
                      ? errors.confirmPassword
                      : "Confirm Password"
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </>
  );
};

export default Register;
