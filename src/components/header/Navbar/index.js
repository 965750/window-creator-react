import PropTypes from 'prop-types'
import React from 'react'
import styles from './Navbar.module.scss'

import LanguageSwitcher from '../LanguageSwitcher'
import LoggedInLinks from '../LoggedInLinks/'
import LoggedOutLinks from '../LoggedOutLinks/'

const Navbar = ({ auth }) => (
  <div
    className={`${styles.navbar} px-3 sm:px-5 flex bg-white shadow space justify-between`}
  >
    <LanguageSwitcher />
    {!auth.isEmpty ? <LoggedInLinks /> : <LoggedOutLinks />}
  </div>
)

Navbar.propTypes = {
  auth: PropTypes.object,
}

export default Navbar
