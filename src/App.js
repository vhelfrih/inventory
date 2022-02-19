import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./UI/Home";
import Login from "./UI/Login";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from "@mui/material";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <CssBaseline/>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;