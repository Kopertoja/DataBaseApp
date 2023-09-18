import React, {useState} from 'react'

export default function CreateNewProduct(props) {
    const initialFormData = Object.freeze({
        nazwa: "Nazwa",
        cena: 0
    });
    const [formProduct, setFormData] = useState(initialFormData);
    

    const handleChange = (e) =>{
        setFormData({
            ...formProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const productToCreate = {
            productID: 0,
            name: formProduct.nazwa,
            price: formProduct.cena
        };

        const url = "http://localhost:5144/api/Product";

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productToCreate)    
        })
        .then((response) => response.json())
        .then((responseFromServer) =>{
            console.log(responseFromServer);
            
        })
        .catch((error) => {
            console.log(error); 
            
        })

        props.onProductCreated(productToCreate);
    };

    return(
        <div>
            <form className='w-100 px-5'>
                <h1 className='mt-5'> Create New Product</h1>

                <div className='mt-5'>
                    <label className='h3 form-label'>Nazwa Produktu</label>
                    <input value={formProduct.nazwa} name="nazwa" type="text" className="form-control" onChange={handleChange}/>
                </div>

                <div className='mt-4'>
                    <label className='h3 form-label'>Cena</label>
                    <input value={formProduct.cena} name="cena" type="number" className="form-control" onChange={handleChange}/>
                </div>

                <button onClick={handleSubmit} className='btn btn-success btn-lg w-100 mt-5'>Dodaj produkt!</button>
                <button onClick={() => props.onProductCreated(null)} className='btn btn-secondary btn-lg w-100 mt-3'>Anuluj</button>

            </form>

        </div>
    )
}