import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DataProvider } from './components/Dataproducer/DataProducer.jsx'
import {initialState, reducer} from './Utility/reducer.js'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataProvider reducer={reducer} initinalState={initialState}>
      <App />
    </DataProvider>
  </React.StrictMode>
);
