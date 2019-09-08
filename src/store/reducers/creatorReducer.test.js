import creatorReducer from './creatorReducer'


describe('Creator Reducer', () => {
  let mockedState

  beforeEach(() => {
    mockedState = {
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
      ],
      window: {
        color: '#000',
        width: 110,
        height: 230,
        doorType: 2,
        rows: [0, 1, 2],
        columns: [0, 1, 2],
      },
    }
  })

  it('should return resized window', () => {
    const size = {
      id: 'height',
      height: 100
    }
    const newState = creatorReducer(mockedState, {
      type: 'RESIZE_WINDOW',
      size
    })

    expect(newState).toEqual({
      ...mockedState,
      window: {
        ...mockedState.window,
        height: size.height,
      }
    })
  })

  it('should return new door type', () => {
    const doorType = 1
    const newState = creatorReducer(mockedState, {
      type: 'SET_DOOR_TYPE',
      doorType,
    })

    expect(newState).toEqual({
      ...mockedState,
      window: {
        ...mockedState.window,
        doorType,
      }
    })
  })

  it('should return new window', () => {
    const window = {
      color: '#333',
        width: 210,
        height: 250,
        doorType: 1,
        rows: [1],
        columns: [0, 1],
    }
    const newState = creatorReducer(mockedState, {
      type: 'SET_WINDOW',
      window,
    })

    expect(newState).toEqual({
      ...mockedState,
      window,
    })
  })

  it('should return updated door division', () => {
    const id = 'rows'
    const value = 1

    const newState = creatorReducer(mockedState, {
      type: 'SET_DOOR_DIVISION',
      id,
      value,
    })

    expect(newState).toEqual({
      ...mockedState,
      window: {
        ...mockedState.window,
        [id]: [0, 1, 2 , 3]
      }
    })
  })

  it('should return changed box color', () => {
    const localBoxes = [
      {
        id: '1',
        color: '#000',
        label: 'Black',
        active: false,
      },
      {
        id: '2',
        color: '#797474',
        label: 'Gray',
        active: true,
      },
      {
        id: '3',
        color: '#f4f2f2',
        label: 'White',
        active: false,
      },
    ]

    const id = '2'
    const color = '#005dff'

    const newState = creatorReducer(mockedState, {
      type: 'CHANGE_COLOR_BOX',
      id,
      color,
    })

    expect(newState).toEqual({
      ...mockedState,
      window: {
        ...mockedState.window,
        color,
      },
      colorBoxes: localBoxes,
    })
  })
})