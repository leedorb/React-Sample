import React, { Component } from 'react';
import type {IPerson } from '../Models/Person'
import PersonService from '../Services/PersonService'
import {Link} from 'react-router-dom';



type State = {
    personArr : Array<IPerson>,
    showBody : bool
}
export default class HomePage extends Component<Props, State>{
    state = {
        personArr : [],
        showBody : false
    }

    componentDidMount(){
        this.setPersonList().then(() => {
            this.setState({showBody : true})
        });
    }

    setPersonList = () => {
        return PersonService.getPersonListData().then((json) => {
           this.setState({personArr : json})
        })
    }

    handlePersonDel = (event : any) =>{
        event.preventDefault();
        PersonService.delPersonById(event.target.id)
        .then(() => {
            this.setPersonList();
        })
    }

    render(){
        return(
            <ul className="PersonsList">
                <li>
                    <h2>Persons list</h2>
                </li>
                <li>
                    {
                        this.state.showBody ? <Link className="nav-link" to={`/person/new`} >Add new person</Link> : null
                    }
                </li>
                 {
                    this.state.showBody ?  
                    this.state.personArr.length > 0 ? 
                    this.state.personArr.map((item, index) => {
                        return (
                            <li key={index}>
                                <span>{item.firstName}</span>
                                <span><Link className="nav-link" to={`/person/${item.id}`} >View</Link></span>
                                <span><a href="/" id={item.id} onClick={this.handlePersonDel}>Delete</a></span>
                            </li>
                        )
                    })
                     : <div>No persons found</div>
                    : null
                    
                    
                }
            </ul>
        )
    }
}