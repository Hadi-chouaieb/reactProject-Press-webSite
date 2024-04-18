import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./card.css"
import { SiLivejournal } from "react-icons/si";
import { MdPhotoCamera } from "react-icons/md";
import { Link } from 'react-router-dom';

const JornalCard = (props) => {
    const datetime = props.date
    var date = datetime.split('T')[0];
    var time = datetime.split('T')[1];
    return (
        <div className="col-md-6 col-lg-6 col-sm-12 mb-5" key={props.keys}>
            <div className="card card-jornal m-3">
                <div className="imgcard">
                    <img src={props.url} alt="Card image" />
                </div>

                <div className="card-body">
                    <h5 className="card-title" dir="rtl">{props.title}</h5>
                    <p className="card-text" dir="rtl">{date}<br /> {time}</p>
                    <div className="card-text-success d-flex justify-content-between row " id="crt" dir="rtl">
                        <div className='col-6'>
                            <span className='col-12 m-1'>
                                {props.creator !== "" ? ( <SiLivejournal color='#198754' size={19}/> ) : ("")} { props.creator}
                            </span>
                        </div>
                        <div className='col-6'>
                            <span className='col-4 m-1'>
                                {props.photographer !== "" ? (<MdPhotoCamera size={20} color='#198754' />) : ("")}{props.photographer}
                            </span>
                        </div>
                    </div>
                    <p className="card-text" id="postcard" dir="rtl">
                        {props.text.length > 1 ? `${props.text.substr(0, 200)}...` : props.text}
                    </p>
                    <div className='row row-centered'>
                        <div className='col-4'>
                            {/* {like} */}
                        </div>
                    </div>
                    <div className='container text-center' style={{ marginTop: '20px' }}>
                        <Link to={"/more/" + props.date}>
                            <button className='btn btn-success btn-more'>المزيد</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JornalCard;