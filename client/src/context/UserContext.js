import createDataContext from './createDataContext'

const userReducer = (state, action) => {
    switch (action.type) {
        case 'setUser':
            return {
                ...state,
                user: action.payload,
            }
        case 'setIsAuthenticated':
            return {
                ...state,
                isAuthenticated: action.payload,
            }
        case 'setX':
            return {
                ...state,
                x: action.payload,
            }
        default:
            return state
    }
}

const setUser = (dispatch) => (data) => {
    dispatch({
        type: 'setUser',
        payload: data,
    })
}

const setIsAuthenticated = (dispatch) => (data) => {
    dispatch({
        type: 'setIsAuthenticated',
        payload: data,
    })
}

const setX = (dispatch) => (data) => {
    dispatch({
        type: 'setX',
        payload: data,
    })
}

export const { Context, Provider } = createDataContext(
    userReducer, { setUser, setIsAuthenticated, setX }, {
        isAuthenticated: false,
        user: null,
        x: 3,
    }
)