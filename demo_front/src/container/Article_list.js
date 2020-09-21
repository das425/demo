import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Article from '../../../../Desktop/2019-2/SWPP/HW/hw2/src/Components/Article';

import * as actionCreators from '../store/actions/index';

class Article_List extends Component{
    componentDidMount(){
        this.props.getAllArticle();
        this.props.getUsers();
        this.props.getUser1();
    }
    state = {
    }
    logoutHandler = () => {
        if(this.props.selectedUser){
            let id = this.props.selectedUser.id;
            let password = this.props.selectedUser.password;
            let email = this.props.selectedUser.email;
            let name = this.props.selectedUser.name;
            this.props.LogOut(id,password,email,name,false);
            this.props.getUser1();
            this.props.getUsers();
            if(this.props.selectedUser){
                if(!this.props.selectedUser.logged_in){
                    this.props.history.push('/login');
                }
            }
        }
    }
    clickArticleHandler = (ar) => {
        this.props.history.push('/articles/' + ar.id);
    }
    postArticleHandler = () => {
        this.props.history.push('/articles/create');
    }
    render(){
        let redirect = null;
        if(this.props.selectedUser){
            if(!this.props.selectedUser.logged_in){
                redirect = <Redirect to ='/login'/>
            }
        }
        const articles = this.props.articles.map((ar)=>{
            return (
                <Article
                    id = {ar.id}
                    title = {ar.title}
                    content = {ar.content}
                    author_id = {ar.author_id}
                    clickDetail = {()=>this.clickArticleHandler(ar)} 
                    />
            );
        });
        return (
            <div className = "Article_List">
                
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        articles : state.ar.Articles,
        selectedUser : state.ar.selectedUser,
        Users : state.ar.Users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllArticle : () => dispatch(actionCreators.getArticles()),
        getUsers : () => dispatch(actionCreators.getUsers()),
        LogOut : (id, password, email, name, logged_in) =>
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

export default connect(mapStateToProps, mapDispatchToProps)(Article_List);