import React, { Component } from 'react'
import styles from './PreviewSwitcher.module.scss'

export default function PreviewSwitcher({ onSwitchPreview, interiorPreview }) {
    return (
        <div className='flex cursor-pointer text-center absolute top-10 right-20'>
            <div onClick={() => onSwitchPreview(true)} className={`${styles.sideBtn} ${interiorPreview ? 'border-2' : 'border bg-botticelli opacity-75'} border-gullGray`}>
                3D
            </div>
            <div onClick={() => onSwitchPreview(false)} className={`${styles.sideBtn} ${!interiorPreview ? 'border-2' : 'border bg-botticelli opacity-75'} border-gullGray`}>
                2D
            </div>
        </div>
    )
}
