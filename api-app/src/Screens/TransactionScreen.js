import React, { useState} from 'react';
import CreateNewTransaction from '../components/Transactions Components/CreateNewTransaction';
import { useNavigate, Routes, Route } from 'react-router-dom';
import UpdateTransaction from '../components/Transactions Components/UpdateTransaction';
import Products from '../Screens/Products';
  
   
export default function Transaction(){
        <Routes>
            <Route path = '/Products' element={Products}/>
        </Routes>
        const navigate = useNavigate();
        const navigateToProducts = () =>{
        navigate('/Products')
        }

 const [data, setData] = useState([]);
 const [showingCreateNewTransaction, setCreateNewTransaction] = useState(false)
 const [transactionCurrentlyBeingUpdated, setTransactionCurrentlyBeingUpdated] = useState(null);

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
                {(showingCreateNewTransaction === false  && transactionCurrentlyBeingUpdated === null) && (
                    <div className='row'>
                        <h1 className='col mt-1'>Transackje</h1>
                        <div className='col mt-3'>
                            {fetchData()}
                            <button onClick={() => setCreateNewTransaction(true)} className='btn btn-success btn-sm w-10'>Stwórz nową transakcję</button>
                        </div>
                    </div>

                )}
                 
                 {(data.length > 0 && showingCreateNewTransaction === false && transactionCurrentlyBeingUpdated === null) && renderPostsTable()}

                 {showingCreateNewTransaction && <CreateNewTransaction onTransactionCreated ={onTransactionCreated}/>}

                 {transactionCurrentlyBeingUpdated !== null && <UpdateTransaction transaction={transactionCurrentlyBeingUpdated} onTransactionUpdated={onTransactionUpdated} />}
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
                             <th scope="col">ID Transakcji</th>
                             <th scope="col">ID Klienta</th>
                             <th scope="col">ID Produktu</th>
                             <th scope="col">Ilość</th>
                             <th scope="col">Data Transakcji</th>
                             <th scope="col">Operacje</th>
                         </tr>
                     </thead>
                     <tbody>
                       {data.map((transaction, index) =>(
                         <tr key={transaction.id}>
                             <th scope="row">{transaction.id}</th>
                             <td>{transaction.customerId}</td>                           
                             <td>{transaction.productId}</td>
                             <td>{transaction.quantity}</td>                             
                             <td>{transaction.transactionDate}</td>                             
                             <td>
                                 <button onClick={() =>{if (window.confirm(`Czy jesteś pewny?`))deleteTransaction(transaction.id)  } } className="btn btn-danger btn-sm">Usuń</button>
                                 <button onClick={() =>setTransactionCurrentlyBeingUpdated(transaction)} className="btn btn-warning btn-sm mx-3 my-2">Zmień</button>
                                 
                             </td>
                         </tr>
                        

                        ))}
                     </tbody>

                 </table>

             </div>
         );
         
}

function fetchData(){
const url = 'http://localhost:5144/api/Transaction/all';
    fetch(url, {
        method: 'GET',
                
    })
    .then((response) => response.json())
    .then((transactionFromServer) =>{
        console.log(transactionFromServer);
        setData(transactionFromServer);
        console.log(data) 
            
    })
    .catch((error) => {
        console.log(error); 
        alert(error);
    })
       
}

function deleteTransaction(id)
{
    const url = "http://localhost:5144/api/transaction/"+ id;

    fetch(url,{
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(responseFromServer => {
        console.log(responseFromServer);
        onTransactionDeleted(id);
    })
    .catch((error) => {
        console.log(error);
    });
}

function onTransactionCreated(createdTransaction){
    setCreateNewTransaction(false);
    if (createdTransaction === null){
        return;
    }
    alert('Transackcja dodana!')
    fetchData();
}

function onTransactionUpdated(updatedTransaction)
{
    setTransactionCurrentlyBeingUpdated(null);

    if (updatedTransaction === null)
    {
        return;
    }
    let transactionsCopy =[...data];

    const index = transactionsCopy.findIndex((transaciotnsCopyTransaction, currentIndex) => {
        if (transaciotnsCopyTransaction.transactionID === updatedTransaction.transactionID) {
            return true;
        }
    });

    if(index !== -1 ) {
        transactionsCopy[index] = updatedTransaction;
    }

    fetchData(transactionsCopy);
    
}

function onTransactionDeleted(deletedTransactionID)
{

    let transactionsCopy =[...data];

    const index = transactionsCopy.findIndex((transaciotnsCopyTransaction, currentIndex) => {
        if (transaciotnsCopyTransaction.id === deletedTransactionID) {
            return true;
        }
    });

    if(index !== -1 ) {
        transactionsCopy.splice(index, 1);
    }

    fetchData(transactionsCopy);
    
}

}

