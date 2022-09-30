import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import edit from '../Reducer';

const store = createStore(
    edit,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
