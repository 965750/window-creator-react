import React from 'react'
import styles from './StepBox.module.scss'
import { connect } from 'react-redux'
import { changeStep } from '../store/actions/themeActions'

function StepBox ({ step, active, handleChangeStep }) {
    return (
        <div className='w-1/3 text-center z-20'>
            { active }
            <div onClick={() => handleChangeStep(step.id)} className={`${styles.circle} ${active ? 'bg-gullGray' : 'bg-botticelli'} cursor-pointer rounded-full bg-botticelli relative mx-auto`}>
                <div className={`${styles.circle__inside} ${active ? 'bg-white' : 'bg-hippieBlue'} top-half left-half absolute rounded-full`} />
            </div>
            <div onClick={() => handleChangeStep(step.id)}>
                <p className={`${styles.circle__text} uppercase font-bold mt-3`}>
                    {step.label}
                </p>
                <p className={`${styles.circle__text} uppercase font-bold`}>
                    {step.title}
                </p>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleChangeStep: (step) => dispatch(changeStep(step))
    }
}

export default connect(null, mapDispatchToProps)(StepBox)
