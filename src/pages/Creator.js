import React, { Component } from 'react'
import CreatorPreview from '../components/CreatorPreview'
import StepFirstOptions from '../components/StepFirstOptions'
import Stepper from '../components/Stepper'
import StepperNavigation from '../components/StepperNavigation'
import styles from './Creator.module.scss'

class Creator extends Component {
    state = {
        rows: ['', '', ''],
        columns: ['', '', ''],
    }

    render() {
        return (
            <div className={`${styles.wrapper} mx-auto`}>
                <Stepper />

                <div className="flex mt-4">
                    <CreatorPreview />
                    <div className="w-1/3 ml-6 relative">
                        <StepFirstOptions />
                        <StepperNavigation />
                    </div>
                </div>
            </div>
        )
    }
}

export default Creator
