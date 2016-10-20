import dispatcher from '../dispatcher';

//The es6 way of of exporting a function so it gets a name is:
export function createTodo(text){
    dispatcher.dispatch({
        type: "CREATE_TODO",
        text,
    })
}

export function deleteTodo(id){
    dispatcher.dispatch({
        type: "DELETE_TODO",
        id,
    })
}

export function completeTodo(id){
    dispatcher.dispatch({
        type: "COMPLETE_TODO",
        id,
    })
}

export function activateTodo(id){
    dispatcher.dispatch({
        type: "ACTIVATE_TODO",
        id,
    })
}