import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import GridItem from "./GridItem";
// import { CircularProgress } from "@material-ui/core"

function convertData(data){
  if(Array.isArray(data)){
    const newData = data.map(d => d)
    return newData;
  }
  return -1;
}

export default function FetchData(props) {
  const { values, handleClick, handleClose } = props;
  const sessionData = sessionStorage.getItem("data");
  let dom = [];

  if(sessionData === null){
    axios.get('https://enigmatic-spire-04219.herokuapp.com/all')
    .then(function (response) {
        const data = response.data.vase_shape;
        sessionStorage.setItem("data", JSON.stringify(data));
        const image = response.data.image_details;
        sessionStorage.setItem("image", JSON.stringify(image));
        console.log("From API");
        const sendData = convertData(data);
        ReactDOM.render(<GridItem data={sendData} values={values} handleClick={handleClick} handleClose={handleClose} />,document.getElementById("item-list"));
    })
    .catch(function (error) {
      // handle errors
      console.log(error);
    });
  }
  else{
    const sendData = JSON.parse(sessionData);
    // dom = <GridItem data={sendData} values={values} handleClick={handleClick} handleClose={handleClose} />
    setTimeout(function(){
      ReactDOM.render(<GridItem data={sendData} values={values} handleClick={handleClick} handleClose={handleClose} />,document.getElementById("item-list"));
    }, 2000)
  }

  return(
    <div id="item-list" style={{display: "block", width: "100%"}}>
      { dom }
    </div>
  )
}