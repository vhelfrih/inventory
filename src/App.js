import { useState, useEffect } from "react";
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import WbSunnyTwoToneIcon from "@mui/icons-material/WbSunnyTwoTone";
import Brightness2TwoToneIcon from "@mui/icons-material/Brightness2TwoTone";
import EnhancedTable from "./Items/EnhancedTable";
import AddItems from "./Items/AddItems";
import { CssBaseline, Grid } from "@mui/material";
import ButtonAppBar from "./UI/Header";

const App = (props) => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [darkMode, setDarkMode] = useState(getInitialMode());

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(darkMode));
  }, [darkMode]);

  function getInitialMode() {
    const savedMode = JSON.parse(localStorage.getItem("dark"));
    return savedMode || false;
  }

  useEffect(() => {
    fetch(
      "https://inventory-4c09f-default-rtdb.europe-west1.firebasedatabase.app/items.json"
    )
      .then((response) => response.json())
      .then((responseData) => {
        const loadedItems = [];
        for (const key in responseData) {
          loadedItems.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
            place: responseData[key].place,
            date: responseData[key].date,
            category: responseData[key].category,
          });
        }
        setRows(loadedItems);
      });
  }, []);

  const addItemHandler = (item) => {
    setIsLoading(true);
    fetch(
      "https://inventory-4c09f-default-rtdb.europe-west1.firebasedatabase.app/items.json",
      {
        method: "POST",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
      .then((responseData) => {
        setRows((prevItems) => [
          ...prevItems,
          { id: item.id, ...item },
        ]);
      });
  };

  const removeItemHandler = (itemId) => {
    setIsLoading(true);
    fetch(
      `https://inventory-4c09f-default-rtdb.europe-west1.firebasedatabase.app/items/${itemId}.json`,
      {
        method: "DELETE",
      }
    ).then((response) => {
      setIsLoading(false);
      setRows((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
      );
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ height: "100vh" }}>
        <CssBaseline />
        <ButtonAppBar />
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          overflow="hidden"
          my="10px"
        >
          <Grid item>
            <WbSunnyTwoToneIcon
              style={darkMode ? { color: "yellow" } : { color: "salmon" }}
            />
          </Grid>
          <Grid item>
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </Grid>
          <Grid item>
            <Brightness2TwoToneIcon
              style={darkMode ? { color: "salmon" } : { color: "yellow" }}
            />
          </Grid>
        </Grid>

        {/* <Grid
          container
          justifyContent="center"
          alignItems="center"
          alignContent="space-between"
          spacing={2}
          my="10px"
        > */}
          {/* <Grid item> */}
            <AddItems
              onAddItem={addItemHandler}
              loading={isLoading}
            />
          {/* </Grid> */}

          <Grid item justifyContent="center" alignItems="center">
            <EnhancedTable rows={rows} onRemoveItem={removeItemHandler} />
          </Grid>
        {/* </Grid> */}
      </Paper>
    </ThemeProvider>
  );
};

export default App;