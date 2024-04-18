import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import Notfound from "../NotFound/notfound";
import { VscLiveShare } from "react-icons/vsc";
import { IoArrowBackCircle } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiLivejournal } from "react-icons/si";
import { MdPhotoCamera } from "react-icons/md";



import "./More.css";

const More = () => {
    const { article } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {

        setIsOpen(!isOpen);

        if (!isOpen == true) {
            document.getElementById("share").style.top = 94 + "%"
        }
        else {
            document.getElementById("share").style.top = 100 + "%"
        }
    };

    useEffect(() => {
        axios.get('/api/show_article')
            .then(response => {
                setPosts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data', error);
                setError(error);
                setLoading(false);
            });
    }, []);



    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const foundPost = posts.find(post => post.date === article);
    const goback = () => {
        window.history.back()
    }
    return (
        <>
            {foundPost ? (
                <div>

                    <div key={foundPost.code} className=" container-fluid card mt-1" dir="rtl">
                        <span className="btn text-start mt-0 mb-0" onClick={goback}><IoArrowBackCircle size={30} /></span>

                        <div className="header-image">
                            <img src={"http://localhost:5000/images/" + foundPost.image} alt="Header Image" className="col-12" />
                        </div>
                        <div className="container-fuild card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="page-content">
                                        <h2>{foundPost.title}</h2>


                                        <div className="row">
                                        <div className='col-6'>
                                            <span className='col-12 m-1'>
                                                {foundPost.auther !== "" ? (<SiLivejournal color='#198754' size={19} />) : ("")} {foundPost.auther}
                                            </span>
                                        </div>
                                        <div className='col-6'>
                                            <span className='col-4 m-1'>
                                                {foundPost.photographer !== "" ? (<MdPhotoCamera size={20} color='#198754' />) : ("")}{foundPost.photographer}
                                            </span>
                                        </div>
                                        </div>


                                        <p className="context">{foundPost.context}</p>
                                        <p> {foundPost.date.split('T')[0]}<br /> {foundPost.date.split('T')[1]}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" container-fluid d-flex justify-content-center  row m-2">
                            <span onClick={toggleDropdown} className="btn col-4"><VscLiveShare size={30} /></span>

                            <div className="text-center">
                                <div className="share-content text-center " id="share">
                                    <div className="d-flex justify-content-center">
                                        <a className="share-button facebook m-3"
                                            href={"https://www.facebook.com/sharer/sharer.php?u=http://192.168.3.0:3000/more/" + article}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            <FaFacebook size={40} />
                                        </a>
                                        <a className="share-button twitter col-md-4 col-sm-6 m-3"
                                            href={"https://twitter.com/intent/tweet?text=http://192.168.3.0:3000/more/" + article}
                                            data-size="large">
                                            <FaXTwitter color="black" size={40} />

                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            ) : (
                <Notfound />
            )}
        </>
    );
};

export default More;
