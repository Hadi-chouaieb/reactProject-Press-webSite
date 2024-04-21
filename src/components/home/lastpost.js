
import axios from "axios";
import "./lastpost.css";
import Adhan from "./timeAdhan/Adhan";
import { useEffect, useState } from "react";

function Lastpost() {
    const [lastone,setLastone]=useState([])
    useEffect(()=>{
        axios.get('/api/show_article')
        .then(res=>{
            
            setLastone(res.data[0])
        })
        .catch(err=>{
            console.log(err)
        })
        },[])
        
    
    
    const windowHeight = window.innerHeight + 'px';

    return (
        <div className='covert bg-dark-first covert' style={{ height: windowHeight }}>
        <Adhan data={lastone}/>
        </div>
    );
}

export default Lastpost;
