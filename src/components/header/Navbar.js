import React, { Component } from 'react'
import styles from './Navbar.module.scss'
import LanguageSwitcher from './LanguageSwitcher'
import LoggedInLinks from './LoggedInLinks'
import LoggedOutLinks from './LoggedOutLinks'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Navbar extends Component {
    render() {
        return (
            <div
                className={`${styles.navbar} px-2 sm:px-5 flex bg-white shadow space justify-between`}
            >
                <LanguageSwitcher />
                {!this.props.isLoggedIn ? (
                    <LoggedInLinks />
                ) : (
                    <LoggedOutLinks />
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state, 44444)
    return {
        isLoggedIn: state.firebase.auth.isEmpty,
        user: state.firebase.profile,
    }
}

Navbar.propTypes = {
    isLoggedIn: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
}

export default connect(mapStateToProps)(Navbar)
