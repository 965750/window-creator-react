import '@testing-library/jest-dom/extend-expect'

import { applyMiddleware, compose, createStore } from 'redux';
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { render, cleanup, fireEvent } from '@testing-library/react';

import StepperNavigation from './index'
import messages from '../../../../messages-i18n'
import thunk from 'redux-thunk'
import React from 'react'

const initialStore = {
  theme: {
    lang: 'pl',
    stepper: {
      steps: [
        {
          label: 'Step 1',
          title: 'Choose Door',
          id: 1,
        },
        {
          label: 'Step 2',
          title: 'Choose Door',
          id: 2,
        },
      ],
      active: 2
    }
  },
}

const reducer = (state = initialStore, action) => {
  switch (action.type) {
    case 'CHANGE_STEP':
      return {
        ...state,
        theme: {
          stepper: {
            active: action.step
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

describe('StepperNavigation', () => {
  let wrapper
  const initialProps = {}

  const setUp = (props = initialProps) => {
    wrapper = renderWithRedux(
      <IntlProvider
        locale="en"
        messages={messages[store.getState().theme.lang]}
      >
        <StepperNavigation {...props} />
      </IntlProvider>,
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

  it('should increment step by 1 on button click', () => {
    setUp()

    expect(store.getState().theme.stepper.active).toBe(2)

    fireEvent.click(wrapper.queryByTestId('nextStepBtn'))

    expect(store.getState().theme.stepper.active).toBe(3)
  })

  it('should decrement step by 1 on button click', () => {
    setUp()

    expect(store.getState().theme.stepper.active).toBe(2)

    fireEvent.click(wrapper.queryByTestId('prevStepBtn'))

    expect(store.getState().theme.stepper.active).toBe(1)
  })

  it('should NOT show prevStepBtn when first step is active', () => {
    setUp()

    expect(store.getState().theme.stepper.active).toBe(2)

    fireEvent.click(wrapper.queryByTestId('prevStepBtn'))

    expect(wrapper.queryByTestId('prevStepBtn')).toBeNull()
  })

  it('should NOT show nextStepBtn when last step is active', () => {
    setUp()

    expect(store.getState().theme.stepper.active).toBe(2)

    fireEvent.click(wrapper.queryByTestId('nextStepBtn'))

    expect(wrapper.queryByTestId('nextStepBtn')).toBeNull()
  })
})
