import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';


function Editer() {
    const { numEt } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8081/read/' + numEt)
            .then(res => {
                console.log(res)
                setValues({ ...values, numEt: res.data[0].numEt, nomEt: res.data[0].nomEt, noteMath: res.data[0].noteMath, notePc: res.data[0].notePc })
            })
            .catch(err => console.log(err))
    }, [])
    const [values, setValues] = useState({
        numEt: '',
        nomEt: '',
        noteMath: '',
        notePc: ''
    })
    const handleUpdate = (event) => {
        event.preventDefault();
        Swal.fire({
            title: 'Vous en-etes sure ??',
            text: "Vous venez de modifier un element",
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Modifier',
            confirmButtonColor: '#3085d',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Annuler'
        }).then((res) => {
            if (res.isConfirmed) {
                axios.put('http://localhost:8081/update/' + numEt, values)
                    .then(res => {
                        console.log(res)
                        navigate('/')
                    })
            }
            // .catch(error =>  console.error('Error deleting item:', error));


        })
    }

    return (
        <div className='row'>
            <h2 className='text-right bg-success text-light p-3'>Gestion de note d'etudiant</h2>
            <form onSubmit={handleUpdate}>
                <div className='col-sm-5 container'><br /><br />
                    <h4 className='w-100 d-flex justify-content-center p-3'><b>Modifier note d'etudiant</b></h4>
                    <div className='mb-2'>
                        <label htmlFor="">Numero</label>
                        <input type="text" name="" id="" className='form-control' value={values.numEt}
                            onChange={e => setValues({ ...values, numEt: e.target.value })} required />

                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Nom</label>
                        <input type="text" name="" id="" className='form-control' value={values.nomEt}
                            onChange={e => setValues({ ...values, nomEt: e.target.value })} required />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Note Math</label>
                        <input type="text" name="" id="" className='form-control' value={values.noteMath}
                            onChange={e => setValues({ ...values, noteMath: e.target.value })} required />
                    </div><div className='mb-2'>
                        <label htmlFor="">Note PC</label>
                        <input type="text" name="" id="" className='form-control' value={values.notePc}
                            onChange={e => setValues({ ...values, notePc: e.target.value })} required />
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Editer;