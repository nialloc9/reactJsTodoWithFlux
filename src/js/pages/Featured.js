import React from 'react';

import ToDo from '../components/ToDo';

import toDoStore from '../stores/ToDoStore';

import * as ToDoActions from '../actions/ToDoActions';

export default class Featured extends React.Component{
    
    //constructor
    constructor(){
        super();
        this.getTodos = this.getToDos.bind(this);
        this.state = {
            todos: toDoStore.getAll(),
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
    
    //go to store and get todos
    getToDos(){
        
        //set component state
        this.setState({
            todos: toDoStore.getAll(),
        });
    }
    
    //create to do
    createToDo(){
        const newTodo = this.refs.createTodo.value;
        
        ToDoActions.createTodo(newTodo);
    }
    
    //handle delete button click
    handleDeleteClick(id){
        console.log('1');
        ToDoActions.deleteTodo(id);
    }
    
    //handle complete button click
    handleCompleteClick(id){
        console.log('2');
        ToDoActions.completeTodo(id);
    }
    
    //handle active button click
    handleActiveClick(id){
        console.log('3');
        ToDoActions.activateTodo(id);
    }
    
    //render method
    render(){
        
        const { todos } = this.state;
        
        const ToDoComponents = todos.map((todo) =>{
            return <ToDo 
            
            key={todo.id} 
            
            id={todo.id}
            
            handleDeleteClick={this.handleDeleteClick.bind(this)} 
            
            handleCompleteClick={this.handleCompleteClick.bind(this)} 
            
            handleActiveClick = {this.handleActiveClick.bind(this)}
            
            {...todo}
            
            />; 
        })
        return(
            <div>
                <button className="todoComponentBtn" onClick={this.createToDo.bind(this)}>Create</button>
                <input className="todoComponentCreateInput" ref="createTodo"/>
                <h1>ToDo List</h1>
                <ul>{ToDoComponents}</ul>
            </div>
        )
    }
}