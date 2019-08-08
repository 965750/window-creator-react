import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAccount } from '../store/actions/authActions'
import '../index.css'
import styles from './Home.scss'

class Home extends Component {
    componentDidMount () {
        console.log('i did mount')
        console.log(this.props)

    }
    handleClick = () => {
        this.props.createAccount('FromComponent')
    }      

    render () {
        return (
            <div className="test">
                <p className="bg-blue-600 mt-5 test__text">My Home Page</p>
                <p>JUST TRYING MODULES</p>
                <button onClick={this.handleClick} >New Account?</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createAccount: (account) => dispatch(createAccount(account))
    }
}

const mapStateToProps = (state) => {
    return {
        acc: state.auth.myAccount
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)