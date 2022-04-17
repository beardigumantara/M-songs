import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './components/store';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { Provider } from 'react-redux';


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ChakraProvider>
                <Box w='100%' h='100' bgGradient='linear(to-b, #d874d8, #252525)'>
                    <App />
                </Box>
            </ChakraProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
