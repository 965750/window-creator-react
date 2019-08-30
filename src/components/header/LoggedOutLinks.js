import { NavLink } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import React from 'react'
import styles from './LoggedOutLinks.module.scss'

const LoggedOutLinks = () => (
  <div className=" uppercase flex">
    <NavLink
      exact
      to="/register"
      className="text-osloGray hover:text-malachite flex self-center cursor-pointer sm:mr-10 mr-4"
      activeClassName={styles['link--active']}
    >
      <FormattedMessage id="RegisterNav" defaultMessage="Register" />
    </NavLink>
    <NavLink
      exact
      to="/"
      className="text-osloGray hover:text-malachite flex self-center cursor-pointer"
      activeClassName={styles['link--active']}
    >
      <FormattedMessage id="LoginNav" defaultMessage="Login" />
    </NavLink>
  </div>
)

export default LoggedOutLinks
