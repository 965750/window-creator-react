import '@testing-library/jest-dom'

import { applyMiddleware, compose, createStore } from 'redux';
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { render, cleanup, fireEvent } from "@testing-library/react"

import LanguageSwitcher from './index'
import messages from "../../../messages-i18n"
import thunk from 'redux-thunk';
import React from 'react'

const initialStore = {
  theme: {
    lang: 'pl'
  }
}
const reducer = (state = initialStore, action) => {
  switch (action.type) {
    case 'SET_LOCAL_LANG':
      return {
        ...state,
        theme: {
          ...state.theme,
          lang: 'en'
        },
      }
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

const renderWithRedux = (component) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>)
  }
}

describe('LanguageSwitcher', () => {
  let wrapper

  beforeEach(() => {
    wrapper = renderWithRedux(
      <IntlProvider
        locale='en'
        messages={messages[store.getState().theme.lang]}
      >
        <LanguageSwitcher />
      </IntlProvider>
    )
  })

  afterEach(cleanup)

  it('should render without errors', () => {
    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should be set to pl as initial language', () => {
    wrapper.getByText(/Wybierz język/)
  })

  it('should change selected language', () => {
    const select = wrapper.getByTestId('select')

    expect(wrapper.getByText('Polski')).toBeTruthy();

    fireEvent.change(select,{ target: {value: 'en'}})

    cleanup()

    wrapper = renderWithRedux(
      <IntlProvider
        locale='en'
        messages={messages[store.getState().theme.lang]}
      >
        <LanguageSwitcher />
      </IntlProvider>
    )

    expect(wrapper.getByText('Polish')).toBeTruthy();
  })
})
