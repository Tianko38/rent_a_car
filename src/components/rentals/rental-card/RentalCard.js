import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { getLoggedUser } from "../../../utils/http-utils/user-requests";

export function RentalCard({ rental, deleteRental }){
    const navigate = useNavigate();

    const redirectToDetails = () => {
        navigate(`/rental/${rental.id}`);
    }

    const redirectToEdit = () => {
        navigate(`/rental/edit/${rental.id}`)
    }

    const loggedUser = getLoggedUser();

    if(!rental){
        return <p>No User!</p>
    }

    return(
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{rental.vehicleName} - {rental.userName}</Card.Title>
                        <Card.Text>
                            <span className="key">Start Date: </span>
                            <span className="value">{rental.startDate}</span>
                        </Card.Text>
                        <Card.Text>
                            <span className="key">End Date: </span>
                            <span className="value">{rental.endDate}</span>
                        </Card.Text>
                        <div className="btn-holder">
                            {loggedUser && loggedUser.id === rental.userId && 
                                <Button variant="warning" onClick={redirectToEdit}>Edit</Button>
                            }
                            {loggedUser && loggedUser.id === rental.userId && 
                                <Button variant="danger" onClick={() => deleteRental(rental.id)}>Delete</Button>
                            }
                            <Button variant="info" onClick={redirectToDetails}>Details</Button>
                        </div>
                </Card.Body>
            </Card>
        </div>    
    );
}