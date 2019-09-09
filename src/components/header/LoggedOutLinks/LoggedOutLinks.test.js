import '@testing-library/jest-dom/extend-expect'

import { applyMiddleware, compose, createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { render, cleanup } from '@testing-library/react'

import LoggedOutLinks from './index'
import messages from '../../../messages-i18n'
import thunk from 'redux-thunk';
import React from 'react'

const initialStore = {
  theme: {
    lang: 'pl',
  },
  firebase: {
    auth: {
      email: 'mockEmail@gmail.com'
    },
    profile: {
      firstName: 'mockName',
      lastName: 'mockLastName',
      isLoaded: true,
      isEmpty: false,
      windows: [{
        id: 'mockId',
        save: {
          name: 'mockWindowName'
        }
      }]
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

const renderWithRedux = (component) => ({
  ...render(<Provider store={store}>{component}</Provider>),
})

describe('LoggedOutLinks', () => {
  let wrapper
  const initialProps = {}

  const setUp = (props = initialProps) => {
    wrapper = renderWithRedux(
      <BrowserRouter>
        <IntlProvider
          locale="en"
          messages={messages[store.getState().theme.lang]}
        >
          <LoggedOutLinks {...props} />
        </IntlProvider>
      </BrowserRouter>,
    )
  }

  afterEach(cleanup)

  it('should match snapshot', () => {
    setUp()

    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
