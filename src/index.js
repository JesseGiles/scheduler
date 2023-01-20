import React from "react";
import ReactDOM from "react-dom";

import "index.scss";

import Application from "components/Application";

// configure the client project to only use the base URL value when it exists as part of railway api server stretch
if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

ReactDOM.render(<Application />, document.getElementById("root"));
