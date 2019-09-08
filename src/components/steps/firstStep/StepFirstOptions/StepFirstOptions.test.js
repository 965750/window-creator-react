import '@testing-library/jest-dom/extend-expect'

import { applyMiddleware, compose, createStore } from 'redux';
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { render, cleanup, fireEvent } from '@testing-library/react'

import StepFirstOptions from './index'
import messages from '../../../../messages-i18n'
import thunk from 'redux-thunk';
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

describe('StepFirstOptions', () => {
  let mockFunc = jest.fn()
  let wrapper
  const initialProps = {
    window: {
      color: '#000',
      width: 110,
      height: 230,
      doorType: 2,
      rows: [0, 1, 2],
      columns: [0, 1, 2],
    },
    resizeWindow: jest.fn(),
    changeWindowType: jest.fn(),
    setNotification: jest.fn(),
  }

  const setUp = (props = initialProps) => {
    wrapper = renderWithRedux(
      <IntlProvider
        locale="en"
        messages={messages[store.getState().theme.lang]}
      >
        <StepFirstOptions {...props} />
      </IntlProvider>,
    )
  }

  afterEach(cleanup)

  it('should match snapshot', () => {
    setUp()

    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should validate height input\'s maximum limit', () => {
    setUp()

    const input = wrapper.getByTestId('heightInput')

    fireEvent.change(input, {
      target: { value: 310 }
    })

    fireEvent.blur(input)
    expect(input.value).toBe("300")
  })

  it('should validate height input\'s minimum limit', () => {
    setUp()

    const input = wrapper.getByTestId('heightInput')

    fireEvent.change(input, {
      target: { value: 120 }
    })

    fireEvent.blur(input)
    expect(input.value).toBe("160")
  })

  it('should validate width input\'s maximum limit', () => {
    setUp()

    const input = wrapper.getByTestId('widthInput')

    fireEvent.change(input, {
      target: { value: 220 }
    })

    fireEvent.blur(input)
    expect(input.value).toBe("170")
  })

  it('should validate width input\'s minimum limit', () => {
    setUp()

    const input = wrapper.getByTestId('widthInput')

    fireEvent.change(input, {
      target: { value: 10 }
    })

    fireEvent.blur(input)
    expect(input.value).toBe("60")
  })
})
