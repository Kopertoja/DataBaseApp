import React, {useState} from 'react'

export default function CreateNewTransaction(props) {
    const initialFormData = Object.freeze({
        customerId: 0,
        productId: 0,
        quantity: 0,
        transactionDate: "Date"
        
    });
    const [formTransaction, setFormData] = useState(initialFormData);
    

    const handleChange = (e) =>{
        setFormData({
            ...formTransaction,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const transactionToCreate = {
            id: 0,
            customerId: formTransaction.customerId,
            productId: formTransaction.productId,
            quantity: formTransaction.quantity,
            transactionDate: formTransaction.transactionDate
        };

        const url = "http://localhost:5144/api/Transaction";

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transactionToCreate)    
        })
        .then((response) => response.json())
        .then((responseFromServer) =>{
            console.log(responseFromServer);
            
        })
        .catch((error) => {
            console.log(error); 
            
        })

        props.onTransactionCreated(transactionToCreate);
    };

    return(
        <div>
            <form className='w-100 px-5'>
                <h1 className='mt-5'> Stwórz Nową Transakcję</h1>

                <div className='mt-5'>
                    <label className='h3 form-label'>ID Klienta</label>
                    <input value={formTransaction.customerId} name="customerId" type="number" className="form-control" onChange={handleChange}/>
                </div>

                <div className='mt-4'>
                    <label className='h3 form-label'>ID Produktu</label>
                    <input value={formTransaction.productId} name="productId" type="number" className="form-control" onChange={handleChange}/>
                </div>
                <div className='mt-5'>
                    <label className='h3 form-label'>Ilość</label>
                    <input value={formTransaction.quantity} name="quantity" type="number" className="form-control" onChange={handleChange}/>
                </div>

                <div className='mt-4'>
                    <label className='h3 form-label'>Data Transkacji</label>
                    <input value={formTransaction.transactionDate} name="transactionDate" type="datetime-local" className="form-control" onChange={handleChange}/>
                </div>

                <button onClick={handleSubmit} className='btn btn-success btn-lg w-100 mt-5'>Dodaj Transakcję</button>
                <button onClick={() => props.onTransactionCreated(null)} className='btn btn-secondary btn-lg w-100 mt-3'>Anuluj</button>

            </form>

        </div>
    )
}