import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Tooltip, BarChart, XAxis, Legend, CartesianGrid, YAxis, Bar } from 'recharts';


function Home() {
    const [data, setData] = useState([]);
    const moyenneClasse = data.reduce((acc, etudiant) => acc + (etudiant.noteMath + etudiant.notePc) / 2, 0) / data.length;
    const maxNote = Math.max(...data.map(etudiant2 => (etudiant2.noteMath + etudiant2.notePc) / 2));
    const minNote = Math.min(...data.map(etudiant2 => (etudiant2.noteMath + etudiant2.notePc) / 2));
    const totalEtudiants = data.length;
    const etudiantsAdmis = data.filter(etudiant => (etudiant.noteMath + etudiant.notePc) / 2 >= 10).length;
    const etudiantsRedoublants = data.filter(etudiant => (etudiant.noteMath + etudiant.notePc) / 2 < 10).length;
    const donne = [
        { name: "Moyenne de classe", value: moyenneClasse },
        { name: "Maximale", value: maxNote },
        { name: "Minimale", value: minNote },

    ]
    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])
    const handleDelete = (numEt) => {
        Swal.fire({
            title: 'Vous en etes sure ??',
            text: "Vous venez de supprimer un element",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Supprimer',
            confirmButtonColor: '#3085d',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Annuler',

        })
            .then((res) => {
                if (res.isConfirmed) {
                    axios.delete('http://localhost:8081/delete/' + numEt)
                        .then(res => {
                            Swal.fire({
                                title: 'Suppression',
                                text: 'Supression terminé',
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 5000,
                            })
                            window.location.reload();

                        }).catch(error => console.error('Error deleting item:', error));
                }
            })
    }

    return (

        <div className='row'>

            <h2 className='text-right bg-success text-light p-3'>Gestion de note d'etudiant</h2>
            <div className='col-sm-7'>
                <h4 class="text-center ">Informations de l'etudiant</h4>
                <div className='container'>
                    <div className='col-md-12'><br />
                        <Link to="/create" className='btn btn-success'>Add + </Link>
                    </div>
                    <table className='table table-striped table-hover '>
                        <thead className='text-center'>
                            <tr>
                                <th>Numero</th>
                                <th>Nom</th>
                                <th>Mathematique</th>
                                <th>Physiique</th>
                                <th>Moyenne</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {data.map((etudiant2, index) => {
                                return <tr key={index}>
                                    <td><b> {etudiant2.numEt}</b></td>
                                    <td>{etudiant2.nomEt}</td>
                                    <td>{etudiant2.noteMath}</td>
                                    <td>{etudiant2.notePc}</td>
                                    <td>{(etudiant2.noteMath + etudiant2.notePc) / 2}</td>
                                    <td>

                                        <Link to={`/editer/${etudiant2.numEt}`} className='btn btn-sm btn-primary mx-2'>Editer</Link>
                                        <button onClick={() => handleDelete(etudiant2.numEt)} className='btn btn-sm btn-danger'>Supprimer</button>
                                    </td>
                                </tr>


                            })}
                            <br /><br /><br /><br />
                            <tr>
                                <td> <b>Nombre d'etudiant: {totalEtudiants}  </b></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><b>Note Maximale: {maxNote}</b></td>
                            </tr><br />
                            <tr>
                                <td><b>Nombre d'admis: {etudiantsAdmis} </b></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><b>Note Minimale: {minNote} </b></td>
                            </tr><br />
                            <tr>
                                <td><b>Nombre redoublant: {etudiantsRedoublants} </b></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><b></b></td>
                            </tr>
                        </tbody>
                    </table></div>
            </div>
            <div className='col-sm-5'>
                <h4 class="text-center ">Visualisation de note</h4><hr /><br /><br />
                <div className='App'>

                    <BarChart
                        width={600}
                        height={450}
                        data={donne}
                        margin={{
                            top: 5,
                            right: 100,
                            left: 80,
                            bottom: 10,
                        }}
                        barSize={50}>
                        <XAxis
                            dataKey="name"
                            scale="point"
                            padding={{
                                left: 50,
                                right: 90
                            }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray=" 3 3 " />
                        <Bar dataKey="value" fill="#8884d8" background={{ fill: "#eee" }} />

                    </BarChart>
                </div>
            </div>
        </div>
    )
}

export default Home;
