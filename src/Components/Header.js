import React, { Component } from 'react';
import logo from './../logo.svg';


export default class Header extends Component<Prop, State>{
    render(){
        return(
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
        )
    }
}