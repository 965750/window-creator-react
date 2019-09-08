import '@testing-library/jest-dom/extend-expect'

import { applyMiddleware, compose, createStore } from 'redux';
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { render, cleanup } from '@testing-library/react';

import WindowRulers from './index'
import messages from '../../../../messages-i18n'
import thunk from 'redux-thunk'
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

describe('WindowRulers', () => {
  let wrapper
  const initialProps = {
    window: {
      color: '#000',
      width: 90,
      height: 180,
      doorType: 2,
      rows: [0, 1],
      columns: [0, 1],
    },
  }

  const setUp = (props = initialProps) => {
    wrapper = renderWithRedux(
      <IntlProvider
        locale="en"
        messages={messages[store.getState().theme.lang]}
      >
        <WindowRulers {...props} />
      </IntlProvider>,
    )
  }

  afterEach(cleanup)

  it('should match snapshot', () => {
    setUp()

    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should match when doorType is 1', () => {
    setUp({
      window: {
        ...initialProps.window,
        doorType: 1,
      }
    })

    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
