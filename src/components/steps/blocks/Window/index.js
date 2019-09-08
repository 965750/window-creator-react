import PropTypes from 'prop-types'
import React from 'react'
import styles from './Window.module.scss'

const Window = ({ window, innerWidth }) => {
  const table = window.rows.map((row, index) => (
    <tr
      style={{ borderColor: window.color }}
      className={`${styles.window__rows}`}
      key={index} // eslint-disable-line
    >
      {window.columns.map((
        column,
        index // eslint-disable-line
      ) => (
        <td
          style={{
            borderColor: window.color,
          }}
          className={`${styles.window__columns}`}
          key={index} // eslint-disable-line
        >
          &nbsp;
        </td>
      ))}
    </tr>
  ))

  return (
    <div
      className="h-full z-20"
      style={{
        width: `${window.width * (innerWidth > 767 ? 1 : 0.6)}px`,
        height: `${window.height * (innerWidth > 767 ? 1 : 0.6)}px`,
      }}
    >
      <table
        style={{ borderColor: window.color }}
        className={`${styles.window} w-full h-full`}
      >
        <tbody>{table}</tbody>
      </table>
    </div>
  )
}

Window.propTypes = {
  innerWidth: PropTypes.number,
  window: PropTypes.shape({
    innerWidth: PropTypes.number,
    color: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    doorType: PropTypes.number,
    rows: PropTypes.array,
    columns: PropTypes.array,
  }),
}

export default Window
