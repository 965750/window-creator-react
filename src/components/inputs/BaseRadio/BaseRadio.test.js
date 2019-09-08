import '@testing-library/jest-dom/extend-expect'

import { applyMiddleware, compose, createStore } from 'redux';
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { render, cleanup } from '@testing-library/react'

import BaseRadio from './index'
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

describe('BaseRadio', () => {
  let wrapper
  const initialProps = {
    isChecked: false,
  }

  const setUp = (props = initialProps) => {
    wrapper = renderWithRedux(
      <IntlProvider
        locale="en"
        messages={messages[store.getState().theme.lang]}
      >
        <BaseRadio {...props} />
      </IntlProvider>,
    )
  }

  afterEach(cleanup)

  it('should match snapshot', () => {
    setUp()

    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should pass classes from props to wrapper', () => {
    const mockClasses = 'mockClasses'

    setUp({
      ...initialProps,
      classes: mockClasses,
    })

    expect(wrapper.queryByTestId('radioWrapper')).toHaveClass(mockClasses)
  })

  it('should show inner dot when checked', () => {
    setUp({
      isChecked: true
    })

    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
