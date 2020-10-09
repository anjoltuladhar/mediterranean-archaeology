import React from "react"
import { makeStyles } from "@material-ui/core/styles";
import { Container, Paper, InputBase, IconButton } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import FetchData from "../Data/FetchData";
import SingleAttributeFilter from "./FilterOptions/SingleAttributeFilter";

const useStyles = makeStyles({
  topBar: {
    padding: "2px 25px",
    width: "80%",
    margin: "20px auto",
    minHeight: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 50
  },
  root: {
    padding: "2px 25px",
    margin: "20px auto",
    minHeight: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  input: {
    width: "80%",
    borderRadius: 50
  },
  iconButton: {
    transform: "translateX(20px)"
  },
  title: {},
  img: {},
  author: {},
  icon: {}
});

function filterOptions(values, handleClickFilter) {
  const { type, filter } = values;
  if (type === "single-attribute") {
    return (
      <SingleAttributeFilter
        beacon={filter}
        handleClickFilter={handleClickFilter}
      />
    );
  } else {
    return <h1>Filter</h1>;
  }
}

export default function Body(props) {
  const classes = useStyles()
  const { handleChange, handleClickFilter, values, handleClick, handleClose, loadImage, loadMore } = props;
  return (
    <Container maxWidth="md">
      <Paper className={classes.topBar}>
        <InputBase
          className={classes.input}
          placeholder={"Search by " + values.filter}
          onChange={handleChange}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <Search />
        </IconButton>
      </Paper>

      <Paper className={classes.root}>
        {filterOptions(values, handleClickFilter)}
      </Paper>

      <Paper className={classes.root} id="content-section" sm={12}>
        <FetchData values={values} handleClick={handleClick} handleClose={handleClose} loadImage={loadImage} loadMore={loadMore} />
      </Paper>
    </Container>
  );
}
