import {createStore,compose,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducer'

const middleware = applyMiddleware(thunk);

const store = createStore(rootReducer,compose(middleware));

export default store;