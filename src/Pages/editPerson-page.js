import React, { Component } from 'react';
import type {IPerson } from '../Models/Person'
import PersonService from '../Services/PersonService'
import FormInput from '../Components/FormInput'

type State = {
    person : IPerson,
    error_msg : string
}

export default class editPerson extends Component<Props, State>{
   
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

    handleCancel = (event : any) => {
        event.preventDefault();
        this.redirectToEditPage();
    }

    redirectToPersonPage = () => {
        this.props.history.push(`/person`);
    }

    redirectToEditPage = () => {
        this.props.history.push('/person/' + this.state.person.id);
        
    }

    handleSubmit = (event : any) => {
        event.preventDefault();
        const obj_state = this.state.person;
        const obj : IPerson = {
            "ID" : obj_state.id,
            "FirstName" : obj_state.firstName,
            "LastName" : obj_state.lastName,
            "Age" : obj_state.age
        }

        PersonService.editPerson(obj_state.id, obj)
        .then(() => {
            this.redirectToPersonPage();
        }).catch(response => {
            alert("Error occurred")
        })

    }

    handleInputChange = (event : any) => {
        const person = {...this.state.person};
        //console.log(event.target.name);
        switch (event.target.name) {
            case 'p_Name':
                person.firstName = event.target.value
                break;
            case 'p_lastName':
                person.lastName = event.target.value
                break;
            case 'p_Age':
                person.age = event.target.value
                break;
            default:
                break;
        }

        this.setState({person});
    }

    render(){
        return(
            <>
                <h1>Person details</h1>
                {
                    this.state.person ? 
                    <form>
                        {<FormInput lableName="Name: " inputName="p_Name" inputValue={this.state.person.firstName} inputChangeAction={this.handleInputChange}/>}
                        {<FormInput lableName="Last name: " inputName="p_lastName" inputValue={this.state.person.lastName} inputChangeAction={this.handleInputChange}/>}
                        {<FormInput lableName="Age: " inputName="p_Age" inputValue={this.state.person.age} inputChangeAction={this.handleInputChange}/>}

                        <div className="form-btn">
                            <button type="submit" className="form-send-btn" onClick={this.handleSubmit}>Save</button>
                            <button className="form-send-btn" onClick={this.handleCancel}>Cancel</button>
                        </div> 
                    </form> 
                        : <div>{this.state.error_msg}</div>
                }
            </>

        )
    }
}