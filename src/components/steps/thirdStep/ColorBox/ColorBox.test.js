import '@testing-library/jest-dom/extend-expect'

import { applyMiddleware, compose, createStore } from 'redux';
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { render, cleanup } from '@testing-library/react'

import ColorBox from './index'
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

describe('ColorBox', () => {
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
        <ColorBox {...props} />
      </IntlProvider>,
    )
  }

  afterEach(cleanup)

  it('should match snapshot', () => {
    setUp()

    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should be checked when is active has been passed', () => {
    setUp({
      ...initialProps,
      data: {
        ...initialProps.data,
        active: true,
      }
    })

    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should pass classes from props to wrapper', () => {
    const mockClasses = 'mockClasses'

    setUp({
      ...initialProps,
      classes: mockClasses,
    })

    expect(wrapper.queryByTestId('colorBoxWrapper')).toHaveClass(mockClasses)
  })
})
