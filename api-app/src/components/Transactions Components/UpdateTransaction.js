import React, {useState} from 'react'

export default function UpdateTransaction(props) {
    const initialFormData = Object.freeze({
        customerId: props.transaction.customerId,
        productId: props.transaction.productId,
        quantity: props.transaction.quantity,
        transactionDate: props.transaction.transactionDate
        
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

        const transactionToUpdate = {
            id: props.transaction.id,
            customerId: formTransaction.customerId,
            productId: formTransaction.productId,
            quantity: formTransaction.quantity,
            transactionDate: formTransaction.transactionDate
        };

        const url = "http://localhost:5144/api/transaction/" +props.transaction.id;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transactionToUpdate)    
        })
        .then((response) => response.json())
        .then((responseFromServer) =>{
            console.log(responseFromServer);
            
        })
        .catch((error) => {
            console.log(error); 
            
        })

        props.onTransactionUpdated(transactionToUpdate);
    };

    return(
        <div>
            <form className='w-100 px-5'>
                <h1 className='mt-5'> Zamiana Transakcji: "{props.transaction.id}".</h1>

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
                    <label className='h3 form-label'>Data Transakcji</label>
                    <input value={formTransaction.transactionDate} name="transactionDate" type="datetime-local" className="form-control" onChange={handleChange}/>
                </div>

                <button onClick={handleSubmit} className='btn btn-success btn-lg w-100 mt-5'>Zakutalizuj transackję!</button>
                <button onClick={() => props.onTransactionUpdated(null)} className='btn btn-secondary btn-lg w-100 mt-3'>Anuluj</button>

            </form>

        </div>
    )
}