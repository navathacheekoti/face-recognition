import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "tachyons";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import RootReducer from './redux/reducer';

const logger = createLogger();
const store = createStore(RootReducer, applyMiddleware(thunk, logger));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));
registerServiceWorker();
