import { Button, Typography } from "@mui/material";
import Image from "next/image";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { signIn } from "next-auth/react";

export default function Providers() {
  // GOOGLE SIGNIN
  async function googleSignin() {
    signIn("google");
  }

  // GITHUB SIGNIN
  async function githubSignin() {
    signIn("github");
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
          width: "100%",
          gap: "10px",
        }}
      >
        <Image
          src="/img/providerline.png"
          width={"100"}
          height="1"
          alt="close"
        />
        <Typography
          variant="h6"
          fontWeight="700"
          fontFamily="Montserrat"
          fontSize={14}
          sx={{ color: "rgba(128, 128, 128, 1)", cursor: "pointer" }}
        >
          OR
        </Typography>
        <Image
          src="/img/providerline.png"
          width={"100"}
          height="1"
          alt="close"
        />
      </div>
      <Button
        size="large"
        variant="outlined"
        startIcon={<GoogleIcon />}
        fullWidth
        color="inherit"
        sx={{ textTransform: "none", marginTop: "2em" }}
        onClick={() => googleSignin()}
      >
        Continue with Google
      </Button>
      <Button
        size="large"
        variant="outlined"
        startIcon={<GitHubIcon />}
        fullWidth
        color="inherit"
        sx={{ textTransform: "none", marginTop: "1em" }}
        onClick={() => githubSignin()}
      >
        Continue with Github
      </Button>
    </>
  );
}
