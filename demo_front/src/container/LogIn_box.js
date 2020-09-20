import React, {Component} from 'react';
import {connect} from 'react-redux';
import './LogIn_box.css';
import {Redirect} from 'react-router-dom';

import * as actionCreators from '../store/actions/index';

class LogIn_box extends Component{
    componentDidMount(){
        this.props.getUsers();
        this.props.getUser1();
    }
    state = {
        email: '',
        password:'',
        id:'',
        name:'',
        submitted: false,
        first : true
    }

    LogInButtonHandler = () => {
        if(this.state.email === "test@naver.com" && this.state.password === "testpass"){
            this.setState({submitted:true, id:1, name:'Test'})
            this.props.logIn(this.state.id, this.state.password, this.state.email, this.state.name, true);
            this.props.getUsers();
            this.props.getUser1();
        }
        else{
            alert("Email or password is wrong");
        }
    }

    render(){
        let redirect = null;
        if(this.props.selectedUser){
            if(this.props.selectedUser.logged_in){
                redirect = <Redirect to = '/articles' />
            }
        }
        else{
            redirect = <Redirect to = '/login' />
        }
        return (
            <div className = "LogIn_box">
                {redirect}
                <h1>Log In</h1>
                <label> E-mail</label>
                <input type="text" 
                id="email-input" 
                value={this.state.email} 
                onChange = {(event) => this.setState({email: event.target.value})} />
                
                <label>Password</label>
                <input type="text" 
                id="pw-input"  
                value = {this.state.password}
                onChange = {(event) => this.setState({ password: event.target.value})} />
        
                <button id="login-button" onClick={() => this.LogInButtonHandler()}>Log-in</button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        selectedUser : state.ar.selectedUser,
        Users : state.ar.Users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUsers : () => dispatch(actionCreators.getUsers()),
        logIn : (id, password, email, name, logged_in) =>
            dispatch(actionCreators.putUser({
                id : id,
                email : email,
                password : password,
                name : name, 
                logged_in : logged_in,
            })),
        getUser1 : () => dispatch(actionCreators.getUser1()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn_box);