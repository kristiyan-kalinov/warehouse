import { useEffect, useState } from "react";
import { deleteProduct, getAllProducts, getProductsByCode, getProductsByName, getProductsWithFilters } from "../../../utils/http-utils/product-requests";
import { ProductCard } from "../product-card/ProductCard";
import './ProductsList.scss';
import Form from 'react-bootstrap/Form';
import { Category2, saveProduct } from '../../../utils/http-utils/product-requests';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';

export function ProductsList() {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
            getAllProducts().then(response => {
                setProducts(response.data);
             });
    }, []);

    const deleteProductHandler = async (id) => {
        await deleteProduct(id);
        setProducts(pervState => {
            return pervState.filter(product => product.id !== id);
        });
    }

    const filterHandler = () => {
        if(filters.id.trim() !== '') {
            getProductsByCode(filters.id.trim()).then(response => {
                setProducts(response.data);
            })
        }

        if(filters.category === 'All' && filters.name.trim() === '' && filters.id.trim() === '') {
            getAllProducts().then(response => {
                setProducts(response.data);
            })
        }

        if(filters.category === 'All' && filters.name.trim() !== '' && filters.id.trim() === '') {
            getAllProducts().then(response => {
                setProducts(response.data.filter(product => product.name.toLowerCase().includes(filters.name.toLowerCase())))
            })
        }

        if(filters.category !== 'All' && filters.name.trim() !== '' && filters.id.trim() === '') {
            getProductsWithFilters(filters.category).then(response => {
                setProducts(response.data.filter(product => product.name.toLowerCase().includes(filters.name.toLowerCase())))
            })
        }

        if(filters.category !== 'All' && filters.name.trim() === '' && filters.id.trim() === '') {
            getProductsWithFilters(filters.category).then(response => {
                setProducts(response.data);
            })
        }
        
    }

    const [filters, setFilters] = useState({
        name: '',
        category: 'All',
        id: ''
    });

    const onInputChange = (event) => {        
        let value = event.target.value;

        setFilters((prevState) => {
            return {
                ...prevState,
                [event.target.name]: value
            }
        })
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        //console.log(products);
        filterHandler();
    }

    return (
        <div>
            <div></div>
            <div className="products-list-wrapper">
                <div className="wide">
                <form className="myForm" onSubmit={onFormSubmit}>
                    <div className="marg">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Enter name" name="name" value={filters.name} onChange={onInputChange} autoComplete="off" />
                    </Form.Group>
                    </div>
                    <div className="marg">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Select placeholder="Select category" name="category" value={filters.category} onChange={onInputChange}> 
                        { Object.keys(Category2).map(category2 => <option key={category2} value={Category2[category2]}>{Category2[category2]}</option>)}
                    </Form.Select>
                    </Form.Group>
                    </div>
                    <div className="marg">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Enter code" name="id" value={filters.id} onChange={onInputChange} autoComplete="off" />
                    </Form.Group>
                    </div>
                    <div className="myBtn">
                    <Button variant="primary" type="submit">
                    Filter
                    </Button>
                    </div>
                    </form>
                </div>
            { products.map(product => <ProductCard key={product.id} product={product} deleteProduct={deleteProductHandler} />)}
            </div>
        </div>
    );
}