import '@testing-library/jest-dom/extend-expect'

import { applyMiddleware, compose, createStore } from 'redux';
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { render, cleanup } from '@testing-library/react'

import PasswordStrength from './index'
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

describe('PasswordStrength', () => {
  let wrapper
  const initialProps = {
    password: ''
  }

  const setUp = (props = initialProps) => {
    wrapper = renderWithRedux(
      <IntlProvider
        locale="en"
        messages={messages[store.getState().theme.lang]}
      >
        <PasswordStrength {...props} />
      </IntlProvider>,
    )
  }

  afterEach(cleanup)

  it('should match snapshot', () => {
    setUp()

    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should check password strength of 10%', () => {
    setUp({
      password: 'asd'
    })

    expect(wrapper.getByTestId('passwordStrength')).toHaveStyle(`width: 90%`)
    expect(wrapper.queryByText(/Słabe/)).not.toBeNull()
  })

  it('should check password strength of 20%', () => {
    setUp({
      password: 'Asd'
    })

    expect(wrapper.getByTestId('passwordStrength')).toHaveStyle(`width: 80%`)
    expect(wrapper.queryByText(/Słabe/)).not.toBeNull()
  })

  it('should check password strength of 45%', () => {
    setUp({
      password: 'Asd1'
    })

    expect(wrapper.getByTestId('passwordStrength')).toHaveStyle(`width: 55%`)
    expect(wrapper.queryByText(/Średnie/)).not.toBeNull()
  })

  it('should check password strength of 75%', () => {
    setUp({
      password: 'Asd1#'
    })

    expect(wrapper.getByTestId('passwordStrength')).toHaveStyle(`width: 25%`)
    expect(wrapper.queryByText(/Dobre/)).not.toBeNull()
  })

  it('should check password strength of 100%', () => {
    setUp({
      password: '123456789Asd1#'
    })

    expect(wrapper.getByTestId('passwordStrength')).toHaveStyle(`width: 0%`)
    expect(wrapper.queryByText(/Dobre/)).not.toBeNull()
  })
})
