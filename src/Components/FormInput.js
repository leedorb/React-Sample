import React, { Component } from 'react'

type Prop = {
    lableName : string,
    inputName : string,
    inputValue : any,
    inputChangeAction : any
}
type State = {
}

export default class FormInput extends Component<Prop, State>{
    render(){
        return(
            <div className="col-md-4 text-align-start">
                <label>{this.props.lableName}</label>
                <input type="text" name={this.props.inputName} value={this.props.inputValue}  onChange={this.props.inputChangeAction}/>
            </div>
        )
    }
}