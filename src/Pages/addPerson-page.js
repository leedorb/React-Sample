import React, { Component } from 'react';
import type {IPerson } from '../Models/Person'
import FormInput from '../Components/FormInput'
import PersonService from '../Services/PersonService'

type Props = {
   
}

type State = {
    Person : IPerson
}

export default class AddPerson extends Component<Props, State>{
    state = {
        Person : {
            id : "",
            firstName : "",
            lastName : "",
            age : "",
        }
    }

    componentDidMount(){
    }   

    handleCancel = (event : any) => {
        event.preventDefault();
        this.redirectToPersonPage();
    }

    redirectToPersonPage = () => {
        this.props.history.push(`/person`);
    }

    handleSubmit = (event : any) => {
        event.preventDefault();
        const obj_state = this.state.Person;
        
        if (obj_state.id === "") {
            alert("ID field requerd")
        }
        else{
            const obj : IPerson = {
                "ID" : obj_state.id,
                "FirstName" : obj_state.firstName,
                "LastName" : obj_state.lastName,
                "Age" : obj_state.age
            }

            PersonService.addNewPerson(obj)
            .then(() => {
                this.redirectToPersonPage();
            }).catch(response => {
                alert("Error occurred")
            })
        }

    }

    handleInputChange = (event : any) => {
        const Person = {...this.state.Person};
        //console.log(event.target.name);
        switch (event.target.name) {
            case 'p_ID':
                Person.id = event.target.value
                break;
            case 'p_Name':
                Person.firstName = event.target.value
                break;
            case 'p_lastName':
                Person.lastName = event.target.value
                break;
            case 'p_Age':
                Person.age = event.target.value
                break;
            default:
                break;
        }

        this.setState({Person});
    }

    render(){
        return(
            <>
                <h1>New Person</h1>
                <form>
                    {<FormInput lableName="ID: " inputName="p_ID" inputValue={this.state.Person.id} inputChangeAction={this.handleInputChange}/>}
                    {<FormInput lableName="Name: " inputName="p_Name" inputValue={this.state.Person.firstName} inputChangeAction={this.handleInputChange}/>}
                    {<FormInput lableName="Last name: " inputName="p_lastName" inputValue={this.state.Person.lastName} inputChangeAction={this.handleInputChange}/>}
                    {<FormInput lableName="Age: " inputName="p_Age" inputValue={this.state.Person.age} inputChangeAction={this.handleInputChange}/>}

                    <div className="form-btn">
                        <button type="submit" className="form-send-btn" onClick={this.handleSubmit}>Save</button>
                        <button className="form-send-btn" onClick={this.handleCancel}>Cancel</button>
                    </div> 
                </form>
            </>

        )
    }
}