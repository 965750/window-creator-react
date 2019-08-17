import React, { Component } from 'react'
import CreatorPreview from '../components/steps/blocks/CreatorPreview'
import StepFirstOptions from '../components/steps/firstStep/StepFirstOptions'
import StepSecondOptions from '../components/steps/secondStep/StepSecondOptions'
import Stepper from '../components/steps/blocks/Stepper'
import StepperNavigation from '../components/steps/blocks/StepperNavigation'
import styles from './Creator.module.scss'
import { connect } from 'react-redux'

class Creator extends Component {
    state = {
        rows: ['', '', ''],
        columns: ['', '', ''],
    }

    render() {
        let currentStepOptions

        switch (this.props.step) {
            case 1:
                currentStepOptions = <StepFirstOptions />
                break
            case 2:
                currentStepOptions = <StepSecondOptions />
                break
        }

        return (
            <div className={`${styles.wrapper} mx-auto z-10`}>
                <Stepper />
                <div className="flex mt-4">
                    <CreatorPreview />
                    <div className="w-1/3 ml-6 relative">
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
        step: state.theme.stepper.active,
    }
}

export default connect(mapStateToProps)(Creator)
