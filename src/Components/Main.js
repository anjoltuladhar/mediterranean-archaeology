import React, { Component } from "react";
import Header from "./Sections/Header";
import Body from "./Sections/Body";

export default class Main extends Component {
  state = {
    display: "all",
    searchData: "",
    type: "single-attribute",
    filter: "description",
    item: [],
    selected_image: '',
    open: false,
    page: 1
  };

  handleClick = i => e => {
    this.setState({item: i, open: true});
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

  loadMore = () => {
    this.setState({page: this.state.page + 1});
  }

  render() {
    const { display, searchData, type, filter, item, open, selected_image, page } = this.state;
    const values = { display, searchData, type, filter, item, open, selected_image, page };

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
          loadMore={this.loadMore}
        />
        {/* <Footer /> */}
      </div>
    );
  }
}
