import PropTypes from 'prop-types'
import React from 'react'
import styles from './PreviewSwitcher.module.scss'

function PreviewSwitcher({ onSwitchPreview, interiorPreview }) {
  return (
    <div className="flex cursor-pointer text-center absolute top-10 right-20">
      <button
        data-testid="previewSwitcher3d"
        onClick={() => onSwitchPreview(true)}
        className={`${styles.sideBtn} ${
          interiorPreview
            ? 'border-2 bg-white'
            : 'border bg-botticelli opacity-75'
        } border-gullGray`}
      >
        3D
      </button>
      <button
        data-testid="previewSwitcher2d"
        onClick={() => onSwitchPreview(false)}
        className={`${styles.sideBtn} ${
          !interiorPreview
            ? 'border-2 bg-white'
            : 'border bg-botticelli opacity-75'
        } border-gullGray`}
      >
        2D
      </button>
    </div>
  )
}

PreviewSwitcher.propTypes = {
  onSwitchPreview: PropTypes.func,
  interiorPreview: PropTypes.bool,
}

export default PreviewSwitcher
