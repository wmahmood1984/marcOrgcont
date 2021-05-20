// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import {store} from './store/store'
// import {Provider} from 'react-redux'

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//     <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Drizzle } from "@drizzle/store";
import YOLOYearly from "./contracts/YOLOYearly.json";
import YOLOMonthly from "./contracts/YOLOMonthly.json";
import YOLOWeekly from "./contracts/YOLOWeekly.json";
import PancakePair from "./contracts/PancakePair.json";
import YOLO from "./contracts/YOLO.json";


// let drizzle know what contracts we want and how to access our test blockchain
const options = {
  contracts: [YOLOYearly,PancakePair,YOLO,YOLOMonthly,YOLOWeekly],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545",
    },
  },
};

// setup drizzle
const drizzle = new Drizzle(options);

ReactDOM.render(
  <React.StrictMode>
    <App drizzle={drizzle}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

