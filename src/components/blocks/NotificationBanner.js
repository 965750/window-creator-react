import React, { Component } from 'react'
import styles from './NotificationBanner.module.scss'
import { connect } from 'react-redux'
import { clearNotification } from '../../store/actions/themeActions'

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

            this.onCloseBanner(7000)
        }
    }

    render() {
        if (this.state.show) {
            return (
                <div
                    className={`${styles.banner} bg-error fixed w-full z-30 top-0 text-white`}
                >
                    <p className={`${styles.banner__text} text-center`}>
                        {this.props.notification}
                    </p>
                    <span
                        onClick={() => this.onCloseBanner(0)}
                        className={`${styles.banner__close} absolute right-30 top-half`}
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
    console.log(state, 11111)
    return {
        notification: state.theme.notification,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationBanner)
