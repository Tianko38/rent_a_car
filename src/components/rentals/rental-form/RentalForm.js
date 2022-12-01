import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './RentalForm.scss';
import { getRentalById, saveRental } from '../../../utils/http-utils/rentals-requests';
import { getVehicleById } from '../../../utils/http-utils/vehicles-requests';

export function RentalForm(props){
    const [rental, setRental] = useState({
        startDate: '',
        endDate: '',
        vehicleId: '',
        vehicleName: ''
    });

    const [vehicle, setVehicle] = useState(null);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if(params.vehicleId){
            getVehicleById(params.vehicleId).then(response => {
                setVehicle(response.data);
                setRental({
                    vehicleId: response.data.id,
                    vehicleName: response.data.brand + ' ' + response.data.model
                });
            });
        }

        if (params.id){
            getRentalById(params.id).then(response => {
                setRental(response.data);

                setVehicle({
                    id: response.data.vehicleId,
                    brand: response.data.vehicleName.split(' ')[0],
                    model: response.data.vehicleName.split(' ')[1],
                });
            });
        }
        
    }, [params.id, params.vehicleId]);

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
                    <Form.Control type="text" placeholder="Vehicle ID" value={vehicle.id} name="vehicleId" 
                    onChange={onInputChange} disabled/>
                </Form.Group>

                <Form.Group className="mb-6" controlId="vehicleName">
                    <Form.Label>Vehicle Name</Form.Label>
                    <Form.Control type="text" placeholder="Vehicle Name" value={vehicle.brand + ' ' + vehicle.model}
                     name="vehicleName" onChange={onInputChange} disabled/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}