import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './Navbar.module.scss'

import LanguageSwitcher from './LanguageSwitcher'
import LoggedInLinks from './LoggedInLinks'
import LoggedOutLinks from './LoggedOutLinks'

const Navbar = ({ isLoggedIn }) => (
  <div
    className={`${styles.navbar} px-2 sm:px-5 flex bg-white shadow space justify-between`}
  >
    <LanguageSwitcher />
    {!isLoggedIn ? <LoggedInLinks /> : <LoggedOutLinks />}
  </div>
)

const mapStateToProps = state => ({
  isLoggedIn: state.firebase.auth.isEmpty,
  user: state.firebase.profile,
})

Navbar.propTypes = {
  isLoggedIn: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
}

export default connect(mapStateToProps)(Navbar)
