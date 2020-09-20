import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actionCreators from '../store/actions/index';

class LogIn_box extends Component{
    render(){
        return (
            <div className = "LogIn_box">
                <div>Log In Box</div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn_box);