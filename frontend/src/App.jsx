import { useEffect } from 'react';
import './App.css';
import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.js"
import {Route, BrowserRouter as Router, Routes,Switch} from "react-router-dom"
import webFont from "webfontloader"
import Home from "./component/Home/Home.jsx"

function App() {
  useEffect(()=>{
    webFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })
  },[])
  
  return (
    <Router>
      <Header/> 
        <Routes>
          <Route path='/' Component={Home}/>
        </Routes>

      <Footer/>
    </Router>
  );
}

export default App;
