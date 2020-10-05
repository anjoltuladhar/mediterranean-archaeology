import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  buttonItem: {
    margin: 5
  }
});

export default function SingleAttributeFilter(props) {
  const { beacon, handleClickFilter } = props;

  const classes = useStyles();

  const descActive = beacon === "description" ? "contained" : "outlined";
  const schoActive = beacon === "scholarName" ? "contained" : "outlined";
  const vNameActive = beacon === "vaseName" ? "contained" : "outlined";
  const vLocActive = beacon === "vaseLocation" ? "contained" : "outlined";
  return (
    <div style={{ margin: "0 auto" }}>
      <Button
        variant={descActive}
        color="primary"
        className={classes.buttonItem}
        onClick={handleClickFilter("description")}
      >
        Description
      </Button>
      <Button
        variant={schoActive}
        color="primary"
        className={classes.buttonItem}
        onClick={handleClickFilter("scholarName")}
      >
        Scholar Name
      </Button>
      <Button
        variant={vNameActive}
        color="primary"
        className={classes.buttonItem}
        onClick={handleClickFilter("vaseName")}
      >
        Vase Name
      </Button>
      <Button
        variant={vLocActive}
        color="primary"
        className={classes.buttonItem}
        onClick={handleClickFilter("vaseLocation")}
      >
        Vase Location
      </Button>
    </div>
  );
}
