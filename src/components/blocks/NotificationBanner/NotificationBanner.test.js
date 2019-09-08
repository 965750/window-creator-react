import '@testing-library/jest-dom/extend-expect'

import { applyMiddleware, compose, createStore } from 'redux';
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { render, cleanup, fireEvent } from '@testing-library/react'

import NotificationBanner from './index'
import messages from '../../../messages-i18n'
import thunk from 'redux-thunk';
import React from 'react'

const initialStore = {
  theme: {
    lang: 'pl',
    notification: {
      text: 'mockNotificationText',
      type: 'mockType'
    }
  },
}

const reducer = (state = initialStore, action) => {
  switch (action.type) {
    case 'MOCK_UPDATE_COMPONENT':
      return {
        ...state,
        theme: {
          notification: {
            text: 'mockNotificationText2',
            type: 'mockType2'
          }
        }
      }
    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        theme: {
          notification: null
        }
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

const renderWithRedux = (component) => ({
  ...render(<Provider store={store}>{component}</Provider>),
})

describe('NotificationBanner', () => {
  let wrapper
  const initialProps = {}

  const setUp = (props = initialProps) => {
    wrapper = renderWithRedux(
      <IntlProvider
        locale="en"
        messages={messages[store.getState().theme.lang]}
      >
        <NotificationBanner {...props} />
      </IntlProvider>,
    )
  }

  afterEach(cleanup)

  it('should match empty snapshot initiali', () => {
    setUp()

    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match full notification snapshot', () => {
    setUp()

    store.dispatch({
      type: 'MOCK_UPDATE_COMPONENT',
    })

    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should show up then hide notification after close button was clicked', () => {
    jest.useFakeTimers()
    setUp()

    store.dispatch({
      type: 'MOCK_UPDATE_COMPONENT',
    })

    const closeBtn = wrapper.getByTestId("closeNotification")
    fireEvent.click(closeBtn)

    jest.runOnlyPendingTimers();

    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
