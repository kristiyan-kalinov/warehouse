import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './ProductForm.scss';
import { getLoggedUser } from '../../../utils/http-utils/user-requests';
import { getProductById, saveProduct, Category } from '../../../utils/http-utils/product-requests';
import { useNavigate, useParams } from 'react-router-dom';

export function ProductForm() {

    const loggedUser = getLoggedUser();
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        file: '',
        buyPrice: '',
        sellPrice: '',
        count: '',
        category: ''
    });

    useEffect(() => {
        if (params.id) {
            getProductById(params.id).then(response => {
                setProduct(response.data);
            });
        }        
    }, [params.id])

    const onFormSubmit = (event) => {
        event.preventDefault();

        saveProduct(product).then(() => {
            console.log('Success');
            navigate('/products-list');
        });
    }

    const onInputChange = (event) => {        
        let value = event.target.value;

        setProduct((prevState) => {
            return {
                ...prevState,
                [event.target.name]: value
            }
        })
    }

    return (
        <div className="product-form-wrapper">
            <Form onSubmit={onFormSubmit}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="name" value={product.name} onChange={onInputChange} autoComplete="off" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter description" name="description" value={product.description} onChange={onInputChange} autoComplete="off" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Picture</Form.Label>
                    <Form.Control type="text" placeholder="Enter picture url" name="file" value={product.file} onChange={onInputChange} autoComplete="off" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Buy Price</Form.Label>
                    <Form.Control type="number" placeholder="Enter buy price" name="buyPrice" value={product.buyPrice} onChange={onInputChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Sell Price</Form.Label>
                    <Form.Control type="number" placeholder="Enter sell price" name="sellPrice" value={product.sellPrice} onChange={onInputChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Count</Form.Label>
                    <Form.Control type="number" placeholder="Enter count" name="count" value={product.count} onChange={onInputChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Category</Form.Label>
                    <Form.Select placeholder="Select category" name="category" value={product.category} onChange={onInputChange}> 
                        { Object.keys(Category).map(category => <option key={category} value={Category[category]}>{Category[category]}</option>)}
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}