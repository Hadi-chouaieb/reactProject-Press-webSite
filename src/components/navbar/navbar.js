import React from "react";
import { Link } from "react-router-dom";
import { IoIosMore } from "react-icons/io";
import { MdLiveTv } from "react-icons/md";
import logo from "../../assets/imgs/logo.png";
import "./navbar.css"
import TaskBar from "../admin/ListTaskBar/TaskBar";
const NavBar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg justify-content-end navbar-dark bg-dark-second" dir="rtl">
                <div className="container">
                    <Link className="navbar-brand " to="/"><img src={logo} id="logo" alt="Logo" /></Link>
                    <Link className="nav-link m-5 mt-0 mb-0" to="/vdlive"><MdLiveTv color="white" size={25} /></Link>
                    <span className="navbar-toggler btn text-light" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <IoIosMore />
                    </span>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/newsinf">سياسة</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/vdlive">لايف</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <TaskBar />
        </>
    );
}

export default NavBar;