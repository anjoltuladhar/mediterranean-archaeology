import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import "../../mystyles.css"
// import axios from "axios";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  Dialog,
  DialogActions,
  Button,
  Card,
  CardHeader, 
  CardMedia,
  CardContent,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles({
    root: {},
    media: {
      height: 300,
      width: "85%",
      margin: "0 auto",
      backgroundSize: "contain",
    },
    gridList: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      overflow: "hidden",
      padding: 20,
      boxSizing: "border-box",
      gridGap: "2%"
    },
    listItem: {
      border: "1px solid #cdcdcd",
      width: "30% !important",
      margin: "10px 0",
      cursor: "pointer",
      "&:hover": {
        boxShadow: "0 0 10px rgba(0,0,0,0.3)"
      }
    },
    avatar: {}
  });
  
  function filter(data, values) {
    const { display, searchData, filter } = values;
    if (display === "all") {
      return data;
    } else {
      let newData = {};
      if (filter === "description") {
        newData = data.filter(
          (item) =>
            item.description.toLowerCase().indexOf(searchData.toLowerCase()) !==
            -1
        );
      } else if (filter === "scholarName") {
        newData = data.filter(
          (item) =>
            item.scholor_name.toLowerCase().indexOf(searchData.toLowerCase()) !==
            -1
        );
      } else if (filter === "vaseName") {
        newData = data.filter(
          (item) =>
            item.vase_name.toLowerCase().indexOf(searchData.toLowerCase()) !== -1
        );
      } else if (filter === "vaseLocation") {
        newData = data.filter(
          (item) =>
            item.vase_location.toLowerCase().indexOf(searchData.toLowerCase()) !==
            -1
        );
      }
  
      return newData;
    }
  }

export default function GridItem(props){
    const classes = useStyles();
    const { data, values, handleClick, handleClose } = props;
    // axios.get("https://enigmaic-spire-04219.herokuapp.com/getimage/9").then(response => {
    //     console.log(response)
    // })

    const { open, item } = values;

    const searchedData = filter(data, values)

    // console.log(searchedData)

    return (
      <div>
        <GridList cellHeight={180} className={classes.gridList} cols={3}>

          {searchedData.map((tile) => (
            <GridListTile
              key={tile.vase_number}
              className={classes.listItem}
              onClick={handleClick(tile)}
            >
              <img src="./images/P-1-1.png" alt={tile.title} />
              <GridListTileBar
                title={tile.vase_number + ": " + tile.vase_name}
              />
            </GridListTile>
          ))}
        </GridList>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
          >
            <Card className={classes.root}>
              <CardHeader
                title={item.vase_name}
                subheader={"Location: " + item.vase_location}
              />
              <CardMedia
                className={classes.media}
                image="./images/P-1-1.png"
                title={item.vase_name}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.description}
                  <strong>{"Scholar Name: "}</strong> {item.scholor_name}                  
                </Typography>
              </CardContent>
          </Card>
          <DialogActions>
            <Button onClick={handleClose}>{"Close"}</Button>
          </DialogActions>
          </Dialog>

        </div>
      )
} 