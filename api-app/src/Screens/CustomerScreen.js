import React, { useState} from 'react';
import CreateNewCustomer from '../components/Customer Components/CreateNewCustomer';
import { useNavigate, Routes, Route } from 'react-router-dom';
import UpdateCustomer from '../components/Customer Components/UpdateCustomer';
import Products from './Products';
import Transaction from '../Screens/TransactionScreen'
  
   
export default function Customer(){

 const [data, setData] = useState([]);
 const [showingCreateNewCustomer, setCreateNewCustomer] = useState(false)
 const [customerCurrentlyBeingUpdated, setCustomerCurrentlyBeingUpdated] = useState(null);

return (
    
     <div className='container-fluid'>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">Databse App</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="/Customers">Klienci</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/Transactions">Transackje</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/Products">Produckty</a>
                        </li>
                        </ul>
                    </div>
            </nav>
         <div className=' row min-vh-100'>
            <div className='col d-flex flex-column justify-content-center align-items-center'>
                {(showingCreateNewCustomer === false  && customerCurrentlyBeingUpdated === null) && (
                    <div className='row'>
                        <h1 className='col mt-1'>Klienci</h1>
                        <div className='col mt-3'>
                            {fetchData()}                            
                            <button onClick={() => setCreateNewCustomer(true)} className='btn btn-success btn-sm w-100'>Stwórz klienta</button>
                        </div>
                    </div>

                )}
                 
                 {(data.length > 0 && showingCreateNewCustomer === false && customerCurrentlyBeingUpdated === null) && renderPostsTable()}

                 {showingCreateNewCustomer && <CreateNewCustomer onCustomerCreated ={onCustomerCreated}/>}

                 {customerCurrentlyBeingUpdated !== null && <UpdateCustomer customer={customerCurrentlyBeingUpdated} onCustomerUpdated={onCustomerUpdated} />}
             </div>
         </div>
     </div>
 );

function renderPostsTable(){ 
       return(
             <div className='table-responsive mt-5'>
                 <table className="table table-bordered border-dark">
                     <thead>
                         <tr>
                             <th scope="col">ID Klienta</th>
                             <th scope="col">Nazwa Klienta</th>
                             <th scope="col">E-mail</th>
                             <th scope="col">Telefon</th>
                             <th scope="col">Operacje</th>
                         </tr>
                     </thead>
                     <tbody>
                       {data.map((customer, index) =>(
                         <tr key={customer.id}>
                             <th scope="row">{customer.id}</th>
                             <td>{customer.name}</td>                           
                             <td>{customer.email}</td>
                             <td>{customer.phone}</td>                                                   
                             <td>
                                 <button onClick={() =>{if (window.confirm(`Czy jesteś pewny?`))deleteCustomer(customer.id)  } } className="btn btn-danger btn-sm">Usuń</button>
                                 <button onClick={() =>setCustomerCurrentlyBeingUpdated(customer)} className="btn btn-warning btn-sm mx-3 my-2">Zmień</button>
                                 
                             </td>
                         </tr>
                        

                        ))}
                     </tbody>

                 </table>

             </div>
         );
         
}

function fetchData(){
const url = 'http://localhost:5144/api/Customer/all';
    fetch(url, {
        method: 'GET',
                
    })
    .then((response) => response.json())
    .then((customerFromServer) =>{
        console.log(customerFromServer);
        setData(customerFromServer);
        console.log(data) 
            
    })
    .catch((error) => {
        console.log(error); 
        alert(error);
    })
       
}

function deleteCustomer(id)
{
    const url = "http://localhost:5144/api/customer/"+ id;

    fetch(url,{
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(responseFromServer => {
        console.log(responseFromServer);
        onCustomerDeleted(id);
    })
    .catch((error) => {
        console.log(error);
    });
}

function onCustomerCreated(createdCustomer){
    setCreateNewCustomer(false);
    if (createdCustomer === null){
        return;
    }
    alert('Klient dodany!')
    fetchData();
}

function onCustomerUpdated(updatedCustomer)
{
    setCustomerCurrentlyBeingUpdated(null);

    if (updatedCustomer === null)
    {
        return;
    }
    let customerCopy =[...data];

    const index = customerCopy.findIndex((customersCopyCustomer, currentIndex) => {
        if (customersCopyCustomer.id === updatedCustomer.id) {
            return true;
        }
    });

    if(index !== -1 ) {
        customerCopy[index] = updatedCustomer;
    }

    fetchData(customerCopy);
    
}

function onCustomerDeleted(deletedCustomerID)
{

    let customerCopy =[...data];

    const index = customerCopy.findIndex((customersCopyCustomer, currentIndex) => {
        if (customersCopyCustomer.id === deletedCustomerID) {
            return true;
        }
    });

    if(index !== -1 ) {
        customerCopy.splice(index, 1);
    }

    fetchData(customerCopy);
    
}

}

