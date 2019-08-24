import React, { Component } from 'react'
import { logout } from '../../store/actions/authActions'
import { connect } from 'react-redux'
import styles from './LoggedInLinks.module.scss'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

class LoggedInLinks extends Component {
    render() {
        return (
            <div className={`${styles.loggedIn__wrapper} flex`}>
                <p
                    className="mr-5 flex self-center cursor-pointer"
                    onClick={this.props.logout}
                >
                    <FormattedMessage id="Logout" defaultMessage="Logout" />
                </p>
                <div
                    className={`${styles.loggedIn__avatar} mt-md rounded-full bg-first`}
                >
                    <p className="uppercase text-center pt-1 leading-loose text-white text-xl font-bold">
                        DN
                    </p>
                </div>
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
