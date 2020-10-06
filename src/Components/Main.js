import React, { Component } from "react";
import Header from "./Sections/Header";
import Body from "./Sections/Body";
import axios from "axios";
// import Footer from "./Sections/Footer";

export default class Main extends Component {
  state = {
    display: "all",
    searchData: "",
    type: "single-attribute",
    filter: "description",
    item: [],
    selected_image: '',
    open: false
  };

  handleClick = i => e => {
    this.setState({item: i, open: true});
    axios.get("https://enigmatic-spire-04219.herokuapp.com/getimage/" + i.vase_number).then(response => {
        const img_name = response.data.image_details[0].image_name;
        console.log(img_name);
        this.setState({selected_image: img_name});
    });
  }

  handleClose = () => {
    this.setState({item: [], open: false});
  }

  handleChange = (e) => {
    if (e.target.value.length > 0) {
      this.setState({
        display: "filter",
        searchData: e.target.value
      });
    } else {
      this.setState({
        display: "all",
        searchData: ""
      });
    }
  };

  handleClickFilter = (input) => (e) => {
    if (input !== this.state.filter) {
      this.setState({ filter: input });
    }
  };

  render() {
    const { display, searchData, type, filter, item, open, selected_image } = this.state;
    const values = { display, searchData, type, filter, item, open, selected_image };
    return (
      <div style={{ background: "#cdcdcd", paddingBottom: 10 }}>
        <Header />
        <Body
          handleChange={this.handleChange}
          handleClickFilter={this.handleClickFilter}
          values={values}
          handleClick={this.handleClick}
          handleClose={this.handleClose}
          loadImage={this.loadImage}
        />
        {/* <Footer /> */}
      </div>
    );
  }
}
