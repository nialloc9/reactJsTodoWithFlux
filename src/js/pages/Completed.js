import React from 'react';

import ToDo from '../components/ToDo';

import * as ToDoActions from '../actions/ToDoActions';

import toDoStore from '../stores/ToDoStore';

export default class Completed extends React.Component{
    
    //constructor
    constructor(){
        super();
        this.getTodos = this.getToDos.bind(this);
        
        const ctdos = toDoStore.getAll();
        const todoCompleted = ctdos.filter(function(td){
            if(td.completed == true){
                return td;
            }
        });
        
        //set component state
        this.state = {
            todos: todoCompleted,
        }
    }
    
    //add store event listener to component when about to mount
    componentWillMount(){
        toDoStore.on("change", this.getTodos);
        console.log("count", toDoStore.listenerCount("change"));
    }
    
    //remove store event listener to component when about to unmount
    componentWillUnmount(){
        toDoStore.removeListener("change", this.getTodos);
    }
    
    //go to store and get todos then filter to get only ones that are completed
    getToDos(){
        const ctdos = toDoStore.getAll();
        const todoCompleted = ctdos.filter(function(td){
            if(td.completed == true){
                return td;
            }
        });
        
        this.setState({
            todos: todoCompleted,
        });
    }
    
    //create to do
    createToDo(){
        const newTodo = this.refs.createTodo.value;
        
        ToDoActions.createTodo(newTodo);
    }
    
    //handle delete button click
    handleDeleteClick(id){
        ToDoActions.deleteTodo(id);
    }
    
    //handle complete button click
    handleCompleteClick(id){
        ToDoActions.completeTodo(id);
    }
    
    //handle active button click
    handleActiveClick(id){
        ToDoActions.activateTodo(id);
    }
    
    //render method
    render(){
        
        const { todos } = this.state;
        
        const toDoComponents = todos.map((todo)=>{
           return <ToDo 
           key={todo.id}
           id={todo.id}
           {...todo}
            handleDeleteClick={this.handleDeleteClick.bind(this)}
            handleCompleteClick={this.handleCompleteClick.bind(this)} 
            handleActiveClick = {this.handleActiveClick.bind(this)}
            />; 
        });
        
        return(
            <div>
                <h1>Completed</h1>
                <ul>
                    {toDoComponents}
                </ul>
            </div>
        )
    }
    
}