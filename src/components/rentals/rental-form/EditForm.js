import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './RentalForm.scss';
import { getRentalById, saveRental } from '../../../utils/http-utils/rentals-requests';

export function EditForm(props){
    const [rental, setRental] = useState({
        startDate: '',
        endDate: '',
        vehicleId: '',
        vehicleName: ''
    });

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {      
        if (params.id){
            getRentalById(params.id).then(response => {
                setRental(response.data);
            });
        }
        
    }, [params.id]);

    const onFormSubmit = (event) => {
        event.preventDefault();

        saveRental(rental).then(() => {
            navigate(`/rentals-list`);
        })
    };

    const onInputChange = (event) => {
        let value = event.target.value;

        setRental((prevState) => {
            return{
                ...prevState,
                [event.target.name]: value
            }
        })
    }

    return (
        <div className="rental-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="mb-6" controlId="startDate">
                    <Form.Label>From Date</Form.Label>
                    <Form.Control type="date" placeholder="Date" value={rental.startDate} name="startDate" onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-6" controlId="endDate">
                    <Form.Label>To Date</Form.Label>
                    <Form.Control type="date" placeholder="Date" value={rental.endDate} name="endDate" onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-6" controlId="vehicleId">
                    <Form.Label>Vehicle ID</Form.Label>
                    <Form.Control type="text" placeholder="Vehicle ID" value={rental.vehicleId} name="vehicleId" 
                    onChange={onInputChange} disabled/>
                </Form.Group>

                <Form.Group className="mb-6" controlId="vehicleName">
                    <Form.Label>Vehicle Name</Form.Label>
                    <Form.Control type="text" placeholder="Vehicle Name" value={rental.vehicleName}
                     name="vehicleName" onChange={onInputChange} disabled/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}