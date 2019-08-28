import React, { Component } from 'react'
import CreatorPreview from '../components/steps/blocks/CreatorPreview'
import StepFirstOptions from '../components/steps/firstStep/StepFirstOptions'
import StepSecondOptions from '../components/steps/secondStep/StepSecondOptions'
import StepThirdOptions from '../components/steps/thirdStep/StepThirdOptions'
import Stepper from '../components/steps/blocks/Stepper'
import StepperNavigation from '../components/steps/blocks/StepperNavigation'
import styles from './Creator.module.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

class Creator extends Component {
    state = {
        rows: ['', '', ''],
        columns: ['', '', ''],
    }

    render() {
        let currentStepOptions

        switch (this.props.step) {
            case 1:
                currentStepOptions = (
                    <StepFirstOptions window={this.props.window} />
                )

                break
            case 2:
                currentStepOptions = (
                    <StepSecondOptions window={this.props.window} />
                )

                break
            case 3:
                currentStepOptions = <StepThirdOptions />

                break
            default:
                return
        }

        if (!this.props.isLoggedIn) return <Redirect to="/" />

        return (
            <div className={`${styles.wrapper} mb-10 md:px-3 mx-auto z-10`}>
                <Stepper />
                <div className="flex flex-wrap md:flex-no-wrap mt-4">
                    <CreatorPreview />
                    <div
                        className={`${styles.options__wrapper} w-full md:w-1/3 md:ml-6 relative`}
                    >
                        {currentStepOptions}
                        <StepperNavigation />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.firebase.auth.uid,
        step: state.theme.stepper.active,
        window: state.creator.window,
    }
}

Creator.propTypes = {
    isLoggedIn: PropTypes.string,
    window: PropTypes.shape({
        color: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        doorType: PropTypes.number,
        rows: PropTypes.array,
        columns: PropTypes.array,
    }),
    step: PropTypes.number,
}

export default connect(mapStateToProps)(Creator)
