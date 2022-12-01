import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './VehicleForm.scss';
import { getVehicleById, saveVehicle } from '../../../utils/http-utils/vehicles-requests';

export function Vehicleform(){
    const [vehicle, setVehicle] = useState({
        type: '',
        brand: '',
        model: '',
        year: '',
        fuel: '',
        seats: '',
        picture: '',
        pricePerDay: '',
        count: ''
    });

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (params.id){
            getVehicleById(params.id).then(response => {
                setVehicle(response.data);
            });
        }  
    }, [params.id]);

    const onFormSubmit = (event) => {
        event.preventDefault();

        saveVehicle(vehicle).then(() => {
            navigate(`/vehicles-list`);
        })
    };

    const onInputChange = (event) => {
        let value = event.target.value;

        setVehicle((prevState) => {
            return{
                ...prevState,
                [event.target.name]: value
            }
        })
    }

    return (
        <div className="vehicle-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="mb-6" controlId="type">
                    <Form.Label>Type</Form.Label>
                    <Form.Control type="text" placeholder="Type" value={vehicle.type} name="type" onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-6" controlId="brand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text" placeholder="Brand" value={vehicle.brand} name="brand" onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-6" controlId="model">
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" placeholder="Model" value={vehicle.model} name="model" onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-6" controlId="year">
                    <Form.Label>Year</Form.Label>
                    <Form.Control type="number" placeholder="Year" value={vehicle.year} name="year" onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-6" controlId="fuel">
                    <Form.Label>Fuel</Form.Label>
                    <Form.Control type="text" placeholder="Fuel" value={vehicle.fuel} name="fuel" onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-6" controlId="seats">
                    <Form.Label>Seats</Form.Label>
                    <Form.Control type="number" placeholder="Seats" value={vehicle.seats} name="seats" onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-6" controlId="picture">
                    <Form.Label>Picture</Form.Label>
                    <Form.Control type="link" placeholder="Picture url" value={vehicle.picture} name="picture" onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-6" controlId="pricePerDay">
                    <Form.Label>Price Per Day</Form.Label>
                    <Form.Control type="number" placeholder="Price Per Day" value={vehicle.pricePerDay} name="pricePerDay" onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-6" controlId="count">
                    <Form.Label>Count</Form.Label>
                    <Form.Control type="number" placeholder="Count" value={vehicle.count} name="count" onChange={onInputChange}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}