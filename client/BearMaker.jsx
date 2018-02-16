import React, { Component } from 'react';
import axios from 'axios';

class BearMaker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bear: ''
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onBearHandler = this.onBearHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({
            bear: e.target.value
        });
        console.log(this.state);
    }

    onBearHandler(e){
        let myBear = this.state.bear;
        if (e.target.name === 'create') {
            axios.post('/api/bears', {name: myBear})
                .then(function(resp) {
                    console.log(resp);
                })
                .catch(function(err) {
                    console.log('Oh no, you broke it.');
                })
        } else {
            axios.delete('/api/bears/' + myBear)
                .then(function(resp) {
                    console.log(resp);
                })
                .catch(function(err) {
                    console.log('Oh no, you broke it.');
                })
        }
    }

    render() {
        return (
            <div>
                Bear Name: <input type="text" name="bear" onChange={this.onChangeHandler} /> <br />
                <button onClick={this.onBearHandler} name="create">Create Bear</button> <button onClick={this.onBearHandler} name="kill">Delete Bear</button>
            </div>
                
        )
    }
}

export default BearMaker;