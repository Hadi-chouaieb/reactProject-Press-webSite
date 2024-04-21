import React, { useEffect, useState } from "react";
import JornalCard from "../cardJornal/card";


import axios from "axios"

const News = () => {
    const [posts, setPost] = useState([])

    useEffect(() => {

        axios.get('/api/show_article')
            .then(response => {
                setPost(response.data);

            })
            .catch(error => {
                console.error('Error sending data', error);
            });

    }, []);
    return (
        <div className="container-fluid">
            <div className="row bg-dark-forth">
                {posts.map(post => (
                    console.log(post),
                    <JornalCard data = {post} key={post.code}/>
                ))}
            </div>
        </div>
    );
};
export default News;