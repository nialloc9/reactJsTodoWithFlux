import React from 'react';

import ToDo from '../components/ToDo';

import * as ToDoActions from '../actions/ToDoActions';

import toDoStore from '../stores/ToDoStore';

export default class Completed extends React.Component{
    
    //constructor
    constructor(){
        super();
        this.getTodos = this.getToDos.bind(this);
        
        const atdos = toDoStore.getAll();
        const todoActive = atdos.filter(function(td){
            if(td.completed == false){
                return td;
            }
        });
        this.state = {
            todos: todoActive,
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
    
    //go to store and get todos then filter to get only ones that are not completed
    getToDos(){
        const atdos = toDoStore.getAll();
        const todoActive = atdos.filter(function(td){
            if(td.completed == false){
                return td;
            }
        });
        
        //set component state
        this.setState({
            todos: todoActive,
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
                <h1>Active</h1>
                <ul>
                    {toDoComponents}
                </ul>
            </div>
        )
    }
    
}
