import React, { useCallback, useContext } from "react";
import { Redirect, withRouter } from "react-router-dom";
import app from "../base.js";
import { AuthContext } from "../Auth";
import { Button, CssBaseline, Grid, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  const CustomizedTextfield = styled(TextField)`
  
  &.MuiTextField-root {
    background: #e9d8a6;
  }

  &.MuiTextField-root:hover {
    background: darkslateblue;
  }
`;

  return (
    <CssBaseline>
      <Grid
        container
        spacing={0}
        align="center"
        justify="center"
        direction="column"
        maxWidth="100vw"
        height="100vh"
        sx={{ bgcolor: "#001219", pt: "2rem"}}
      >
        <form onSubmit={handleLogin}>
          <Typography
            variant="h2"
            color="darkslateblue"
            gutterBottom
            component="h2"
          >
            Home Inventory
          </Typography>

          <Grid item sm={4}>
            <CustomizedTextfield
              label="Email"
              placeholder="Email"
              size="small"
              name="email"
              type="email"
              autoComplete="on"
              margin="normal"
              required
            />
          </Grid>
          <Grid item sm={4}>
            <CustomizedTextfield
              label="Password"
              placeholder="Password"
              size="small"
              name="password"
              type="password"
              autoComplete="off"
              margin="normal"
              required
              />
          </Grid>
          <Grid item xs={3} sm={4}>
            <Button
              type="submit"
              variant="outlined"
              size="large"
              sx={{ color: "darkslateblue", mt: 3 }}
            >
              LOGIN
            </Button>
          </Grid>
          <Typography component="div">
            <Typography
              variant="h6"
              color="darkslateblue"
              component="h2"
              sx={{ mt: 3 }}
            >
              To access this demo site
              <Typography
                variant="h6"
                color="darkslateblue"
                component="h6"
                fontWeight="light"
              >
                Email: test@test.com <br />
                Password: demo123
              </Typography>
            </Typography>
          </Typography>
        </form>
      </Grid>
    </CssBaseline>
  );
};

export default withRouter(Login);
