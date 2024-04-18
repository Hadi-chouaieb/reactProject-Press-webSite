import React, { useState } from 'react';
import axios from 'axios';

const Login = ({func}) => {
    const [data,setData]=useState("")
    const [infoAdmin, setInfoAdmin] = useState({
        username: '',
        password: ''
    });

    const handleInputChangeAdmin = (e) => {
        const { name, value } = e.target;
        setInfoAdmin({
            ...infoAdmin,
            [name]: value
        });
    };

    const handleLogin = () => {
        axios.post('/api/login', {username:infoAdmin.username,password:infoAdmin.password})
            .then(response => {
                localStorage.setItem("token", response.data.auth);
                console.log(response.data);
                // Clear the form after successful login
                setInfoAdmin({
                    username: '',
                    password: ''
                });
                func(true)
            })
            .catch(error => {
                console.error('Error sending data', error);
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card login-container bg-dark text-light">
                        <div className="card-header text-center">
                            <h4>Admin Login</h4>
                        </div>
                        <div className="card-body bg-dark">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control" id="username" name="username" value={infoAdmin.username} onChange={handleInputChangeAdmin} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" value={infoAdmin.password} onChange={handleInputChangeAdmin} />
                                </div>
                                <div className='d-flex justify-content-center mt-5'>
                                    <button type="button" className="btn btn-success btn-block col-5" onClick={handleLogin}>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
