import React, { Component } from "react";
import Cards from "../components/Cards";
import SearchForm from "../containers/SearchForm";
import AxiosInstance from "../AxiosInstance";
import ErrorSnackBar from "./SnackBar";

class SearchResults extends Component {
  state = {
    results: null,
    error: null
  };

  fetchResults() {
    AxiosInstance.get(
      `/search${decodeURIComponent(this.props.location.search)}`
    )
      .then(response => {
        this.setState({ results: response.data, error: null });
      })
      .catch(error => {
        this.setState({ results: null, error: error.response.data.error });
      });
  }

  componentDidMount() {
    this.fetchResults();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.search !== this.props.location.search) {
      this.fetchResults();
    }
  }

  render() {
    let cardsArray = null;
    if (this.state.results) {
      cardsArray = Object.keys(this.state.results).map(orgName => {
        return (
          <div className="block" key={this.state.results[orgName]}>
            <Cards name={orgName} slug={this.state.results[orgName]} />
          </div>
        );
      });
    }
    if (this.state.error) {
      cardsArray = (
        <div className="error-msg">
          <ErrorSnackBar errMsg={this.state.error} />
        </div>
      );
    }
    return (
      <div className="container">
        <SearchForm />
        {cardsArray}
      </div>
    );
  }
}

export default SearchResults;
