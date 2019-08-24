import React, { Component } from 'react'
import styles from './Navbar.module.scss'
import LanguageSwitcher from './LanguageSwitcher'
import LoggedInLinks from './LoggedInLinks'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Navbar extends Component {
    render() {
        return (
            <div
                className={`${styles.navbar} px-5 flex bg-white shadow space justify-between`}
            >
                <LanguageSwitcher />
                {this.props.isLoggedIn ? <LoggedInLinks /> : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state, 3333)
    return {
        isLoggedIn: !state.firebase.auth.isEmpty,
    }
}

Navbar.propTypes = {
    isLoggedIn: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
}

export default connect(mapStateToProps)(Navbar)
