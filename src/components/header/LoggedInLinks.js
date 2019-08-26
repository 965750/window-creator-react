import React, { Component } from 'react'
import { logout } from '../../store/actions/authActions'
import { connect } from 'react-redux'
import styles from './LoggedInLinks.module.scss'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

class LoggedInLinks extends Component {
    state = {
        showInfoBox: false,
    }

    handleInfoBox = value => {
        this.setState({
            showInfoBox: value,
        })
    }

    componentDidMount() {
        window.addEventListener('click', e => {
            if (this.state.showInfoBox && !this.node.contains(e.target)) {
                this.setState({
                    showInfoBox: false,
                })
            }
        })
    }

    render() {
        let infoBox
        let initials = this.props.user.firstName
            ? this.props.user.firstName[0] + this.props.user.lastName[0]
            : ''

        if (this.state.showInfoBox)
            infoBox = <div className="absolute">SHOW ME</div>

        return (
            <div className={`${styles.loggedIn__wrapper} flex relative`}>
                <p
                    className="uppercase mr-5 flex self-center cursor-pointer"
                    onClick={this.props.logout}
                >
                    <FormattedMessage id="Logout" defaultMessage="Logout" />
                </p>
                <div
                    className={`${styles.loggedIn__avatar} mt-md rounded-full bg-first cursor-pointer`}
                    onMouseOver={() => this.handleInfoBox(true)}
                    ref={n => (this.node = n)}
                >
                    <p className="uppercase text-center pt-1 leading-loose text-white text-xl font-bold">
                        {initials}
                    </p>
                </div>
                {infoBox}
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
    user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        isLoaded: PropTypes.bool,
        isEmpty: PropTypes.bool,
    }),
}

export default connect(
    null,
    mapDispatchToProps
)(LoggedInLinks)
