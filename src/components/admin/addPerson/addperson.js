import React, { useEffect, useState } from 'react'
import "./add_person.css"
import axios from "axios"
import { MdAutoFixHigh } from "react-icons/md";

export default function Addperson() {
    const [person, setPerson] = useState("")
    const [dataPerson, setDataPersonSelect] = useState([]);
    const [catigorieRemouve, setCatigorieRemouve] = useState(true);
    const [deleteone, setDeleteOne] = useState(null);

    const [newadmin, setNewAdmin] = useState({
        username: "",
        password: "",
        state:0,
        nom:""
    })


    const handelShowNormalPerson =()=>{
        setCatigorieRemouve(false)
        setDeleteOne(null)
        axios.get("/api/show_person")
            .then(res => {
                setDataPersonSelect(res.data);
            })
            .catch(err => {
                console.error('Error fetching data', err);
            });
        }
    const handelShowAdminPerson=()=>{
        setCatigorieRemouve(true)
        setDeleteOne(null)
        axios.get("/api/show_admin_person")
        .then(res => {
            setDataPersonSelect(res.data);
        })
        .catch(err => {
            console.error('Error fetching data', err);
        });
    }
    const handleAddPerson = (e) => {
        axios.post("/api/add_equipe", { person: person }).then(res => { console.log(res) })
            .catch(err => { })
            setPerson("")

        handelShowNormalPerson()
    }

    const remouvePersone =(e)=>{
        const {value} = e.target
        setDeleteOne({code:value})
    }

    const handleRemouvePerson = () => {
        if(deleteone !==null && catigorieRemouve === true){
            console.log(deleteone)
            axios.post("/api/delete_admin_person", deleteone).then(res => { console.log(res) })
            .catch(err => { })
        }
        else if(deleteone !==null && catigorieRemouve ===false){
            axios.post("/api/delete_normal_person", deleteone).then(res => { console.log(res) })
            .catch(err => { })
        }
        else {alert("select catigorie")}
        handelShowAdminPerson()
        handelShowNormalPerson()
        };
    const handelAutoPassword=()=>{
        axios.get("https://api.api-ninjas.com/v1/passwordgenerator?length=20",{
            headers:{ 'X-Api-Key': 'n3uBwckmhqx+4LMUBBVF0Q==HiMdZEWJ8xOuIVNO'}
        })
        .then(ress=>{
            setNewAdmin(prevState => ({
                ...prevState,
                password: ress.data.random_password
            }));
        })
        .catch(err=>{
            console.log('err',err)
        })
    }
    const handeladdNewAdmin = () => {
        console.log(newadmin)
        axios.post("/api/new_Admin", newadmin).then(res => { console.log(res) })
        .then(
            setNewAdmin({
                username: "",
                password: "",
                state:0,
                nom:""
            })
        )
            .catch(err => { })
        handelShowAdminPerson()
    }

    const handelnewadmininfo = (e) => {
        const { value, name } = e.target
        setNewAdmin(
            {
                ...newadmin,
                [name]: value
            }
        )
    }




    return (
        <div className="container-fuild mt-1 ">
            <div className='row'>
                <div className="card bg-dark d-flex justify-content-center col-md-6 col-sm-12 ">
                    <div className='car-head text-center text-light m-2'>
                        <b>اضافة عضو الى المجموعة</b>
                    </div>
                    <div className="card-body bg-dark d-flex justify-content-center ">
                        <div className="col-12 mt-5 ">
                            <input
                                type="text"
                                className="form-control"
                                dir="rtl"
                                onChange={(e) => setPerson(e.target.value)}
                                name="nom"
                                value={person}
                                placeholder="ادخل الاسم"
                            />
                        </div>
                    </div>
                    <div className='text-center mt-3 mb-5'>
                        <button
                            className="btn btn-success col-8"
                            onClick={handleAddPerson}>
                            اضافة الى المجموعة
                        </button>
                    </div>

                </div>

                <div className="card bg-dark col-md-6 col-sm-12">
                <div className='car-head text-center text-light m-2'>
                        <b>حذف عضو من المجموعة </b>
                    </div>
                    <div className='card-body row d-flex justify-content-center' >
                    <div className='col-12 text-light p-1 mt-0  '>
                        <label className='m-2 mb-0 mt-0'>حذف عضو عادي </label>
                        <input type='radio' onClick={handelShowNormalPerson} name='rem' className='form-check-input custom-color mt-3 m-2'/>
                        <label className='m-2 '>حذف مسؤل </label>
                        <input type='radio'  onClick={handelShowAdminPerson} name='rem' className='form-check-input custom-color mt-3 m-2'/>
                    </div>



                        <div className='col-12'>
                            <select name='author' className='form-select' onChange={remouvePersone} >
                                <option value={""} >--------</option>
                                {dataPerson.map(person => (
                                    <option key={person.code||person.id_admin} value={person.id_admin||person.code}>{person.nom}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                    <div className='row d-flex justify-content-center mt-3 mb-5'>

                        <button className='btn btn-danger col-8' onClick={handleRemouvePerson} >حـــذف نــهــائـــي</button>

                    </div>


                </div>

            </div>

            <div className='row'>
                <div className='card bg-dark '>
                <div className='car-head text-center text-light m-2 mb-0 mt-4'>
                        <b>اضافة مسؤل</b>
                    </div>

                    <div className='mt-4 d-flex justify-content-center'>
                        <div className="col-md-4 col-sm-12 m-2" dir='ltr'>
                            <label className='text-light col-12' dir="rtl">الاسم :</label>
                            <input
                                type="text"
                                className="form-control"
                                dir=""
                                onChange={handelnewadmininfo}
                                name="nom"
                                placeholder="foulen"
                                value={newadmin.nom}
                            />
                            <label className='text-light col-12 ' dir="rtl">اسم المستخدم :</label>
                            <input
                                type="text"
                                className="form-control"
                                dir="ltr"
                                onChange={handelnewadmininfo}
                                name="username"
                                placeholder="Foulen-Fouleni"
                                value={newadmin.username}
                            />
                            <label className='text-light col-12 ' dir="rtl">كلمة السر :</label>
                            <input
                                type="text"
                                className="form-control "
                                dir=""
                                onChange={handelnewadmininfo}
                                name="password"
                                placeholder="XrP66@Gfn&blst$"
                                value={newadmin.password}
                            />
                                <span className='btn' onClick={handelAutoPassword}><MdAutoFixHigh color='white' size={20} /></span>
                            <br></br>
                                <select className='form-select' name='state' onChange={handelnewadmininfo} dir="rtl">
                                    
                                    <option value={0}>مسؤل فرعي</option>
                                    <option value={1}>مسؤل رئيسي</option>
                                    
                                </select>



                        </div>

                    </div>



                    <div className='row d-flex justify-content-center mt-3 mb-5'>

                        <button className='btn btn-danger col-4' onClick={handeladdNewAdmin}>اضافة</button>

                    </div>



                </div>
            </div>

        </div>
    )
}
