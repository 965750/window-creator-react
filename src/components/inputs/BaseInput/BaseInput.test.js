import '@testing-library/jest-dom/extend-expect'

import { applyMiddleware, compose, createStore } from 'redux';
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { render, cleanup } from '@testing-library/react'

import BaseInput from './index'
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

describe('BaseInput', () => {
  let wrapper
  const initialProps = {
    handleChange: jest.fn(),
    validationError: jest.fn(),
    value: '',
    placeholder: 'First name',
    id: 'mockId',
    type: 'text',
    classes: '',
    valueToMatch: '',
    toValidate: ['']
  }

  const setUp = (props = initialProps) => {
    wrapper = renderWithRedux(
      <IntlProvider
        locale="en"
        messages={messages[store.getState().theme.lang]}
      >
        <BaseInput {...props} />
      </IntlProvider>,
    )
  }

  afterEach(cleanup)

  it('should match snapshot', () => {
    setUp()

    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should check validation for too long value', () => {
    setUp({
      ...initialProps,
      toValidate: ['tooLong'],
      value: '123456789',
    })

    expect(wrapper.queryByText(/Nazwa musi być krótsza/)).toBeNull()

    cleanup()

    setUp({
      ...initialProps,
      toValidate: ['tooLong'],
      value: '123456789asdf',
    })

    expect(wrapper.queryByText(/Nazwa musi być krótsza/)).not.toBeNull()
  })

  it('should check validation for too short password', () => {
    setUp({
      ...initialProps,
      toValidate: ['passwordLength'],
      value: '123456789',
    })

    expect(wrapper.queryByText(/Hasło jest za krótkie/)).toBeNull()

    cleanup()

    setUp({
      ...initialProps,
      toValidate: ['passwordLength'],
      type: 'password',
      value: '123456',
    })

    expect(wrapper.queryByText(/Hasło jest za krótkie/)).not.toBeNull()
  })

  it('should check validation for matching password', () => {
    setUp({
      ...initialProps,
      toValidate: ['match'],
      value: '12345678',
      valueToMatch: '12345678',
    })

    expect(wrapper.queryByText(/Hasła nie są identyczne/)).toBeNull()

    cleanup()

    setUp({
      ...initialProps,
      toValidate: ['match'],
      type: 'password',
      value: '12345678',
      valueToMatch: '1234567'
    })

    expect(wrapper.queryByText(/Hasła nie są identyczne/)).not.toBeNull()
  })

  it('should check validation for valid email address', () => {
    setUp({
      ...initialProps,
      toValidate: ['email'],
      value: 'email@gmail.com'
    })

    expect(wrapper.queryByText(/Niewłaściwy adres email/)).toBeNull()

    cleanup()

    setUp({
      ...initialProps,
      toValidate: ['email'],
      type: 'text',
      value: 'email@emial',
    })

    expect(wrapper.queryByText(/Niewłaściwy adres email/)).not.toBeNull()
  })

  it('should pass classes from props to wrapper', () => {
    const mockClasses = 'mockClasses'

    setUp({
      ...initialProps,
      type: 'text',
      classes: mockClasses
    })

    expect(wrapper.queryByTestId('inputWrapper')).toHaveClass(mockClasses)
  })
})
