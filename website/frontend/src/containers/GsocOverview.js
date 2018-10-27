import React, { Component } from "react";
import AxiosInstance from "../AxiosInstance";
import ErrorSnackBar from "./SnackBar";
import { Line, Radar } from "react-chartjs-2";

class GsocOverview extends Component {
  state = {
    data: null,
    error: false,
    hasResults: false
  };
  componentDidMount() {
    AxiosInstance.get("/overview/gsoc").then(
      response =>
        this.setState({ data: response.data, error: false, hasResults: true }),
      error => {
        this.setState({ data: null, error: true, hasResults: false });
      }
    );
  }
  render() {
    let charts = null;
    if (this.state.hasResults) {
      const labels = Object.keys(this.state.data).filter(year => {
        return !isNaN(year);
      });
      const noOfOrgsParticipated = Object.keys(this.state.data).map(
        year => this.state.data[year].no_of_orgs
      );
      const noOfProjectsDone = Object.keys(this.state.data).map(
        year => this.state.data[year].no_of_projects
      );
      const commonDatasets = {
        label: "Label Here",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: ""
      };
      const datasetsForRadarMap = {
        labels: labels,
        datasets: [
          {
            label: "Orgs/Year",
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: noOfOrgsParticipated
          },
          {
            label: "Projects/Year",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: noOfProjectsDone
          }
        ]
      };
      const dataForOrgs = {
        labels: labels,
        datasets: [
          {
            ...commonDatasets,
            label: "Orgs/year",
            data: noOfOrgsParticipated
          }
        ]
      };
      const dataForProjects = {
        labels: labels,
        datasets: [
          {
            ...commonDatasets,
            label: "Projects/year",
            data: noOfProjectsDone,
            backgroundColor: "rgba(193, 19, 106,0.4)",
            borderColor: "rgba(193, 19, 106,1)",
            pointHoverBackgroundColor: "rgba(193, 19, 106,1)",
            pointHoverBorderColor: "rgba(193, 19, 106,1)",
            pointBorderColor: "rgba(193, 19, 106,1)"
          }
        ]
      };
      charts = (
        <div>
          <Line data={dataForOrgs} />
          <div style={{ height: "30px" }}> </div>
          <div className="full-summary">
            Total Organizations: {this.state.data.total_orgs}
          </div>
          <div style={{ height: "50px" }}> </div>
          <Line data={dataForProjects} />
          <div style={{ height: "30px" }}> </div>
          <div className="full-summary">
            Total Projects: {this.state.data.total_projects}
          </div>
          <div style={{ height: "60px" }}> </div>
          <Radar data={datasetsForRadarMap} />
          <div style={{ height: "60px" }}> </div>
        </div>
      );
    }
    return <div className="graph-container">{charts}</div>;
  }
}

export default GsocOverview;
