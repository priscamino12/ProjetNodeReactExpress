import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

function Read() {
    const {numEt} = useParams();
    const [etudiant2, setEtudiant2] = useState([])
    useEffect(() => {
        axios.get('http://localhost/8081/read/' + numEt)
        .then(res => {
            console.log(res)
            setEtudiant2(res.data[0]);
        })
        .catch(err => console.log(err))
    }, [])
    return (
        <div className='d-flex vh-100 bg-success justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <h2>Details de l'etudiant</h2>
                <Link to="/" className='btn btn-primary'>Retourner</Link>
                <button className='btn btn-primary'>Editer</button>
            </div>
        </div>
    )
}

export default Read