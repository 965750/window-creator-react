import '@testing-library/jest-dom/extend-expect'

import { applyMiddleware, compose, createStore } from 'redux';
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { render, cleanup } from '@testing-library/react'

import Creator from './index'
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
    colorBoxes: [
      {
        id: '1',
        color: '#000',
        label: 'Black',
        active: true,
      },
      {
        id: '2',
        color: '#797474',
        label: 'Gray',
        active: false,
      },
      {
        id: '3',
        color: '#f4f2f2',
        label: 'White',
        active: false,
      },
      ]
  },
  firebase: {
    auth: {
      uid: 'mockUid'
    }
  }
}

const reducer = (state = initialStore, action) => {
  switch (action.type) {
    case 'MOCK_CHANGE_STEP':
      return {
        ...state,
        theme: {
          ...state.theme,
          stepper: {
            ...state.theme.stepper,
            active: action.step,
          }
        }
      }
    case 'MOCK_LOGOUT':
      return {
        ...state,
        firebase: {
          auth: {
            uid: null,
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

describe('Creator', () => {
  let wrapper
  const initialProps = {}

  const setUp = (props = initialProps) => {
    wrapper = renderWithRedux(
      <BrowserRouter>
        <IntlProvider
          locale="en"
          messages={messages[store.getState().theme.lang]}
        >
          <Creator {...props} />
        </IntlProvider>
      </BrowserRouter>,
    )
  }

  afterEach(cleanup)

  it('should match snapshot', () => {
    setUp()

    expect(wrapper.asFragment()).toMatchSnapshot()
  })


  it('should have second options component when active step is 2', () => {
    setUp()

    store.dispatch({
      type: 'MOCK_CHANGE_STEP',
      step: 2,
    })

    expect(wrapper.getByText('Podział drzwi')).not.toBeNull()
  })

  it('should have second options component when active step is 3', () => {
    setUp()

    store.dispatch({
      type: 'MOCK_CHANGE_STEP',
      step: 3,
    })

    expect(wrapper.getByText('Zapisz projekt')).not.toBeNull()
  })

  it('should redirect when user is NOT logged in', () => {
    setUp()

    store.dispatch({
      type: 'MOCK_LOGOUT',
    })

    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
