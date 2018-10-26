import React, { Component } from "react";
import Cards from "../components/Cards";
import SearchForm from "../containers/SearchForm";

class SearchResults extends Component {
  render() {
    return (
      <div className="container">
        <SearchForm />
        <div className="block">
          <Cards />
        </div>
        <div className="block">
          <Cards />
        </div>
      </div>
    );
  }
}

export default SearchResults;
