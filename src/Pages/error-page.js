import React, { Component } from 'react';

type Prop = {
    msg : string
}

export default class ErroPage extends Component<Prop>{
    constructor(props: Prop){
        super();
    }

    render(){
        const message = this.props.msg ? this.props.msg : "404"
        return(
            <>
                <h1>Error</h1>
                <div>{message}</div>
            </>
        )
    }
}