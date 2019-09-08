import '@testing-library/jest-dom'

import { applyMiddleware, compose, createStore } from 'redux';
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { render, cleanup, fireEvent } from '@testing-library/react'

import LoadWindow from './index'
import messages from '../../../messages-i18n'
import thunk from 'redux-thunk';
import React from 'react'

const initialStore = {
  theme: {
    lang: 'pl',
  },
  firebase: {
    profile: {
      windows: [{
        id: 'idMock'
      }],
    },
    auth: {
      uid: 'uidMock',
    }
  },
  notification: null
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

describe('LoadWindow', () => {
  let wrapper
  const initialProps = {
    window: {
      save: {
        name: 'mockName',
        time: 123
      },
      id: 'idMock'
    },
    loadWindow: jest.fn(),
    isLast: true,
    removeWindowSave: jest.fn(),
  }

  const setUp = (props = initialProps) => {
    wrapper = renderWithRedux(
      <IntlProvider
        locale="en"
        messages={messages[store.getState().theme.lang]}
      >
        <LoadWindow {...props} />
      </IntlProvider>,
    )
  }

  afterEach(cleanup)

  it('should match snapshot', () => {
    setUp()

    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should have border classes on wrapper', () => {
    setUp({...initialProps, isLast: false})

    const wrapperDiv = wrapper.getByTestId('wrapper')

    expect(wrapperDiv.classList.contains('border-b')).toBe(true)
  })
})
