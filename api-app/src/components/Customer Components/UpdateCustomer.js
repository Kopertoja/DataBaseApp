import React, {useState} from 'react'

export default function UpdateCustomer(props) {
    const initialFormData = Object.freeze({
        name: props.customer.name,
        email: props.customer.email,
        phone: props.customer.phone
        
        
    });
    const [formCustomer, setFormData] = useState(initialFormData);
    

    const handleChange = (e) =>{
        setFormData({
            ...formCustomer,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const customerToUpdate = {
            id: props.customer.id,
            name: formCustomer.name,
            email: formCustomer.email,
            phone: formCustomer.phone
            
        };

        const url = "http://localhost:5144/api/customer/" +props.customer.id;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerToUpdate)    
        })
        .then((response) => response.json())
        .then((responseFromServer) =>{
            console.log(responseFromServer);
            
        })
        .catch((error) => {
            console.log(error); 
            
        })

        props.onCustomerUpdated(customerToUpdate);
    };

    return(
        <div>
            <form className='w-100 px-5'>
                <h1 className='mt-5'> Zamiana Danych Klienta: "{props.customer.customerName} + {props.customer.id}".</h1>

               
                <div className='mt-5'>
                    <label className='h3 form-label'>Nazwa Klienta</label>
                    <input value={formCustomer.name} name="name" type="string" className="form-control" onChange={handleChange}/>
                </div>

                <div className='mt-4'>
                    <label className='h3 form-label'>E-mail</label>
                    <input value={formCustomer.email} name="email" type="string" className="form-control" onChange={handleChange}/>
                </div>
                <div className='mt-5'>
                    <label className='h3 form-label'>Telefon</label>
                    <input value={formCustomer.phone} name="phone" type="number" className="form-control" onChange={handleChange}/>
                </div>

                <button onClick={handleSubmit} className='btn btn-success btn-lg w-100 mt-5'>Zakutalizuj dane!</button>
                <button onClick={() => props.onTransactionUpdated(null)} className='btn btn-secondary btn-lg w-100 mt-3'>Anuluj</button>

            </form>

        </div>
    )
}