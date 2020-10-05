import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";

const useStyles = makeStyles({
  menuButton: {
    color: "#fff"
  },
  title: {
    color: "#fff"
  }
});

export default function Header() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          aria-label="menu"
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Mediterrenean Archaeology Catalog
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
