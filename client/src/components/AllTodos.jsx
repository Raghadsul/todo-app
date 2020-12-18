import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import axios from 'axios';
import moment from 'moment';

const AllTodos = (props) => {

    const [allTodos, setAllTodos] = useState([]);

    useEffect( () => {
        getAllTodos();
    }, []);

    const getAllTodos = () => { 
        axios.get("http://localhost:8000/api/todos")
        .then(res => {
            console.log(res)
            setAllTodos(res.data.tasks)
        })
        .catch(err => console.log(err))
    }

    const updateStatus = (e, todo, newStatus) => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/todos/${todo._id}/${newStatus}`)
        .then(res => {
            console.log(res);
            getAllTodos();
        })
        .catch(err => console.log(err))
    }

    const remove = (id) => { 
        axios.delete(`http://localhost:8000/api/todos/${id}`)
            .then(res => {
                console.log(res);
                getAllTodos();
            }).catch(err => console.error(err));
    }

    return (
        <div className="container text-center"> 
            <Link to='/todos/new' className="btn btn-secondary float-right mt-3 font-weight-bold">New Task</Link> 
            <div className="main">
                <div className="row">

                    {/* Todo List */}
                    <div className="col-sm-4">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h4 className="card-title title pb-3">To Do</h4>
                                {allTodos.filter(p => p.status === "Todo").map( (todo, i) => 
                                    <div className="card p-2 mt-3" key={i}> 
                                        <p className="font-weight-bold"> {todo.name} </p>
                                        <p> <span className="font-weight-bold"> Due Date: </span> {moment(todo.dueDate).format("L")} </p>
                                        <button type="button" className="btn btn-sm btn-block btn-outline-success font-weight-bold" onClick={ (e) =>  updateStatus(e, todo, "InProgress") }>Start Task </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* InProgress List */}
                    <div className="col-sm-4">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h4 className="card-title title pb-3">In Progress</h4>
                                {allTodos.filter(p => p.status === "InProgress").map( (todo, i) => 
                                    <div className="card p-2 mt-3" key={i}> 
                                        <p className="font-weight-bold"> {todo.name} </p>
                                        <p> <span className="font-weight-bold"> Due Date: </span> {moment(todo.dueDate).format("L")} </p>
                                        <button type="button" className="btn btn-sm btn-block btn-outline-warning font-weight-bold" onClick={ (e) =>  updateStatus(e, todo, "Completed") }>Move To Done </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Completed List */}
                    <div className="col-sm-4">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h4 className="card-title title pb-3">Done</h4>
                                {allTodos.filter(p => p.status === "Completed").map( (todo, i) => 
                                    <div className="card text-secondary p-2 mt-3" key={i}> 
                                        <p className="font-weight-bold"> {todo.name} </p>
                                        <p> <span className="font-weight-bold"> Due Date: </span> {moment(todo.dueDate).format("L")} </p>
                                        <button type="button" className="btn btn-sm  btn-block btn-outline-danger font-weight-bold" onClick={e => remove(todo._id)}>Remove Task</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default AllTodos;