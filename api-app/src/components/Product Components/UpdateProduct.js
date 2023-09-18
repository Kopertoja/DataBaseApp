import React, {useState} from 'react'

export default function UpdateProduct(props) {
    const initialFormData = Object.freeze({
        nazwa: props.product.name,
        cena: props.product.price
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

        const productToUpdate = {
            productID: props.product.productID,
            name: formProduct.nazwa,
            price: formProduct.cena
        };

        const url = "http://localhost:5144/api/Product/" +props.product.id;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productToUpdate)    
        })
        .then((response) => response.json())
        .then((responseFromServer) =>{
            console.log(responseFromServer);
            
        })
        .catch((error) => {
            console.log(error); 
            alert(error);
        })

        props.onProductUpdated(productToUpdate);
    };

    return(
        <div>
            <form className='w-100 px-5'>
                <h1 className='mt-5'> Zmiana "{props.product.name}".</h1>

                <div className='mt-5'>
                    <label className='h3 form-label'>Nazwa Produktu</label>
                    <input value={formProduct.nazwa} name="nazwa" type="text" className="form-control" onChange={handleChange}/>
                </div>

                <div className='mt-4'>
                    <label className='h3 form-label'>Cena</label>
                    <input value={formProduct.cena} name="cena" type="number" className="form-control" onChange={handleChange}/>
                </div>

                <button onClick={handleSubmit} className='btn btn-success btn-lg w-100 mt-5'>Zakutalizuj produkt!</button>
                <button onClick={() => props.onProductUpdated(null)} className='btn btn-secondary btn-lg w-100 mt-3'>Anuluj</button>

            </form>

        </div>
    )
}