import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { reducer as reduxFormReducer } from 'redux-form';
import thunk from "redux-thunk";
import appReducers from 'Redux/Reducers';
import Api from 'Api';

//Configuración del store de redux
export default () => {

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(
        combineReducers({
            ...appReducers,
            form: reduxFormReducer
        }),
        composeEnhancers( applyMiddleware(thunk.withExtraArgument(Api)) ),//Uno de los argumentos a trabajar con thunk de forma asincrona es la API (Firebase)
    )
}