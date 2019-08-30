import { connect } from 'react-redux'
import { logout } from '../../store/actions/authActions'
import { FormattedMessage } from 'react-intl'

import AvatarBox from './AvatarInfoBox'
import PropTypes from 'prop-types'
import React from 'react'

const LoggedInLinks = (
  { logout } // eslint-disable-line
) => (
  <div className="flex relative">
    <button
      className="uppercase mr-5 flex self-center cursor-pointer"
      onClick={logout}
    >
      <FormattedMessage id="Logout" defaultMessage="Logout" />
    </button>
    <AvatarBox />
  </div>
)

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
})

LoggedInLinks.propTypes = {
  logout: PropTypes.func,
}

export default connect(
  null,
  mapDispatchToProps
)(LoggedInLinks)
