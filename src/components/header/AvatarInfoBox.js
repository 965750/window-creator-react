import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './AvatarInfoBox.module.scss'
import { connect } from 'react-redux'

class AvatarInfoBox extends Component {
    state = {
        showInfoBox: false,
    }

    showInfoBox = value => {
        this.setState({
            showInfoBox: value,
        })
    }

    hideInfoBox = e => {
        if (this.state.showInfoBox && !this.node.contains(e.target)) {
            this.setState({
                showInfoBox: false,
            })
        }
    }

    componentDidMount() {
        window.addEventListener('click', this.hideInfoBox)
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.hideInfoBox)
    }

    render() {
        let infoBox
        let initials = this.props.user.firstName
            ? this.props.user.firstName[0] + this.props.user.lastName[0]
            : ''

        if (this.state.showInfoBox)
            infoBox = (
                <div
                    className={`${styles.infoBox} p-2 absolute right-0 border border-gullGray rounded bg-wildSand`}
                >
                    <p>{`${this.props.user.firstName} ${this.props.user.lastName}`}</p>
                    <p>{this.props.auth.email}</p>
                </div>
            )

        return (
            <div
                className={`${styles.avatar} z-30 mt-md rounded-full bg-first cursor-pointer`}
                onMouseOver={this.showInfoBox}
                ref={n => (this.node = n)}
            >
                <p className="uppercase text-center pt-1 leading-loose text-white text-xl font-bold">
                    {initials}
                </p>
                {infoBox}
            </div>
        )
    }
}

AvatarInfoBox.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        isLoaded: PropTypes.bool,
        isEmpty: PropTypes.bool,
    }),
    auth: PropTypes.shape({
        email: PropTypes.string,
        isEmpty: PropTypes.bool,
        lastLoginAt: PropTypes.string,
    }),
}

const mapStateToProps = state => {
    return {
        user: state.firebase.profile,
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps)(AvatarInfoBox)
