import { clearNotification } from '../../../store/actions/themeActions'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styles from './NotificationBanner.module.scss'

class NotificationBanner extends Component {
  state = {
    show: false,
  }

  componentDidUpdate() {
    this.startNotification()
  }

  startNotification = () => {
    if (this.props.notification && !this.state.show) {
      this.setState({
        show: true,
      })

      this.onCloseBanner(5000)
    }
  }

  onCloseBanner = (time) => {
    setTimeout(() => {
      this.props.clearNotification()

      this.setState({
        show: false,
      })
    }, time)
  }

  render() {
    if (this.state.show && this.props.notification) {
      return (
        <div
          className={`${styles.banner} bg-${this.props.notification.type} flex items-center fixed w-full z-50 top-0 text-white`}
        >
          <p className={`${styles.banner__text} mx-auto text-center`}>
            <FormattedMessage
              id={this.props.notification.text}
              defaultMessage={this.props.notification.text}
            />
          </p>
          <button
            data-testid="closeNotification"
            onClick={() => this.onCloseBanner(0)}
            className={`${styles.banner__close} absolute right-30 cursor-pointer top-half`}
          >
            &#10005;
          </button>
        </div>
      )
    }
    return null
  }
}

const mapDispatchToProps = (dispatch) => ({
  clearNotification: () => dispatch(clearNotification()),
})

const mapStateToProps = (state) => ({
  notification: state.theme.notification,
})

NotificationBanner.propTypes = {
  clearNotification: PropTypes.func,
  notification: PropTypes.shape({
    type: PropTypes.string,
    text: PropTypes.string,
  }),
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationBanner)
