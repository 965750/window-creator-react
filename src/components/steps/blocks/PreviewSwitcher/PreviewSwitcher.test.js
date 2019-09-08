import '@testing-library/jest-dom/extend-expect'

import { applyMiddleware, compose, createStore } from 'redux';
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { render, cleanup } from '@testing-library/react'

import PreviewSwitcher from './index'
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

describe('PreviewSwitcher', () => {
  let wrapper
  const initialProps = {}

  const setUp = (props = initialProps) => {
    wrapper = renderWithRedux(
      <IntlProvider
        locale="en"
        messages={messages[store.getState().theme.lang]}
      >
        <PreviewSwitcher {...props} />
      </IntlProvider>,
    )
  }

  afterEach(cleanup)

  it('should match snapshot', () => {
    setUp()

    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should show active 3D button when interiorPreview is active', () => {
    setUp({
      interiorPreview: true
    })

    expect(wrapper.queryByTestId('previewSwitcher3d')).toHaveClass('border-2 bg-white')
  })

  it('should show active 2D button when interiorPreview is NOT active', () => {
    setUp({
      interiorPreview: false
    })

    expect(wrapper.queryByTestId('previewSwitcher2d')).toHaveClass('border-2 bg-white')
  })
})
