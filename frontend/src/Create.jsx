import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function Create() {
    const [values, setValues] = useState({
        numEt: '',
        nomEt: '',
        noteMath: '',
        notePc: ''
    })
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/etudiant', values)
            .then(res => {
                console.log(res);
                Swal.fire({
                    icon: 'success',
                    title: 'Ajout avec succèss !!!!',
                    showConfirmButton: false,
                    timer: 2000
                })
                navigate('/')
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur de ajout !!!!',
                    showConfirmButton: false,
                    timer: 2000
                })
            });
    }
    return (
        <div className='row'>
            <h2 className='text-right bg-success text-light p-3'>Gestion de note d'etudiant</h2>
            <form onSubmit={handleSubmit}>
                <div className='col-sm-5 container'>
                    <h4 className='w-100 d-flex justify-content-right p-3'>Ajouter note d'etudiant</h4>
                    <div className='mb-2'>
                        <label htmlFor="">Numero</label>
                        <input type="text" name="" id="" className='form-control'
                            onChange={e => setValues({ ...values, numEt: e.target.value })} required />

                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Nom</label>
                        <input type="text" name="" id="" className='form-control'
                            onChange={e => setValues({ ...values, nomEt: e.target.value })} required />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Note Math</label>
                        <input type="text" name="" id="" className='form-control'
                            onChange={e => setValues({ ...values, noteMath: e.target.value })} required />
                    </div><div className='mb-2'>
                        <label htmlFor="">Note PC</label>
                        <input type="text" name="" id="" className='form-control'
                            onChange={e => setValues({ ...values, notePc: e.target.value })} required />
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </div>
            </form>
            
        </div>
  )
}

export default Create;
