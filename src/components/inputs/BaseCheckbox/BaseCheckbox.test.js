import '@testing-library/jest-dom/extend-expect'

import { applyMiddleware, compose, createStore } from 'redux';
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { render, cleanup } from '@testing-library/react'

import BaseCheckbox from './index'
import messages from '../../../messages-i18n'
import thunk from 'redux-thunk';
import React from 'react'

const initialStore = {
  theme: {
    lang: 'pl',
  },
}

const reducer = (state = initialStore, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
  ),
)

const renderWithRedux = (component) => ({
  ...render(<Provider store={store}>{component}</Provider>),
})

describe('BaseCheckbox', () => {
  let wrapper
  const initialProps = {
    isChecked: false,
    classes: ''
  }

  const setUp = (props = initialProps) => {
    wrapper = renderWithRedux(
      <IntlProvider
        locale="en"
        messages={messages[store.getState().theme.lang]}
      >
        <BaseCheckbox {...props} />
      </IntlProvider>,
    )
  }

  afterEach(cleanup)

  it('should match snapshot with unchecked checkbox', () => {
    setUp()

    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should have icon inside div when checkbox is checked', () => {
    setUp({
      isChecked: true,
      classes: ''
    })

    expect(wrapper.queryByTestId('checkboxIcon')).not.toBeNull()
  })

  it('should pass classes from props to wrapper', () => {
    const mockClasses = 'mockClasses'

    setUp({
      isChecked: true,
      classes: mockClasses
    })

    expect(wrapper.queryByTestId('checkboxWrapper')).toHaveClass(mockClasses)
  })
})
