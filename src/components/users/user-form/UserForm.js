import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './UserForm.scss';
import { getLoggedUser, getUserById, saveUser } from '../../../utils/http-utils/user-requests';
import { useNavigate, useParams } from 'react-router-dom';

export function UserForm() {

    const loggedUser = getLoggedUser();
    const params = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        email: '',
        phone: '',
        password: ''
    });

    useEffect(() => {
        if (params.id) {
            getUserById(params.id).then(response => {
                setUser(response.data);
            });
        }        
    }, [params.id])

    const onFormSubmit = (event) => {
        event.preventDefault();

        saveUser(user).then(() => {
            console.log('Success');
            navigate('/products-list');
        });
    }

    const onInputChange = (event) => {        
        let value = event.target.value;

        setUser((prevState) => {
            return {
                ...prevState,
                [event.target.name]: value
            }
        })
    }


    return (
        <div className="user-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" name="username" value={user.username} onChange={onInputChange} autoComplete="off" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={onInputChange} autoComplete="off" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="tel" placeholder="Enter phone" name="phone" value={user.phone} onChange={onInputChange} autoComplete="off"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" name="password" value={user.passsword} onChange={onInputChange} required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}