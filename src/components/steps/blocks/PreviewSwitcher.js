import React, { Component } from 'react'
import styles from './PreviewSwitcher.module.scss'
import PropTypes from 'prop-types'

function PreviewSwitcher({ onSwitchPreview, interiorPreview }) {
    return (
        <div className="flex cursor-pointer text-center absolute top-10 right-20">
            <div
                onClick={() => onSwitchPreview(true)}
                className={`${styles.sideBtn} ${
                    interiorPreview
                        ? 'border-2 bg-white'
                        : 'border bg-botticelli opacity-75'
                } border-gullGray`}
            >
                3D
            </div>
            <div
                onClick={() => onSwitchPreview(false)}
                className={`${styles.sideBtn} ${
                    !interiorPreview
                        ? 'border-2 bg-white'
                        : 'border bg-botticelli opacity-75'
                } border-gullGray`}
            >
                2D
            </div>
        </div>
    )
}

PreviewSwitcher.propTypes = {
    onSwitchPreview: PropTypes.func,
    interiorPreview: PropTypes.bool,
}

export default PreviewSwitcher
