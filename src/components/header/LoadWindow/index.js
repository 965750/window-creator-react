import { connect } from 'react-redux'
import { faArrowAltCircleDown, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { loadWindow, removeWindowSave } from '../../../store/actions/creatorActions'

import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './LoadWindow.module.scss'

const LoadWindow = ({
  window, isLast, loadWindow, removeWindowSave, // eslint-disable-line
}) => (
  <div data-testid="wrapper" className={`${styles.save} ${isLast ? '' : 'border-b border-silver'} py-2 text-left flex relative`}>
    <div>
      <p className={`${styles.save__name}`}>{window.save.name}</p>
      <p className={`${styles.save__time} text-gullGray opacity-75`}>{moment(window.save.time).fromNow()}</p>
    </div>
    <FontAwesomeIcon
      data-testid="loadIcon"
      onClick={() => loadWindow(window.id)}
      className={`${styles.save__btnLoad} text-hippieBlue absolute top-half right-30`}
      icon={faArrowAltCircleDown}
    />
    <FontAwesomeIcon
      data-testid="removeIcon"
      onClick={() => removeWindowSave(window.id)}
      className={`${styles.save__btnDelete} text-error absolute top-half right-0`}
      icon={faTrash}
    />
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  loadWindow: (id) => dispatch(loadWindow(id)),
  removeWindowSave: (id) => dispatch(removeWindowSave(id)),
})

LoadWindow.propTypes = {
  loadWindow: PropTypes.func,
  removeWindowSave: PropTypes.func,
  isLast: PropTypes.bool,
  window: PropTypes.shape({
    save: PropTypes.shape({
      name: PropTypes.string,
      time: PropTypes.number,
    }),
    id: PropTypes.string,
  }),
}

export default connect(null, mapDispatchToProps)(LoadWindow);
