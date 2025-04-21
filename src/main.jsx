import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './store.js';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <div className='max-w-[1380px] mx-auto'>
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
  </div>
);
