import '@testing-library/jest-dom'

import { applyMiddleware, compose, createStore } from 'redux';
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { render, cleanup } from "@testing-library/react"

import Navbar from './index'
import messages from "../../../messages-i18n"
import thunk from 'redux-thunk';
import React from 'react'

const initialStore = {
  theme: {
    lang: 'pl'
  },
  firebase: {
    profile: {
      windows: [1, 2, 3],
    }
  }
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

const renderWithRedux = (component) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>)
  }
}

describe('Navbar', () => {
  let wrapper
  const initialProps = {
    auth: {
      isEmpty: false
    }
  }

  const setUp = (props = initialProps) => {
    wrapper = renderWithRedux(
      <IntlProvider
        locale='en'
        messages={messages[store.getState().theme.lang]}
      >
        <Navbar {...props}/>
      </IntlProvider>
    )
  }

  afterEach(cleanup)

  it('should match logged in snapshot', () => {
    setUp()

    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match logged out snapshot', () => {
    setUp({
      auth: {
        isEmpty: true
      }
    })

    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
