import '@testing-library/jest-dom/extend-expect'

import { applyMiddleware, compose, createStore } from 'redux';
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import {render, cleanup, fireEvent} from '@testing-library/react';

import StepBox from './index'
import messages from '../../../../messages-i18n'
import thunk from 'redux-thunk'
import React from 'react'

const initialStore = {
  theme: {
    lang: 'pl',
  },
  creator: {
    stepper: {
      active: 1
    }
  }
}

const reducer = (state = initialStore, action) => {
  switch (action.type) {
    case 'CHANGE_STEP':
      return {
        ...state,
        creator: {
          stepper: {
            active: action.step
          }
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

describe('StepBox', () => {
  let wrapper
  const initialProps = {
    step: {
      title: 'mockTitle',
      label: 'mockLabel',
      id: 7,
    },
    active: false,
  }

  const setUp = (props = initialProps) => {
    wrapper = renderWithRedux(
      <IntlProvider
        locale="en"
        messages={messages[store.getState().theme.lang]}
      >
        <StepBox {...props} />
      </IntlProvider>,
    )
  }

  afterEach(cleanup)

  it('should match snapshot', () => {
    setUp()

    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should have gullGray background and white dot inside when step is active', () => {
    setUp({
      ...initialProps,
      active: true
    })

    expect(wrapper.queryByTestId('stepBoxCircle')).toHaveClass('bg-gullGray')
    expect(wrapper.queryByTestId('stepBoxDot')).toHaveClass('bg-white')
  })

  it('should call dispatch action to change step', () => {
    setUp()

    expect(store.getState().creator.stepper.active).toBe(1)

    fireEvent.click(wrapper.queryByTestId('stepBoxCircle'))

    expect(store.getState().creator.stepper.active).toBe(7)
  })
})
