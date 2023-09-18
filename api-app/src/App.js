import React, { useState } from 'react';
import Login from './Screens/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Transaction from './Screens/TransactionScreen';
import Products from './Screens/Products';
import Customer from './Screens/CustomerScreen';

export default function App() { 

  return (
   <Router>
      <Routes>
        <Route path= "/" exact Component={Login} />
        <Route path= "/Transactions" exact Component={Transaction} />
        <Route path= "/Products" exact Component={Products} />
        <Route path= "/Customers" exact Component={Customer} />
      </Routes>
   </Router>

  )
}


