import { useState, useEffect } from 'react'
import { FaPen } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import axios from 'axios';
import Modify from '../modify/Modify';



function MangerArticle() {
    const [posts, setPost] = useState([])
    const [Data, setDataPost] = useState({})
    const [modif, setModif] = useState(false)
    const [Updated, setUpdated] = useState(false)

    useEffect(() => {
        if (posts.length === 0) {
            axios.get('/api/show_article')
                .then(response => {
                    setPost(response.data);

                })
                .catch(error => {
                    console.error('Error sending data', error);
                });
        }
    }, [posts]);


    useEffect(() => {
        axios.get('/api/show_article')
            .then(response => {
                setPost(response.data);

            })
            .catch(error => {
                console.error('Error sending data', error);
            });

    }, [Updated]);

    const handelIsUpdated = (ev) => {
        if (ev === true) {

            setUpdated(!Updated)

        }

    }


    const handelSearch = (ev) => {
        let { value } = ev.target
        if (value === "") {
            value = '?+ّ%'
        }


        setPost(prevPosts => prevPosts.filter(post => post.title.substr(0, value.length) === value));
    }

    const handeldelte = (id) => {
        axios.post('/api/deleteOne', { id: id })
            .then(res => {

                setPost(prevPosts => prevPosts.filter(post => post.code !== id));

            })
            .catch(error => {
                console.error('Error sending data', error);
            });
    }
    const handelEdit = (post) => {
        setModif(true);
        setDataPost(post.pos)
    }
    const handelClose = (data) => {
        setModif(data)

    }


    return (
        <div className="container-fuild">
            <div className="card bg-dark">
                <div className="" dir='rtl'>
                    <div className='row justify-content-center'>
                        <div className='col-6 mt-2'>
                            <input type='search' className='form-control' onChange={handelSearch} ></input>
                        </div>
                    </div>
                    <table className="table table-dark table-striped" dir='rtl'>
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">التاريخ</th>
                                <th scope="col">الكاتب</th>
                                <th scope="col">عنوان المقالة</th>
                                <th scope="col">حذف</th>
                                <th scope="col">تعديل</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map(pos => (
                                <tr key={pos.date}>
                                    <td>{pos.date}</td>
                                    <td>{pos.auther}</td>
                                    <td>{pos.title}</td>
                                    <td>
                                        <button onClick={() => handeldelte(pos.code)} className='btn btn-danger'><MdDeleteForever color='white' size={17} /></button>
                                    </td>
                                    <td>
                                        <button className='btn btn-warning' onClick={() => handelEdit({ pos })}><FaPen color='white' size={17} /></button>
                                    </td>
                                </tr>


                            ))}

                        </tbody>
                    </table>
                </div>
            </div>

            {modif && <Modify data={Data} closeIt={handelClose} update={handelIsUpdated} />}


        </div>
    )
}

export default MangerArticle
