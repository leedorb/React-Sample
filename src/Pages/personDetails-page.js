import React, { Component } from 'react';
import type {IPerson } from '../Models/Person'
import PersonService from '../Services/PersonService'

type State = {
    person : IPerson,
    error_msg : string
}

export default class personDetails extends Component<Props, State>{
   
    state = {
        person :  null,
        error_msg : ""
    }

    componentDidMount(){
        const { id } = this.props.match.params;

        PersonService.getPersonById(id).then((json) => {
                json.id != null ? this.setState({person : json}) : this.setState({error_msg : json})
            }    
        )
    }   

    redirectToPersonPage = () => {
        this.props.history.push(`/person`);
    }

    handleBackToPersonList = () => {
        this.redirectToPersonPage();
    }
    handleEdit = (event : any) => {
        event.preventDefault();
        this.props.history.push('/person/' + event.target.name + '/edit');
    }
    handleDelete = (event : any) => {
        event.preventDefault();
        PersonService.delPersonById(event.target.name)
        .then(() => {
            this.redirectToPersonPage();
        })
    }

    render(){
        return(
            <>
                <h1>Person details</h1>
                {
                    this.state.person ? 
                        <div>
                            <div>Name: {this.state.person.firstName}</div>
                            <div>LastName : {this.state.person.lastName}</div>
                            <div>age: {this.state.person.age}</div>
                        </div> 
                        : <div>{this.state.error_msg}</div>
                }

                <div className="form-btn">
                        <button  onClick={this.handleBackToPersonList}>Back To List</button>
                        {
                            this.state.person ?
                            <>
                            <button  name={this.state.person.id} onClick={this.handleEdit}>Edit</button>
                            <button  name={this.state.person.id} onClick={this.handleDelete}>Delete</button>
                            </>
                            : null
                        }
                </div> 
            </>

        )
    }
}