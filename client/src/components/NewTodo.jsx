import React, { useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import { TextField } from '@material-ui/core';

const NewProject = () => {

    const [name, setName] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = e => {
        e.preventDefault()
        const newProject = {name, dueDate}
        axios.post("http://localhost:8000/api/todos/new", newProject)
            .then(res => {
                console.log(res);
                if(res.data.errors){
                    setErrors(res.data.errors)
                }else{
                    navigate('/');
                }
            }).catch(err =>{
                console.log(err);
            });
    }
    
    return (
        <div className="container"> 
            <Link to="/" className="btn btn-secondary font-weight-bold mt-3">Back</Link>
            <div className="row"> 
                <div className="col-sm-8 offset-sm-2 pt-5">
                    <div className="card bg-light">
                        <div className="card-body">
                            <h4 className="card-title title">Plan for things to do !</h4>
                            <form onSubmit={handleSubmit} className="pt-4">
                                <div className="form-group">
                                    <TextField type="text" className="form-control" size="small" id="outlined-basic" label="Task Name" variant="outlined" value={name} onChange={e => setName(e.target.value)}/>
                                    <p className="text-danger">{errors.name ? errors.name.message: ''}</p>
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />                                
                                    <p className="text-danger">{errors.dueDate ? errors.dueDate.message: ''}</p>
                                </div>
                                <button type="submit" className="btn btn-block btn-secondary font-weight-bold my-4">Plan Task</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewProject;