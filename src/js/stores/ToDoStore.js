import dispatcher from '../dispatcher';
import EventEmitter from 'events';

class ToDoStore extends EventEmitter{
    
    //Constructor.. create initial template store data
    constructor(){
        super();
        this.todos = [
            {
                id: 0,
                text: 'Get Milk',
                completed: false
            },
            {
                id: 1,
                text: 'Wash the dishes',
                completed: true
            },
            {
                id: 2,
                text: 'Do Laundry',
                completed: true
            }
        ]
    }
    
    //get everything from store
    getAll(){
        return this.todos;
    }
    
    //add to store
    createToDo(text){
        const id= Date.now();
        
        this.todos.push(
            {
                id,
                text,
                completed: false
            }
        )
        
        //emit to other components that the store has changed
        this.emit('change');
    }
    
    //remove from store
    deleteToDo(id){
        const index = this.todos.filter(function(el){
            return el.id !== id;
        });
        
        this.todos = index;
        this.emit('change');
    }
    
    //update obect to completed in store
    completeTodo(id){
        
        console.log('complete');
        const todo = this.todos.filter(function(el){
            return el.id == id;
        });
        
        const todoIndex = this.todos.findIndex(function(el){
            return el.id ==id;
        });
        
        todo[0].completed = true;
        
        this.todos[0][todoIndex] = todo;
        
        console.log(this.todos);
        this.emit("change");
        
    }
    
    //update obect to active in store
    activateTodo(id){
        
        console.log('active');
        const todo = this.todos.filter(function(el){
            return el.id == id;
        });
        
        const todoIndex = this.todos.findIndex(function(el){
            return el.id ==id;
        });
        
        todo[0].completed = false;
        
        this.todos[0][todoIndex] = todo;
        
        this.emit("change");
    }
    
    //handle actions sent from the dispatcher
    handleAction(action){
        switch(action.type){
            case "CREATE_TODO": {
                this.createToDo(action.text);
                break;
            }
            case "DELETE_TODO": {
                this.deleteToDo(action.id);
                break;
            }
            case "COMPLETE_TODO": {
                this.completeTodo(action.id);
                break;
            }
            case "ACTIVATE_TODO": {
                this.activateTodo(action.id);
                break;
            }
        }
        
    }
}

//create store
const toDoStore = new ToDoStore;

//make store listen to dispatcher
dispatcher.register(toDoStore.handleAction.bind(toDoStore));

//export store
export default toDoStore;
