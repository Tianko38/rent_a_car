import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { getAllRentalsForVehicle } from "../../../utils/http-utils/rentals-requests";
import { getLoggedUser } from "../../../utils/http-utils/user-requests";

export function VehicleCard({ vehicle, deleteVehicle }){

    const navigate = useNavigate();

    const [rentals, setRentals] = useState([]);

    useEffect(() => {
        getAllRentalsForVehicle(vehicle.id).then(response => {
            setRentals(response.data);
        });
    }, [vehicle.id]);

    const redirectToDetails = () => {
        navigate(`/vehicle/${vehicle.id}`);
    }

    const redirectToRental = () => {
        navigate(`/rental/create/${vehicle.id}`);
    }

    const redirectToEdit = () => {
        navigate(`/vehicle/edit/${vehicle.id}`)
    }

    if(!vehicle){
        return <p>No Vehicle!</p>
    }

    const loggedUser = getLoggedUser();

    return(
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={vehicle.picture} />
                <Card.Body>
                    <Card.Title>{vehicle.brand} {vehicle.model}</Card.Title>
                        <Card.Text>
                            <span className="key">Type: </span>
                            <span className="value">{vehicle.type}</span>
                        </Card.Text>
                        <Card.Text>
                            <span className="key">Year: </span>
                            <span className="value">{vehicle.year}</span>
                        </Card.Text>
                        <Card.Text>
                            <span className="key">Fuel: </span>
                            <span className="value">{vehicle.fuel}</span>
                        </Card.Text>
                        <Card.Text>
                            <span className="key">Seats: </span>
                            <span className="value">{vehicle.seats}</span>
                        </Card.Text>
                        <Card.Text>
                            <span className="key">Price Per Day: </span>
                            <span className="value">{vehicle.pricePerDay}</span>
                        </Card.Text>
                        <Card.Text>
                            <span className="key">Number of cars: </span>
                            <span className="value">{vehicle.count - rentals.length}</span>
                        </Card.Text>
                        <div className="btn-holder">
                            {loggedUser && loggedUser.role === "admin" && 
                                <Button variant="warning" onClick={redirectToEdit}>Edit</Button>
                            }
                            {loggedUser && loggedUser.role === "admin" && 
                                <Button variant="danger" onClick={() => deleteVehicle(vehicle.id)}>Delete</Button>
                            }

                            <Button variant="info" onClick={redirectToDetails}>Details</Button>
                            <Button variant="info" onClick={redirectToRental}>Rent</Button>
                        </div>
                </Card.Body>
            </Card>
        </div>    
    );
}