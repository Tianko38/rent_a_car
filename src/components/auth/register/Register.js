import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { registerUser } from '../../../utils/http-utils/user-requests';
import { useNavigate } from "react-router-dom";
import './Register.scss';

export function Register(){

    const [user, setUser] = useState({
        isActive: false,
        name: '',
        picture: '',
        email: '',
        phone: '',
        location: '',
        password: ''
    });

    const [error, setError] = useState('');

    const navigate = useNavigate()

    const onFormSubmit = (event) => {
        event.preventDefault();

        registerUser(user).then(() => {
            navigate('/users-list');
        })
        .catch(error => setError(error.message));
    };

    const onInputChange = (event) =>{
        setUser((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });

        setError('');
    };

    return(
        <div className="user-form-wrapper">
            <Form onSubmit={onFormSubmit}>

                {error && <span className="text-danger error">{error}</span>}

                <Form.Group className="mb-6" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Ful Name" value={user.name} name="name" onChange={onInputChange} required/>
                </Form.Group>

                <Form.Group className="mb-6" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" value={user.email} name="email" onChange={onInputChange} required/>
                </Form.Group>

                <Form.Group className="mb-6" controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="phone" placeholder="Phone number" value={user.phone} name="phone" onChange={onInputChange} required/>
                </Form.Group>

                <Form.Group className="mb-6" controlId="location">
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" placeholder="Location" value={user.location} name="location" onChange={onInputChange} required/>
                </Form.Group>

                <Form.Group className="mb-6" controlId="picture">
                    <Form.Label>Picture</Form.Label>
                    <Form.Control type="link" placeholder="Picture url" value={user.picture} name="picture" onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-6" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={user.password} name="password" onChange={onInputChange} required/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}