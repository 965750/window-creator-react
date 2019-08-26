import React, { Component } from 'react'
import styles from './NotificationBanner.module.scss'
import { connect } from 'react-redux'
import { clearNotification } from '../../store/actions/themeActions'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

class NotificationBanner extends Component {
    state = {
        show: false,
    }

    onCloseBanner = time => {
        setTimeout(() => {
            this.props.clearNotification()

            this.setState({
                show: false,
            })
        }, time)
    }

    componentDidUpdate() {
        if (this.props.notification && !this.state.show) {
            this.setState({
                show: true,
            })

            this.onCloseBanner(5000)
        }
    }

    render() {
        if (this.state.show && this.props.notification) {
            return (
                <div
                    className={`${styles.banner}  bg-${this.props.notification.type} fixed w-full z-30 top-0 text-white`}
                >
                    <p className={`${styles.banner__text} text-center`}>
                        <FormattedMessage
                            id={this.props.notification.text}
                            defaultMessage={this.props.notification.text}
                        />
                    </p>
                    <span
                        onClick={() => this.onCloseBanner(0)}
                        className={`${styles.banner__close} absolute right-30 cursor-pointer top-half`}
                    >
                        &#10005;
                    </span>
                </div>
            )
        } else {
            return null
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearNotification: () => dispatch(clearNotification()),
    }
}

const mapStateToProps = state => {
    return {
        notification: state.theme.notification,
    }
}

NotificationBanner.propTypes = {
    clearNotification: PropTypes.func,
    notification: PropTypes.shape({
        type: PropTypes.string,
        text: PropTypes.string,
    }),
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationBanner)
