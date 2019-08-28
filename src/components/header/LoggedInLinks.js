import React, { Component } from 'react'
import { logout } from '../../store/actions/authActions'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import AvatarBox from './AvatarInfoBox'

class LoggedInLinks extends Component {
    render() {
        return (
            <div className="flex relative">
                <p
                    className="uppercase mr-5 flex self-center cursor-pointer"
                    onClick={this.props.logout}
                >
                    <FormattedMessage id="Logout" defaultMessage="Logout" />
                </p>
                <AvatarBox />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
    }
}

LoggedInLinks.propTypes = {
    logout: PropTypes.func,
}

export default connect(
    null,
    mapDispatchToProps
)(LoggedInLinks)
