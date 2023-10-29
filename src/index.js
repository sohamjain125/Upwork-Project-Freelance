import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Routes,Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import './setupEnv'; // Import the setupEnv.js file23xd
// font awsome:
import 'font-awesome/css/font-awesome.min.css';
import YourComponent from './Pages/Invoice/YourComponent';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import ClientsMgr from './Pages/ClientsMgr';
// import UserMgr from './Pages/ClientsMgr';
import ProviderMgr from './Pages/ProviderMgr';
import Products from './Pages/Products';
import Stock from './Pages/Stock';
import SalesMgr from './Pages/SalesMgr';
import UserMgr from './Pages/UserMgr';
import WorkersMgr from './Pages/WorkersMgr';
import RegistrationPage from './Pages/Register';
import UserProfile from './components/profile/UserProfile';
import Invoice from './Pages/Invoice';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/clients" element={<ClientsMgr />}/>
        {/* <Route path="/user" element={<UserMgr/>} /> */}
        <Route path="/Providers" element={<ProviderMgr/>} />
        <Route path="/Products" element={<Products/>} />
        <Route path="/Stock" element={<Stock/>} />
        <Route path="/Sales" element={<SalesMgr/>} />
        <Route path="/User" element={<UserMgr/>} />
        <Route path="/Workers" element={<WorkersMgr/>} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/profile" element={<UserProfile />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
