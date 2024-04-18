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

    }, [posts]);
    return (
        <div className="container-fuild ">
            <div className="row">
                {posts.map(post => (
                    <JornalCard key={post.code} title={post.title} creator={post.auther} date={post.date} url={'http://localhost:5000/images/' + post.image} text={post.context} photographer={post.photographer} />
                ))}
            </div>
        </div>
    );
};
export default News;