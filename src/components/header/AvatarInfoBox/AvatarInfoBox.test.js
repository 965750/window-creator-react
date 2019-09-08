import '@testing-library/jest-dom/extend-expect'

import { applyMiddleware, compose, createStore } from 'redux';
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { render, cleanup, fireEvent } from '@testing-library/react'

import AvatarInfoBox from './index'
import messages from '../../../messages-i18n'
import thunk from 'redux-thunk';
import React from 'react'

const initialStore = {
  theme: {
    lang: 'pl',
  },
  firebase: {
    auth: {
      email: 'mockEmail@gmail.com'
    },
    profile: {
      firstName: 'mockName',
      lastName: 'mockLastName',
      isLoaded: true,
      isEmpty: false,
      windows: [{
        id: 'mockId',
        save: {
          name: 'mockWindowName'
        }
      }]
    }
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

describe('AvatarInfoBox', () => {
  let wrapper
  const initialProps = {}

  const setUp = (props = initialProps) => {
    wrapper = renderWithRedux(
      <IntlProvider
        locale="en"
        messages={messages[store.getState().theme.lang]}
      >
        <AvatarInfoBox {...props} />
      </IntlProvider>,
    )
  }

  afterEach(cleanup)

  it('should match snapshot', () => {
    setUp()

    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should have informations about user in opened box', () => {
    setUp()

    const avatar = wrapper.getByTestId('avatar')
    fireEvent.click(avatar)

    expect(wrapper.asFragment()).toMatchSnapshot()
  })

  it('should compose initials for avatar from user\'s firstName and lastName', () => {
    setUp()

    expect(wrapper.queryByText('mm')).not.toBeNull()
  })

  it('should be able to open box then close it', () => {
    setUp()

    const avatar = wrapper.getByTestId('avatar')

    fireEvent.click(avatar)
    expect(wrapper.queryByTestId('avatarInfoBox')).not.toBeNull()

    fireEvent.click(avatar)
    expect(wrapper.queryByTestId('avatarInfoBox')).toBeNull()
  })
})
