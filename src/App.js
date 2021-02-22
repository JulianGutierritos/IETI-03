import React, {Component} from 'react';
import './components/TodoApp.css';
import {TodoApp} from './components/TodoApp';
import {Login} from './components/Login';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

export class App extends Component {
	constructor(props) {
        super(props);
        if (localStorage.isLoggedIn === "true"){
            this.state = { isLoggedIn : true };
        }
        else{
            this.state = { isLoggedIn : false };
        }
		this.handleChangeIsLoggedIn = this.handleChangeIsLoggedIn.bind(this);
        this.handleChangeIsLoggedOut = this.handleChangeIsLoggedOut.bind(this);
		localStorage.setItem('user', 'julian@mail.com');
		localStorage.setItem('passwd', '1234');
		this.TodoAppView = () => (<TodoApp handleChangeIsLoggedOut = {this.handleChangeIsLoggedOut}/>);
		this.LoginView = () => (<Login handleChangeIsLoggedIn = {this.handleChangeIsLoggedIn}/>);
    }
	
    render() {
        return (
            <Router>
                <div className="App">
                    <div>
                        {this.state.isLoggedIn ?
                        <div><Link to="/todo"></Link><Route exact path="/" component={this.TodoAppView}/></div> :
                        <div><Link to="/"></Link><Route exact path="/" component={this.LoginView}/></div>}
                    </div>
                </div>
            </Router>
		);
	}
	handleChangeIsLoggedIn(e){
        this.setState({ 
			isLoggedIn  : true
        }); 
	}
    handleChangeIsLoggedOut(e){
        this.setState({ 
			isLoggedIn  : false
        }); 
	}
}



