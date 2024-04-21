import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaBridge } from "react-icons/fa6";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { FaBridgeCircleXmark } from "react-icons/fa6";


import "./not.css"
const Notfound=()=>{

    const goback=()=>{
        window.history.back()
    }
    return(
    <>
    <div className="container text-center mt-5"> 
    <h3>404</h3>
    <FaBridge size={45} />
    <FaBridgeCircleXmark size={50}/>
    <FaBridge size={45}/>
    <p>Oops! Page not found.</p>
      <div className="mt-5">
        <Link to={"/"} ><IoArrowBackCircleSharp color="green" size={40}/></Link>
      </div>
  </div>
    
    </>)

}

export default Notfound;