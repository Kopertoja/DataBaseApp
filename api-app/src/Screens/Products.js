import React, { useState} from 'react';
import CreateNewProduct from '../components/Product Components/CreateNewProduct';
import UpdateProduct from '../components/Product Components/UpdateProduct';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Transaction from '../Screens/TransactionScreen'

   
export default function Product(){


 const [data, setData] = useState([]);
 const [showingCreateNewProduct, setCreateNewProduct] = useState(false)
 const [productCurrentlyBeingUpdated, setProductCurrentlyBeingUpdated] = useState(null);

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
                            <a class="nav-link" href="/Products">Produkty</a>
                        </li>
                        </ul>
                    </div>
            </nav>
         <div className='row min-vh-100'>
             <div className='col d-flex flex-column justify-content-center align-items-center'>
                {(showingCreateNewProduct === false  && productCurrentlyBeingUpdated === null) && (
                    <div className='row'>
                        <h1 className='col mt-1'>Produkty</h1>
                        <div className='col mt-3'>
                            {fetchData()}
                            <button onClick={() => setCreateNewProduct(true)} className='btn btn-success btn-sm w-100'>Dodaj nowy produkt</button>
                        </div>
                    </div>

                )}
                 
                 {(data.length > 0 && showingCreateNewProduct === false && productCurrentlyBeingUpdated === null) && renderPostsTable()}
                

                 {showingCreateNewProduct && <CreateNewProduct onProductCreated ={onProductCreated}/>}

                 {productCurrentlyBeingUpdated !== null && <UpdateProduct product={productCurrentlyBeingUpdated} onProductUpdated={onProductUpdated} />}
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
                             <th scope="col">ProductID</th>
                             <th scope="col">Nazwa</th>
                             <th scope="col">Cena</th>
                             <th scope="col">Operacje</th>
                         </tr>
                     </thead>
                     <tbody>
                       {data.map((product, index) =>(
                         <tr key={product.id}>
                             <th scope="row">{product.id}</th>                           
                             <td>{product.name}</td>
                             <td>{product.price}</td>                             
                             <td>
                                 <button onClick={() =>setProductCurrentlyBeingUpdated(product)} className="btn btn-warning btn-sm mx-3 my-2">Zmień</button>
                                 <button onClick={() =>{if (window.confirm(`Czy jesteś pewny?`))deleteProduct(product.id)} } className="btn btn-danger btn-sm">Usuń</button>
                             </td>
                         </tr>
                        

                        ))}
                     </tbody>

                 </table>

                 <button onClick={() => setData([])} className='"btn btn-dark btn-lg w-100'>Wyczyść tabelę!</button>

             </div>
         );
         
}

function fetchData(){
const url = 'http://localhost:5144/api/Product/all';
    fetch(url, {
        method: 'GET',
                
    })
    .then((response) => response.json())
    .then((productFromServer) =>{
        console.log(productFromServer);
        setData(productFromServer);
        console.log(data) 
            
    })
    .catch((error) => {
        console.log(error); 
        alert(error);
    })
       
}

function deleteProduct(id)
{
    const url = "http://localhost:5144/api/Product/"+ id;

    fetch(url,{
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(responseFromServer => {
        console.log(responseFromServer);
        onProductDeleted(id);
    })
    .catch((error) => {
        console.log(error);
    });
}

function onProductCreated(createdProduct){
    setCreateNewProduct(false);
    if (createdProduct === null){
        return;
    }
    alert('Product dodany!')
    fetchData();
}

function onProductUpdated(updatedProduct)
{
    setProductCurrentlyBeingUpdated(null);

    if (updatedProduct === null)
    {
        return;
    }
    let productsCopy =[...data];

    const index = productsCopy.findIndex((productsCopyProduct, currentIndex) => {
        if (productsCopyProduct.productID === updatedProduct.productID) {
            return true;
        }
    });

    if(index !== -1 ) {
        productsCopy[index] = updatedProduct;
    }

    fetchData(productsCopy);
    
}

function onProductDeleted(deletedProductID)
{

    let productsCopy =[...data];

    const index = productsCopy.findIndex((productsCopyProduct, currentIndex) => {
        if (productsCopyProduct.id === deletedProductID) {
            return true;
        }
    });

    if(index !== -1 ) {
        productsCopy.splice(index, 1);
    }

    fetchData(productsCopy);
    
}

}

