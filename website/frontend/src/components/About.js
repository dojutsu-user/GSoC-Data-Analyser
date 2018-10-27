import React from "react";

const about = () => {
  return (
    <div>
      <div className="disc-container">
        <h1 className="title">Disclaimer</h1>
        <p>
          This project is intended for the audience to have a glance of the
          various GSoC organizations and projects that have participated since
          2009. It is completely open source and has no value intentions to
          commercialise complete or any part of the same.
        </p>
        <p>
          The data has been obtained from the website of Google Summer Of Code
          itself and is available in the form of API endpoints as mentioned in
          the documentation. The developer is on no part the owner of any
          resources used and does not claim to hold the permissions to use the
          project.
        </p>
      </div>
      <div className="disc-container">
        <a
          href="https://github.com/dojutsu-user/GSoC-Data-Analyser"
          style={{ color: "black" }}
        >
          <i class="fab fa-github fa-3x" />
        </a>
      </div>
      <p class="made-with-love">
        Made With ❤️ By{" "}
        <a href="https://github.com/dojutsu-user">Vaibhav Gupta</a>
      </p>
    </div>
  );
};

export default about;
