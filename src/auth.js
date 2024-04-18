import Login from "./components/admin/login/login";
import { useState, useEffect } from 'react';
import axios from "axios";
import Dashboard from './components/admin/Dashboard/Dashboard';

export default function RequiredAuth() {
    const [login, setLogin] = useState(false);
    const [log, setLog] = useState(false);
    const [user, setUser] = useState({
        username:"",
        type:""
    }); // State to store user data

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token !==null) {
            axios.post('/api/sslToken', { token: token })
                .then(res => {
                    setLogin(res.data.stat);
                    
                    setUser({username:res.data.user,type:res.data.who}); // Set user data if authentication is successful
                })
                .catch(err => {
                    console.log(err);
                    setLogin(false);
                });
        } else {
            setLogin(false);
        }
    }, [log]);

    const handelIsLoged=(data)=>{
        setLog(data)

    }

    if (login) {
        return <Dashboard user={user} />; // Render Dashboard with user data if authenticated
    } else {
        return <Login  func={handelIsLoged} />;
    }
}
