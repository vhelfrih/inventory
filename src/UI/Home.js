import React from "react";
import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import WbSunnyTwoToneIcon from "@mui/icons-material/WbSunnyTwoTone";
import Brightness2TwoToneIcon from "@mui/icons-material/Brightness2TwoTone";
import EnhancedTable from "../Items/EnhancedTable";
import AddItems from "../Items/AddItems";
import { Container, CssBaseline, Grid } from "@mui/material";
import ButtonAppBar from "./Header";

const Home = (props) => {
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
        setRows((prevItems) => [...prevItems, { id: item.id, ...item }]);
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
      setRows((prevItems) => prevItems.filter((item) => item.id !== itemId));
    });
  };

  return (
    <Container sx={{ padding: "0" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ButtonAppBar />
        <>
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
          <AddItems onAddItem={addItemHandler} loading={isLoading} />
          <Grid item justifyContent="center" alignItems="center">
            <EnhancedTable rows={rows} onRemoveItem={removeItemHandler} />
          </Grid>
        </>
      </ThemeProvider>
    </Container>
  );
};

export default Home;
