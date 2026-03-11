import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import FunctionalComponent from './components/01-basic-components/FunctionalComponent';
import ClassComponent from './components/01-basic-components/ClassComponent';
import ComponentDemo from './components/01-basic-components/ComponentDemo';
import PropsBasics from './components/02-props/PropsBasics';
import PropsDestructuring from './components/02-props/PropsDestructuring';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <FunctionalComponent /> */}
    {/* <ClassComponent /> */}
    {/* <ComponentDemo /> */}
    {/* <PropsBasics /> */}
    <PropsDestructuring />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
