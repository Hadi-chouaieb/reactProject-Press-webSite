import { useState, useEffect } from 'react';
import { VscChromeClose } from "react-icons/vsc";
import axios from 'axios';
import "./modify.css"

function Modify(props) {
    const [dataPerson, setDataPerson] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    const { data } = props;
    useEffect(() => {
        axios.get("/api/show_person")
            .then(res => {
                setDataPerson(res.data);
            })
            .catch(err => {
                console.error('Error fetching data', err);
            });
    }, []);



    const [formData, setFormData] = useState({
        code: data.code,
        title: data.title,
        context: data.context,
        author: data.auther,
        date: data.date,
        photographer: data.photographer,

    });

    useEffect(() => {
        setFormData(
            {
                code: data.code,
                title: data.title,
                context: data.context,
                author: data.auther,
                date: data.date,
                photographer: data.photographer
            }
        )
    }, [data])

    const handleInputFile = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file)
    };

    const handelChangeImages = () => {
        const formDataW = new FormData();
        formDataW.append('code', data.code);
        formDataW.append('image', selectedFile);

        if (selectedFile !== null) {
            axios.post('/api/updata_image_article', formDataW)
        }

    }


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const update_article = () => {
        axios.post('/api/update_article', formData)
            .then(response => {
                console.log(response.data);
                setFormData({
                    title: '',
                    context: '',
                    author: '',
                    date: '',
                    photographer: ''
                });
                setSelectedFile(null);
            })
            .catch(error => {
                console.error('Error sending data', error);
            });
    };

    const Close = () => {
        props.closeIt(false)
    }


    return (
        <div>
            <div className="card mt-0 bg-dark" dir='rtl'>
                <VscChromeClose color='red' size={20} className='m-4 mb-0 cueos bg-white' onClick={Close} />
                <div className="card-body bg-dark text-light">
                    <h5 className="card-title text-light">{data.title} </h5>
                    <div className="form-group">
                        <label>الصورة :</label>
                        <input type="file" accept="image/png, image/jpeg, image/webp, image/jpg" className="form-control" id="img" name="image" onChange={handleInputFile} required />
                    </div>
                    <div className="form-group">
                        <label>العنوان :</label>
                        <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>المقالة :</label>
                        <textarea className="form-control" id="context" name="context" value={formData.context} rows="3" onChange={handleInputChange} required></textarea>
                    </div>
                    <div className="form-group">
                        <label>التاريخ :</label>

                        <input type="datetime-local" className="form-control" id="date" name="date" value={formData.date} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group row">
                        <div className='col-6'>
                            <label>الكاتب :</label>
                            <select name='author' value={formData.author} onChange={handleInputChange} className='form-select'>
                                <option value={formData.author}>{formData.author}</option>
                                <option value={""}>--------</option>
                                {dataPerson.map(person => (
                                    <option key={person.code} value={person.nom}>{person.nom}</option>
                                ))}
                            </select>
                        </div>
                        <div className='col-6'>
                            <label>المصور :</label>
                            <select name='photographer' value={formData.photographer} onChange={handleInputChange} className='form-select'>
                                <option value={formData.photographer}>{formData.photographer}</option>
                                <option value={""}>--------</option>
                                {dataPerson.map(person => (
                                    <option key={person.code} value={person.nom}>{person.nom}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className='text-center mt-3 mb-4'>
                    <button type="button" className="btn btn-success col-6 mt-4" onClick={() => { update_article(); handelChangeImages(); props.update(true); Close() }}>تحديث</button>
                </div>
            </div>
        </div>
    )
}

export default Modify;
