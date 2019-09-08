import '@testing-library/jest-dom/extend-expect'

import { applyMiddleware, compose, createStore } from 'redux';
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { render, cleanup } from '@testing-library/react'

import StepThirdOptions from './index'
import messages from '../../../../messages-i18n'
import thunk from 'redux-thunk'
import React from 'react'

const initialStore = {
  theme: {
    lang: 'pl',
  },
  creator: {
    colorBoxes: [{
      id: 'mockId',
      color: 'red',
      active: false,
      label: 'Black'
    }],
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

describe('StepThirdOptions', () => {
  let wrapper
  const initialProps = {
    data: {
      id: 'mockId',
      color: 'red',
      active: false,
      label: 'Black'
    }
  }

  const setUp = (props = initialProps) => {
    wrapper = renderWithRedux(
      <IntlProvider
        locale="en"
        messages={messages[store.getState().theme.lang]}
      >
        <StepThirdOptions {...props} />
      </IntlProvider>,
    )
  }

  afterEach(cleanup)

  it('should match snapshot', () => {
    setUp()

    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
