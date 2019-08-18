import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAccount } from '../store/actions/authActions'
import styles from './Home.module.scss'

class Home extends Component {
    handleClick = () => {
        this.props.createAccount('FromComponent')
    }

    render() {
        return (
            <div className="test">
                <p className="bg-blue-600 mt-5 test__text">My Home Page</p>
                <p className={styles.test__text}>JUST TRYING MODULES</p>
                <button onClick={this.handleClick}>New Account?</button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createAccount: account => dispatch(createAccount(account)),
    }
}

const mapStateToProps = state => {
    return {
        acc: state.auth.myAccount,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
