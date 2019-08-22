import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeStep } from '../../../store/actions/themeActions'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

class StepperNavigation extends Component {
    render() {
        let btnBack

        if (this.props.activeStep !== 1) {
            btnBack = (
                <button
                    className="h-8 mr-4 uppercase border-2 border-gullGray w-full cursor-pointer"
                    onClick={() =>
                        this.props.handleChangeStep(this.props.activeStep - 1)
                    }
                >
                    <FormattedMessage id="back" defaultMessage="back" />
                </button>
            )
        }
        return (
            <div className="flex absolute w-full bottom-0">
                {btnBack}
                <button
                    className="h-8 min-w-half uppercase border-2 bg-gullGray text-white border-gullGray cursor-pointer"
                    onClick={() =>
                        this.props.handleChangeStep(this.props.activeStep + 1)
                    }
                >
                    <FormattedMessage
                        id="next step"
                        defaultMessage="next step"
                    />
                </button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        activeStep: state.theme.stepper.active,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleChangeStep: step => dispatch(changeStep(step)),
    }
}

StepperNavigation.propTypes = {
    activeStep: PropTypes.number.isRequired,
    handleChangeStep: PropTypes.func,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StepperNavigation)
