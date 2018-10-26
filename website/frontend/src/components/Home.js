import React from "react";
import GSoCLogo from "./gsocImage";
import SearchForm from "../containers/SearchForm";

const home = props => {
  return (
    <React.Fragment>
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

export default home;
