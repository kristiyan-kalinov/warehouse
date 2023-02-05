import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { getLoggedUser } from '../../../utils/http-utils/user-requests';
import './ProductCard.scss';

export function ProductCard({ product, deleteProduct, isInDetails }) {
    
    const loggedUser = getLoggedUser();
    const navigate = useNavigate();
    
    const redirectToDetails = () => {
        navigate(`/product/${product.id}`);
    }

    const redirectToEdit = () => {
        navigate(`/product/edit/${product.id}`);
    }

    if (!product) {
        return <p>No Product!</p>;
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={product.file} />
            <Card.Body>
                <Card.Title>{ product.name }</Card.Title>
                <Card.Text>
                    <span className='key'>Description: </span>
                    <span className='value'>{product.description}</span>
                </Card.Text>
                <Card.Text>
                    <span className='key'>Buy price: </span>
                    <span className='value'>{product.buyPrice}</span>
                </Card.Text>
                <Card.Text>
                    <span className='key'>Sell price: </span>
                    <span className='value'>{product.sellPrice}</span>
                </Card.Text>
                <Card.Text>
                    <span className='key'>Count: </span>
                    <span className='value'>{product.count}</span>
                </Card.Text>
                <Card.Text>
                    <span className='key'>Category: </span>
                    <span className='value'>{product.category}</span>
                </Card.Text>
                <Card.Text>
                    <span className='key'>ID: </span>
                    <span className='value'>{product.id}</span>
                </Card.Text>
                <div className='btn-holder'>
                    <Button variant="primary" onClick={redirectToEdit}>Edit</Button>
                    <Button variant="danger" onClick={() => deleteProduct(product.id)}>Delete</Button>
                </div>                
            </Card.Body>
        </Card>
    );
}