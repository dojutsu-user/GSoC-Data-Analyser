import React from "react";
import AppBar from "../components/AppBar";
import GSoCLogo from "../components/gsocImage";
import SearchForm from "../containers/SearchForm";

const layout = props => {
  return (
    <React.Fragment>
      <AppBar />
      <div className="row">
        <div className="image">
          <GSoCLogo />
        </div>
        <div className="form">
          <SearchForm />
        </div>
      </div>
    </React.Fragment>
  );
};

export default layout;
