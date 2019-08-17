import React, { Component } from 'react'
import styles from './Window.module.scss'

class Window extends Component {
    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({
        //         rows: Array.apply(null, Array(5))
        //     })
        // }, 3000)
    }

    render() {
        const table = this.props.window.rows.map((row, index) => {
            return (
                <tr className={`${styles.window__rows}`} key={index}>
                    {this.props.window.columns.map((column, index) => {
                        return (
                            <td
                                className={`${styles.window__columns}`}
                                key={index}
                            >
                                &nbsp;
                            </td>
                        )
                    })}
                </tr>
            )
        })

        return (
            <div
                className="h-full z-20"
                style={{
                    width: `${this.props.window.width}px`,
                    height: `${this.props.window.height}px`,
                }}
            >
                <table className={`${styles.window} w-full h-full`}>
                    <tbody>{table}</tbody>
                </table>
            </div>
        )
    }
}

export default Window
