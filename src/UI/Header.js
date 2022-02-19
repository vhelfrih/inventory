import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import app from "../base";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" >
        <Toolbar sx={{
        '&.css-1oqqzyl-MuiContainer-root': {
          padding: "0"
      }
      }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home Inventory
          </Typography>
          <Button color="inherit" onClick={() => app.auth().signOut()}>
            LOG OUT
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
