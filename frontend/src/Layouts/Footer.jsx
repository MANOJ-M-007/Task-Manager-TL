import React from "react";
import { Stack } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
// import Logo from "../../assets/LOGO TRANS.png";
import { Box } from "@mui/system";
const Footer = () => {
  const isAboveLgScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  return (
    <>
      <Stack
        sx={{
          bgcolor: "second.main",
          padding: 3,
          display: "flex",
          justifyContent: "space-around",
          marginTop: 6,
        }}
        direction={isAboveLgScreen ? "row" : "column"}
      >
        <Stack>
          <Typography
            sx={{ fontWeight: 500, lineHeight: 2.3 }}
            color="default.main"
          >
            About Us
          </Typography>
          <Typography
            sx={{ fontWeight: 500, lineHeight: 2.3 }}
            color="default.main"
          >
            Blog
          </Typography>
        </Stack>
        {!isAboveLgScreen && (
          <Divider color="third.main" sx={{ marginY: 1.5 }} />
        )}
        <Stack>
          <Typography
            sx={{ fontWeight: 500, lineHeight: 2.3 }}
            color="default.main"
          >
            For Users
          </Typography>
          <Typography
            sx={{ fontWeight: 500, lineHeight: 2.3 }}
            color="default.main"
          >
            Career
          </Typography>
          <Typography
            sx={{ fontWeight: 500, lineHeight: 2.3 }}
            color="default.main"
          >
            Help
          </Typography>
        </Stack>
        {!isAboveLgScreen && (
          <Divider color="third.main" sx={{ marginY: 1.5 }} />
        )}
        <Stack>
          <Typography
            sx={{ fontWeight: 500, lineHeight: 2.3 }}
            color="default.main"
          >
            Contact Us
          </Typography>
          <Typography
            sx={{ fontWeight: 500, lineHeight: 2.3 }}
            color="default.main"
          >
            Connect
          </Typography>
          <Typography
            sx={{ fontWeight: 500, lineHeight: 2.3 }}
            color="default.main"
          >
            More
          </Typography>
        </Stack>
        {!isAboveLgScreen && (
          <Divider color="third.main" sx={{ marginY: 1.5 }} />
        )}
        <Stack>
          <Typography
            sx={{ fontWeight: 500, lineHeight: 2.3 }}
            color="default.main"
          >
            Developers
          </Typography>
          <Typography
            sx={{ fontWeight: 500, lineHeight: 2.3 }}
            color="default.main"
          >
            Privacy Policy
          </Typography>
          <Typography
            sx={{ fontWeight: 500, lineHeight: 2.3 }}
            color="default.main"
          >
            Terms & Conditions
          </Typography>
        </Stack>
        {!isAboveLgScreen && (
          <Divider color="third.main" sx={{ marginY: 1.5 }} />
        )}
        <Stack>
          <Typography
            sx={{ fontWeight: 500, lineHeight: 2.3 }}
            color="default.main"
          >
            Social Medias
          </Typography>
          <Typography
            sx={{ fontWeight: 500, lineHeight: 2.3 }}
            color="default.main"
          >
            Facebook
          </Typography>
          <Typography
            sx={{ fontWeight: 500, lineHeight: 2.3 }}
            color="default.main"
          >
            Twitter
          </Typography>
        </Stack>
        {!isAboveLgScreen && (
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            direction="row"
          >
            {/* <Box
              component="img"
              src={Logo}
              alt="Example"
              sx={{
                height: "auto",
                width: { xs: 35, sm: 45, md: 55 },
                marginLeft: 3,
              }}
            /> */}
            <Typography
              variant="body2"
              color="default.main"
              sx={{ mt: 1.3, marginLeft: 3 }}
            >
              {"Copyright © "}
              TASK MANAGER {new Date().getFullYear()}
            </Typography>
          </Stack>
        )}
      </Stack>
      {isAboveLgScreen && (
        <Stack
          sx={{
            bgcolor: "third.main",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 3,
          }}
        >
          <Typography variant="body2" color="white">
            {"Copyright © "}
            TASK MANAGER {new Date().getFullYear()}
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default Footer;
