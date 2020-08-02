import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from 'App';
import storeConfig from 'Config/Redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'asset/general.scss';

//Configuración del store de redux
const store = storeConfig();

const renderApp = Component => (
    // Provee el manejo del storage de redux
    <Provider store={store}>
        {/* Nos provee del manejo de rutas  */}
        <BrowserRouter>
            <Component />
        </BrowserRouter>
    </Provider>
);

ReactDom.render(renderApp(App), document.getElementById('root'));