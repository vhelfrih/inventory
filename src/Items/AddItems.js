import * as React from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function AddItems(props) {
  const [enteredTitle, setEnteredTitle] = React.useState("");
  const [enteredAmount, setEnteredAmount] = React.useState(null);
  const [enteredPlace, setEnteredPlace] = React.useState("");
  const [enteredDate, setEnteredDate] = React.useState("");
  const [enteredCategory, setEnteredCategory] = React.useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddItem({
      title: enteredTitle,
      amount: +enteredAmount,
      place: enteredPlace,
      date: enteredDate,
      category: enteredCategory,
    });
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredPlace("");
    setEnteredDate("");
    setEnteredCategory("");
  };

  return (
    <form onSubmit={submitHandler}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        spacing={3}
        maxWidth="650px"
        margin="6px auto"
      >
        <Grid item>
          <FormControl xs={12}>
            <TextField
              label="Name"
              id="outlined-size-small"
              placeholder="Name"
              size="small"
              autoComplete="off"
              value={enteredTitle}
              onChange={(e) => {
                setEnteredTitle(e.target.value);
              }}
            />
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl xs={12}>
            <TextField
              label="Amount"
              id="outlined-size-small"
              placeholder="Amount"
              size="small"
              autoComplete="off"
              value={enteredAmount}
              onChange={(e) => {
                setEnteredAmount(e.target.value);
              }}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl xs={12} sm={6}>
            <InputLabel id="demo-simple-select-label">Place</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={enteredPlace}
              size="small"
              label="Place"
              onChange={(e) => {
                setEnteredPlace(e.target.value);
              }}
              style={{
                width: "25ch",
                height: "44px",
              }}
            >
              <MenuItem value={"basement"}>Basement</MenuItem>
              <MenuItem value={"pantry"}>Pantry</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl xs={12} sm={6}>
            <InputLabel id="date"></InputLabel>
            <TextField
              id="date"
              labelId="date"
              label="Expiry Date"
              type="date"
              value={enteredDate}
              size="small"
              onChange={(e) => {
                setEnteredDate(e.target.value);
              }}
              defaultValue="2022-12-31"
              InputLabelProps={{
                shrink: true,
              }}
              style={{
                width: "25ch",
                height: "44px",
              }}
            />
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl xs={12} sm={6}>
            <InputLabel id="demo-simple-select-helper-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={enteredCategory}
              label="Category"
              onChange={(e) => {
                setEnteredCategory(e.target.value);
              }}
              style={{
                width: "25ch",
                height: "44px",
              }}
              InputLabelProps={{
                shrink: true,
              }}
            >
              <MenuItem value={"dessert"}>Dessert</MenuItem>
              <MenuItem value={"drink"}>Drink</MenuItem>
              <MenuItem value={"cat food"}>Cat Food</MenuItem>
              <MenuItem value={"canned"}>Canned</MenuItem>
              <MenuItem value={"jam"}>Jam</MenuItem>
              <MenuItem value={"grains"}>Grains</MenuItem>
              <MenuItem value={"dairy"}>Dairy</MenuItem>
              <MenuItem value={"eggs"}>Eggs</MenuItem>
              <MenuItem value={"pickled"}>Pickled</MenuItem>
              <MenuItem value={"frozen"}>Frozen</MenuItem>
              <MenuItem value={"vegetable"}>Vegetable</MenuItem>
              <MenuItem value={"vegetable"}>Vinegar</MenuItem>
              <MenuItem value={"vitamin"}>Vitamin</MenuItem>
              <MenuItem value={"vegetable"}>Toilet Paper</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid container justifyContent="center" spacing={3} my="10px">
          <Button type="submit" style={{ width: "20%", height: "40px" }}>
            Add Item
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
