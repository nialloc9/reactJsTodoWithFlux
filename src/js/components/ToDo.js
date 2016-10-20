import React from 'react';

export default class ToDo extends React.Component{
     
    //call handleDeleteClick method that was passed as a prop
    handleDeleteBtnClick(){
        this.props.handleDeleteClick(this.props.id);
    }
    
    //call handleCompleteBtnClick method that was passed as a prop
    handleCompleteBtnClick(){
        this.props.handleCompleteClick(this.props.id);
    }
    
    //call handleActiveBtnClick method that was passed as a prop
    handleActiveBtnClick(){
        this.props.handleActiveClick(this.props.id);
    }
    
    //render method
    render(){
        return(
            <div class="todoComponent">
                <ul>
                    <li class="todoComponentText">
                        {this.props.text}<br />
                    </li>

                    <li class="todoComponentCompleteClick" onClick={this.handleCompleteBtnClick.bind(this)}>
                         Complete
                    </li>

                    <li class="todoComponentActivateClick" onClick={this.handleActiveBtnClick.bind(this)}>
                          Make active 
                    </li>
                          
                    <li class="toDoComponetDeleteClick" onClick={this.handleDeleteBtnClick.bind(this)}>
                        X
                    </li>
                </ul>
            </div>
        )
    }
    
}