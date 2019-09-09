import '@testing-library/jest-dom/extend-expect'

import { BrowserRouter } from 'react-router-dom'
import { applyMiddleware, compose, createStore } from 'redux';
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { render, cleanup, fireEvent } from '@testing-library/react';

import Register from './index'
import messages from '../../messages-i18n'
import thunk from 'redux-thunk';
import React from 'react'

const initialStore = {
  theme: {
    lang: 'pl',
    stepper: {
      active: 1,
      steps: [
        {
          label: 'Step 1',
          title: 'Choose Door',
          id: 1,
        },
        {
          label: 'Step 2',
          title: 'Choose Door Division',
          id: 2,
        },
        {
          label: 'Step 3',
          title: 'Choose Color',
          id: 3,
        },
      ],
    }
  },
  creator: {
    window: {
      color: '#000',
      width: 110,
      height: 230,
      doorType: 2,
      rows: [0, 1, 2],
      columns: [0, 1, 2],
    },
  },
  firebase: {
    auth: {
      uid: null,
    }
  }
}

const reducer = (state = initialStore, action) => {
  switch (action.type) {
    case 'MOCK_LOGIN':
      return {
        ...state,
        firebase: {
          auth: {
            uid: 'mockUid',
          }
        }
      }
    case 'RESET_STORE':
      return initialStore
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

describe('Register', () => {
  let wrapper
  const initialProps = {}

  const setUp = (props = initialProps) => {
    wrapper = renderWithRedux(
      <BrowserRouter>
        <IntlProvider
          locale="en"
          messages={messages[store.getState().theme.lang]}
        >
          <Register {...props} />
        </IntlProvider>
      </BrowserRouter>,
    )
  }

  afterEach(() => {
    cleanup

    store.dispatch({
      type: 'RESET_STORE',
    })
  })

  it('should match snapshot', () => {
    setUp()

    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should redirect when user is logged in', () => {
    setUp()

    store.dispatch({
      type: 'MOCK_LOGIN',
    })

    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should enable submit button after correctly filling form', () => {
    setUp()

    expect(wrapper.getByTestId('submitWrapper').disabled).toBe(true)

    fireEvent.change(wrapper.getByPlaceholderText('Adres Email'), { target: { value: 'mockedEmail@gmail.com' }})
    fireEvent.change(wrapper.getByPlaceholderText('Hasło'), { target: { value: 'mockPassword' }})
    fireEvent.change(wrapper.getByPlaceholderText('Powtórz hasło'), { target: { value: 'mockPassword' }})
    fireEvent.change(wrapper.getByPlaceholderText('Imie'), { target: { value: 'mockName' }})
    fireEvent.change(wrapper.getByPlaceholderText('Nazwisko'), { target: { value: 'mockLastName' }})

    expect(wrapper.getByTestId('submitWrapper').disabled).toBe(false)
  })
})
