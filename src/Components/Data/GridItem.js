import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import "../../mystyles.css";
import MySlider from './MySlider';
import {
  GridList,
  GridListTile,
  GridListTileBar,
  Dialog,
  DialogActions,
  Button,
  Card,
  CardHeader, 
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
      },
      "@media (max-width: 700px)": {
        width: "45% !important"
      },
      "@media (max-width: 500px)": {
        width: "100% !important"
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
        console.log("desc working")
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

function getImage(id){
  const whole_data = JSON.parse(sessionStorage.getItem("image"));
  var i;
  let img_name = "noimage.png";
  for(i = 0; i < whole_data.length; i++ ){
    if(whole_data[i].vase_number === id){
      img_name = whole_data[i].image_name;
      return img_name;
    }
  }
  return img_name;
}

function getImages(id){
  const whole_data = JSON.parse(sessionStorage.getItem("image"));
  var i;
  var j = 0;
  let img_name = [];
  for(i = 0; i < whole_data.length; i++ ){
    if(whole_data[i].vase_number === id){
      img_name[j] = whole_data[i].image_name;
      j++;
    }
  }
  return img_name;
}

export default function GridItem(props){
    const classes = useStyles();
    const { data, values, handleClick, handleClose } = props;

    const { open, item } = values;

    const searchedData = filter(data, values);

    return (
      <div>
        <GridList cellHeight={180} className={classes.gridList} cols={3}>

          {searchedData.map((tile) => (
            <GridListTile
              key={tile.vase_number}
              className={classes.listItem}
              onClick={handleClick(tile)}
            >
              <img src={"./images/" + getImage(tile.vase_number)} alt={tile.title} />
              <GridListTileBar
                title={tile.vase_number + ": " + tile.vase_name}
              />
            </GridListTile>
          ))}
        </GridList>
        <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
          >
            <Card className={classes.root}>
              <CardHeader
                title={item.vase_number + ": " + item.vase_name}
                subheader={"Location: " + item.vase_location}
              />
              <MySlider images={getImages(item.vase_number)}/>
              <CardContent style={{ maxHeight: 100, overflowY: "scroll" }}>
                <Typography variant="body2" color="textSecondary" component="p">
                  <strong>{"Scholar Name: "}</strong> {item.scholor_name}<br/>                
                  {item.description}<br/>
                  <strong>{"Plate Number: "}</strong> {item.vase_plate}<br/>
                  <strong>{"Publication: "}</strong> {item.publication}<br/>
                  <strong>{"Dimension: "}</strong> {item.dimension}<br/>
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