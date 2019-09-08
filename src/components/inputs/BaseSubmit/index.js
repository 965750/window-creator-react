import { injectIntl } from 'react-intl'

import PropTypes from 'prop-types'
import React from 'react'
import styles from './BaseSubmit.module.scss'

const BaseSubmit = ({
  disabled, value, intl, sm, classes,
}) => (
  <input
    data-testid="submitWrapper"
    disabled={disabled}
    type="submit"
    className={`${styles.submit} ${sm ? styles['submit--sm'] : ''} ${classes || ''} cursor-pointer block bg-mountainMeadow rounded text-white`}
    value={intl.formatMessage({
      id: value,
    })}
  />
)

BaseSubmit.propTypes = {
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  value: PropTypes.string,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }),
  sm: PropTypes.bool,
  classes: PropTypes.string,
}

export default injectIntl(BaseSubmit)
