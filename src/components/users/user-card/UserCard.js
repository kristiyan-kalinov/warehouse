import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { getLoggedUser } from '../../../utils/http-utils/user-requests';
import './UserCard.scss';

export function UserCard({ user, deleteUser, isInDetails }) {

    const loggedUser = getLoggedUser();
    const navigate = useNavigate();
    
    const redirectToDetails = () => {
        navigate(`/user/${user.id}`);
    }

    const redirectToEdit = () => {
        navigate(`/user/edit/${user.id}`);
    }

    if (!user) {
        return <p>No User!</p>;
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{ user.username }</Card.Title>
                <Card.Text>
                    <span className='key'>Email: </span>
                    <span className='value'>{user.email}</span>
                </Card.Text>
                <Card.Text>
                    <span className='key'>Phone: </span>
                    <span className='value'>{user.phone}</span>
                </Card.Text>
                <div className='btn-holder'>
                    <Button variant="primary" onClick={redirectToEdit}>Edit</Button>
                    <Button variant="danger" onClick={() => deleteUser(user.id)}>Delete</Button>
                </div>                
            </Card.Body>
        </Card>
    );
}