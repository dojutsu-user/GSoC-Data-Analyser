import React, { Component } from "react";
import AxiosInstance from "../AxiosInstance";
import ErrorSnackBar from "./SnackBar";
import { Bar } from "react-chartjs-2";
import Spinner from "../components/Spinner";

class OrgInfo extends Component {
  state = {
    info: null,
    error: false,
    hasResults: false,
    loading: true
  };
  componentDidMount() {
    AxiosInstance.get(`/org/${this.props.match.params.slug}`).then(
      response => {
        this.setState({
          info: response.data,
          error: false,
          hasResults: true,
          loading: false
        });
      },
      error => {
        this.setState({
          info: null,
          error: true,
          hasResults: false,
          loading: false
        });
      }
    );
  }
  render() {
    let result = null;
    if (this.state.hasResults) {
      const labels = this.state.info.years_of_participation;
      labels.sort();
      const projectsPerYear = labels.map(year => {
        if (this.state.info.projects_each_year[year]) {
          return this.state.info.projects_each_year[year];
        } else {
          return 0;
        }
      });
      const bargraphData = {
        labels: labels,
        datasets: [
          {
            label: "No. Of Projects/Year",
            backgroundColor: "rgba(205, 49, 237,0.2)",
            borderColor: "rgba(205, 49, 237,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(205, 49, 237,0.4)",
            hoverBorderColor: "rgba(205, 49, 237,1)",
            data: projectsPerYear
          }
        ]
      };
      result = (
        <div>
          <h1 className="title">{this.state.info.org_name}</h1>
          <Bar data={bargraphData} />
        </div>
      );
    } else {
      if (this.state.error) {
        result = (
          <ErrorSnackBar
            errMsg={this.state.error.length > 0 ? this.state.error : "Error"}
          />
        );
      }
    }
    if (this.state.loading) {
      result = <Spinner />
    }
    return <div className="graph-container">{result}</div>;
  }
}

export default OrgInfo;
