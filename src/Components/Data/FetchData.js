import React from "react";
import axios from "axios";
// import ReactDOM from "react-dom";
import GridItem from "./GridItem";

export default function FetchData(props) {
  const { values, handleClick, handleClose } = props;
  const sessionData = sessionStorage.getItem("data");
  let dom = []

  if(sessionData === null){
    axios.get('https://enigmatic-spire-04219.herokuapp.com/all')
    .then(function (response) {
        const data = response.data.vase_shape;
        sessionStorage.setItem("data", JSON.stringify(data));
        const image = response.data.image_details;
        sessionStorage.setItem("image", JSON.stringify(image));
        console.log("From API");
        dom = <GridItem data={data} values={values} handleClick={handleClick} handleClose={handleClose} />;
    })
    .catch(function (error) {
      // handle errors
      console.log(error);
    });
  }
  else{
    const data = JSON.parse(sessionData);
    dom = <GridItem data={data} values={values} handleClick={handleClick} handleClose={handleClose} />
  }

  return(
    <div id="item-list" style={{display: "block", width: "100%"}}>
      { dom }
    </div>
  )
}