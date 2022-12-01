import { Button, Form } from "react-bootstrap";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { login } from "../../../utils/http-utils/user-requests";
import './Login.scss';

export function Login(){

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const navigate = useNavigate()

    const onFormSubmit = (event) => {
        event.preventDefault();

        login(user).then(() => {
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
        <div className="login-form-wrapper">

            <Form onSubmit={onFormSubmit}>

                <h2>Login</h2>

                {error && <span className="text-danger error">{error}</span>}

                <Form.Group className="mb-6" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" value={user.email} name="email" onChange={onInputChange} required/>
                </Form.Group>

                <Form.Group className="mb-6" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={user.password} name="password" onChange={onInputChange} required/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div> 
    );
}