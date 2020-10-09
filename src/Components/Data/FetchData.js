import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import GridItem from "./GridItem";
import { CircularProgress } from "@material-ui/core";

function convertData(data){
  if(Array.isArray(data)){
    const newData = data.map(d => d)
    return newData;
  }
  return -1;
}

function limitData(data, page){
  let newData = [];
  const length = page * 10;
  for (let i = 0; i < length; i++) {
    if(data[i] !== undefined){
      newData[i] = data[i];
    }
  }
  return newData;
}

export default function FetchData(props) {
  const { values, handleClick, handleClose, loadMore } = props;
  const sessionData = sessionStorage.getItem("data");
  let dom;

  if(sessionData === null){
    dom = <CircularProgress />;
    axios.get('https://enigmatic-spire-04219.herokuapp.com/all')
    .then(function (response) {
        const data = response.data.vase_shape;
        sessionStorage.setItem("data", JSON.stringify(data));
        const image = response.data.image_details;
        sessionStorage.setItem("image", JSON.stringify(image));
        // console.log("From API");
        const interData = convertData(data);
        const retrievedData = limitData(interData, values.page);
        console.log(retrievedData)
        var target = document.getElementById("item-list");
        if(target.hasChildNodes()){
          target.removeChild(target.childNodes[0]);
        }

        var location = document.getElementById("listContainer");
        if(interData.length > (values.page * 10)){
          if(location.childNodes.length < 2){
            var myloadbtn = document.createElement("button");
            myloadbtn.setAttribute("class","loadMoreButton");
            myloadbtn.addEventListener("click", loadMore);
            myloadbtn.innerHTML = "Load More";
            location.appendChild(myloadbtn);
          }
        }
        else{
          location.removeChild(location.childNodes[1]);
        }

        ReactDOM.render(<GridItem data={retrievedData} values={values} handleClick={handleClick} handleClose={handleClose} />,target);
    })
    .catch(function (error) {
      // handle errors
      console.log(error);
    });
  }
  else{
    const interData = JSON.parse(sessionData);
    const retrievedData = limitData(interData, values.page);
    
    // console.log(retrievedData)
    setTimeout(function(){

      var location = document.getElementById("listContainer");
        if(interData.length > (values.page * 10)){
          if(location.childNodes.length < 2){
            var myloadbtn = document.createElement("button");
            myloadbtn.setAttribute("class","loadMoreButton");
            myloadbtn.addEventListener("click", loadMore);
            myloadbtn.innerHTML = "Load More";
            location.appendChild(myloadbtn);
          }
        }
        else{
          location.removeChild(location.childNodes[1]);
        }

      var target = document.getElementById("item-list");
      ReactDOM.render(<GridItem data={retrievedData} values={values} handleClick={handleClick} handleClose={handleClose} />,target);
    }, 200);
  }

  return(
    <div id="listContainer">
      <div id="item-list" style={{display: "block", width: "100%"}}>
        { dom }
      </div>
    </div>
  )
}