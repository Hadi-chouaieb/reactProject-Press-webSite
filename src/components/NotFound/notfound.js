import React from "react";
import { Link, useParams } from "react-router-dom";
import { PiEyeClosedBold } from "react-icons/pi";
import { IoArrowBackCircleSharp } from "react-icons/io5";

import "./not.css"
const Notfound=()=>{

    const goback=()=>{
        window.history.back()
    }
    return(
    <>
    <div className="container text-center mt-5"> 
    <h3>404</h3>
    <PiEyeClosedBold size={50}/>
    <PiEyeClosedBold size={50}/>
    <p>Oops! Page not found.</p>
      <div className="mt-5">
        <Link to={"/"} ><IoArrowBackCircleSharp color="green" size={40}/></Link>
      </div>
  </div>
    
    </>)

}

export default Notfound;