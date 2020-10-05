import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import axios from "axios";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";

const useStyles = makeStyles({
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

    console.log(searchedData)

    return (
      <div>
        <GridList cellHeight={180} className={classes.gridList} cols={3}>

          {searchedData.map((tile) => (
            <GridListTile
              key={tile.vase_number}
              className={classes.listItem}
              onClick={handleClick(tile)}
            >
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                title={tile.description}
                // actionIcon={
                //   <IconButton
                //     aria-label={`info about ${tile.title}`}
                //     className={classes.icon}
                //   >
                //     <InfoIcon />
                //   </IconButton>
                // }
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
            <DialogTitle id="alert-dialog-title">{"Vase Details"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {"attribute and value based view"}
              </DialogContentText>
              <TableContainer component={Paper}>
                    <Table className="mytableContainer" aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>{"Attribute"}</TableCell>
                            <TableCell align="left">{"Value"}</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key={item.vase_number}>
                                <TableCell component="th" scope="row">
                                    {"Vase Number"}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {item.vase_number}
                                </TableCell>
                            </TableRow>
                            <TableRow key={item.vase_number + "" + item.description}>
                                <TableCell component="th" scope="row">
                                    {"Description"}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {item.description}
                                </TableCell>
                            </TableRow>
                            <TableRow key={item.scholor_name}>
                                <TableCell component="th" scope="row">
                                    {"Scholar Name"}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {item.scholor_name}
                                </TableCell>
                            </TableRow>
                            <TableRow key={item.vase_name}>
                                <TableCell component="th" scope="row">
                                    {"Vase Name"}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {item.vase_name}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
          </Dialog>

        </div>
      )
} 