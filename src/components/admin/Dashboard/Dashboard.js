
import React, { useState } from 'react'
import "./dasboard.css"
import NewArticle from '../addArticle/newArticle';
import Addperson from '../addPerson/addperson';
import { PiUsersThreeFill } from "react-icons/pi";
import { FaRegNewspaper } from "react-icons/fa6";
import { BiSolidCalendarEdit } from "react-icons/bi";
import MangerArticle from '../MangmentArticle/MangerArticle';
import { IoLogOutSharp } from "react-icons/io5";
import TaskBar from '../../ListTaskBar/TaskBar.js';



const Dashboard = (props) => {

  const [template, setTemplate] = useState("")
  // const { template } = useParams();

  const handellogout = () => {
    if(localStorage.getItem("token")!==null)
    localStorage.setItem("token",null);
    window.location.reload();
  }

  const handelTemplate = (temp) => {
    setTemplate(temp)

  }
  return (
    <div className="" dir='rtl'>
      <div className="container-fuild">
        <div className="col-12 card bg-dark-first">
          <div className=''>
            <div className="logo">
             {props.user.username}
            </div>
            <ul className=" sidebar-menu d-flex justify-content-center " dir='rtl'>

              <li className=''>
                <span onClick={() => handelTemplate("article")}><FaRegNewspaper size={30} /></span>
              </li>
              {props.user.type ===1  &&
              <>
              <li className=''>
                <span onClick={() => handelTemplate("addPerson")}><PiUsersThreeFill size={30} /></span>
              </li>
              <li className=''>
                <span onClick={() => handelTemplate("MangeArticle")}><BiSolidCalendarEdit size={30} /></span>
              </li>
              </>
}


              <li className=''>
                <span onClick={handellogout}><IoLogOutSharp size={30} color='#dc3545'/></span>
              </li>
            </ul>

          </div>
        </div>
        <div className="col-12 content container">
          {template === "article"  && <NewArticle /> }
          {template === "addPerson" && props.user.type === 1 &&<Addperson/>}
          {template === "MangeArticle" && props.user.type ===1 && <MangerArticle/>}
        </div>
      </div>
    </div>

  )
}

export default Dashboard;
