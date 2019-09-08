import '@testing-library/jest-dom/extend-expect'

import { applyMiddleware, compose, createStore } from 'redux';
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { render, cleanup } from '@testing-library/react'

import BaseSubmit from './index'
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

describe('BaseSubmit', () => {
  let wrapper
  const initialProps = {
    disabled: true,
    value: 'Login'
  }

  const setUp = (props = initialProps) => {
    wrapper = renderWithRedux(
      <IntlProvider
        locale="en"
        messages={messages[store.getState().theme.lang]}
      >
        <BaseSubmit {...props} />
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

    expect(wrapper.queryByTestId('submitWrapper')).toHaveClass(mockClasses)
  })

  it('should get class when sm prop was added', () => {
    setUp({
      ...initialProps,
      sm: true,
    })

    expect(wrapper.queryByTestId('submitWrapper')).toHaveClass('submit--sm')
  })
})
