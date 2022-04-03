import {combineReducers} from 'redux'
import AuthReducer from './Reducer/ReducerAuth'
import AdminProductReducer from './Reducer/ReducerProduct'
const rootReducer = combineReducers({
    auth:AuthReducer,
    product:AdminProductReducer
});
export default rootReducer;