import React from 'react';

import {Link} from 'react-router';

export default class Layout extends React.Component{
    
    render(){
        
        return(
            <div>
                <h1>Super Simple Super Awesome Flux To Do List Maker</h1>
                {this.props.children}
                <Link to="/"><button className="todoComponentBtn">Home</button></Link>
                <Link to="/completed"><button className="todoComponentBtn">Completed</button></Link>
                <Link to="/active"><button className="todoComponentBtn">Active</button></Link>
            </div>
        )
    }
    
}