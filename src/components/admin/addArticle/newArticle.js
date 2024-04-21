import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewArticle = () => {
    const [dataPerson, setDataPerson] = useState([]);

    useEffect(() => {
        axios.get("/api/show_person")
            .then(res => {
                setDataPerson(res.data);
            })
            .catch(err => {
                console.error('Error fetching data', err);
            });
    }, []);

    const [selectedFile, setSelectedFile] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        context: '',
        author: '',
        date: '',
        photographer: ''
    });

    const handleInputFile = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const add_article = () => {
        const formDataWithImage = new FormData();
        formDataWithImage.append('image', selectedFile);
        formDataWithImage.append('title', formData.title);
        formDataWithImage.append('context', formData.context);
        formDataWithImage.append('author', formData.author);
        formDataWithImage.append('date', formData.date);
        formDataWithImage.append('photographer', formData.photographer);
        console.log(formDataWithImage)
        axios.post('/api/add_article', formDataWithImage)
            .then(response => {
                console.log('Data sent successfully', response.data);
                // Optionally, you can reset the form after successful submission
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

    return (

        <div className="card mt-0 bg-dark-first" dir='rtl'>
            <div className="card-body bg-dark-first text-light">
                <h5 className="card-title text-light">مقالة جديد </h5>

                <div className="form-group">
                    <label>الصورة :</label>
                    <input type="file" accept="image/png, image/jpeg, image/webp, image/jpg" className="form-control" id="img" name="image" value={formData.image} onChange={handleInputFile} required />
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

                            <option value={""} >--------</option>
                            {dataPerson.map(person => (
                                <option key={person.code} value={person.nom}>{person.nom}</option>
                            ))}
                        </select>
                    </div>
                    <div className='col-6'>
                        <label>المصور :</label>
                        <select name='photographer' value={formData.photographer} onChange={handleInputChange} className='form-select'>

                            <option value={""} >--------</option>
                            {dataPerson.map(person => (
                                <option key={person.code} value={person.nom}>{person.nom}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className='text-center mt-3 mb-4'>
                <button type="button" className="btn btn-success col-6 mt-4" onClick={add_article}>نشر</button>
            </div>
        </div>















    );
};

export default NewArticle;
