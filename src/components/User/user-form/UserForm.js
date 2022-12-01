import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './UserForm.scss';
import { useEffect, useState } from 'react';
import { getUserById, saveUser } from '../../../utils/http-utils/user-requests';
import { useNavigate, useParams } from "react-router-dom";

export function UserForm(){

    const [user, setUser] = useState({
        isActive: false,
        name: '',
        picture: '',
        email: '',
        phone: '',
        location: ''
    });

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (params.id){
            getUserById(params.id).then(response => {
                setUser(response.data);
            });
        }  
    }, [params.id]);

    const onFormSubmit = (event) => {
        event.preventDefault();

        saveUser(user).then(() => {
            navigate(`/users-list`);
        })
    };

    const onInputChange = (event) => {
        let value = event.target.value;

        if(event.target.name === 'isActive'){
            value = event.target.checked
        }

        setUser((prevState) => {
            return{
                ...prevState,
                [event.target.name]: value
            }
        })
    }

    return (
        <div className="user-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="mb-6" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Ful Name" value={user.name} name="name" onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-6" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" value={user.email} name="email" onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-6" controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="phone" placeholder="Phone number" value={user.phone} name="phone" onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-6" controlId="location">
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" placeholder="Location" value={user.location} name="location" onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-6" controlId="picture">
                    <Form.Label>Picture</Form.Label>
                    <Form.Control type="link" placeholder="Picture url" value={user.picture} name="picture" onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-6" controlId="isActive">
                    <Form.Check type="checkbox" label="Active" name="isActive" checked={user.isActive} onChange={onInputChange}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}