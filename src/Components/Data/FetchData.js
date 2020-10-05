import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import GridItem from "./GridItem";

export default function FetchData(props) {
  const { values, handleClick, handleClose } = props;

  axios.get('https://enigmatic-spire-04219.herokuapp.com/all')
  .then(function (response) {
      const data = response.data.vase_shape;
      ReactDOM.render(<GridItem data={data} values={values} handleClick={handleClick} handleClose={handleClose} />,document.getElementById('item-list'));
  })
  .catch(function (error) {
    // handle errors
    console.log(error);
  });
  return(
    <div id="item-list" style={{display: "block", width: "100%"}}>
    </div>
  )
}