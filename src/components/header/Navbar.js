import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import React from 'react'
import styles from './Navbar.module.scss'

import LanguageSwitcher from './LanguageSwitcher'
import LoggedInLinks from './LoggedInLinks'
import LoggedOutLinks from './LoggedOutLinks'

const Navbar = ({ auth }) => (
  <div
    className={`${styles.navbar} px-2 sm:px-5 flex bg-white shadow space justify-between`}
  >
    <LanguageSwitcher />
    {!auth.isEmpty ? <LoggedInLinks /> : <LoggedOutLinks />}
  </div>
)

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
})

Navbar.propTypes = {
  auth: PropTypes.object,
}

export default connect(mapStateToProps)(Navbar)
