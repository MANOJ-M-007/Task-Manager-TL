import React from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import image from "../assets/img.jpg";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
const ErrorPage = () => {
    const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box sx={{ position: "relative", height: "100vh" , overflow: "hidden" }}>
      <img
        src={image}
        alt="Placeholder"
        style={{
          filter: "brightness(50%)",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
        }}
      >
        <Box
          sx={{
            p: matches ? 6 : 2,
            maxWidth: matches ? "unset" : "90%",
            textAlign: matches ? "center" : "center",
          }}
        >
          <Typography
            // variant={matches ? "h4" : "h6"}
            gutterBottom
            sx={{
              fontSize: { xs: "30px", md: "50px" },
              backgroundImage: "linear-gradient(to right, #BB99FF, #FF99FA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 800,
            }}
          >
            404 - Page Not Found
          </Typography>
          <Typography
            variant={matches ? "body1" : "body2"}
            gutterBottom
            sx={{
              fontSize: { xs: "15px", md: "20px" },
              color: "second.main",
            }}
          >
            Sorry, the page you're looking for doesn't exist.
          </Typography>
          <Link to="/">
            <Button
              sx={{
                marginTop: "30px",
                backgroundImage:
                  "linear-gradient(to right, #59548C 0%, #388694 100%)",
                color: "#ffffff",
              }}
            >
              Back To Home
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default ErrorPage
