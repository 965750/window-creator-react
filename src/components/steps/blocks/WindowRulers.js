import React from 'react'
import styles from './WindowRulers.module.scss'

export default function WindowRulers({ window }) {
    let bottomRuler

    if (window.doorType === 1) {
        bottomRuler = (
            <div
                className={`${
                    styles['ruler--horizontal']
                } absolute -bottom-40 w-full border-l-2 border-r-2`}
            >
                <div
                    className={`${styles.ruler__counter} absolute top-half left-half border bg-white text-center`}
                >
                    <span>{window.width}</span>
                </div>
                <div
                    className={`${
                        styles['bar--horizontal']
                    } w-full bg-scorpion`}
                />
            </div>
        )
    } else {
        bottomRuler = (
            <div className="flex">
                <div
                    className={`${
                        styles['ruler--horizontal']
                    } absolute -bottom-40 w-1/2 border-l-2 border-scorpion border-r-2`}
                >
                    <div
                        className={`${styles.ruler__counter} absolute top-half left-half border bg-white text-center`}
                    >
                        <span>{window.width}</span>
                    </div>
                    <div
                        className={`${
                            styles['bar--horizontal']
                        } w-full bg-scorpion`}
                    />
                </div>
                <div
                    className={`${
                        styles['ruler--horizontal']
                    } absolute -bottom-40 w-1/2 right-0 border-l-2 border-scorpion border-r-2`}
                >
                    <div
                        className={`${styles.ruler__counter} absolute top-half left-half border bg-white text-center`}
                    >
                        <span>{window.width}</span>
                    </div>
                    <div
                        className={`${
                            styles['bar--horizontal']
                        } w-full bg-scorpion`}
                    />
                </div>
            </div>
        )
    }

    return (
        <div>
            <div
                className={`${
                    styles['ruler--vertical']
                } absolute -left-40 h-full border-t-2 border-scorpion border-b-2`}
            >
                <div
                    className={`${styles.ruler__counter} absolute top-half left-half border bg-white text-center`}
                >
                    <span>{window.height}</span>
                </div>
                <div
                    className={`${
                        styles['bar--vertical']
                    } h-full bg-scorpion mx-auto`}
                />
            </div>
            <div
                className={`${
                    styles['ruler--horizontal']
                } absolute -top-40 w-full border-l-2 border-scorpion border-r-2`}
            >
                <div
                    className={`${styles.ruler__counter} absolute top-half left-half border bg-white text-center`}
                >
                    <span>
                        {window.doorType === 1
                            ? window.width
                            : window.width * 2}
                    </span>
                </div>
                <div
                    className={`${
                        styles['bar--horizontal']
                    } w-full bg-scorpion`}
                />
            </div>
            {bottomRuler}
        </div>
    )
}
