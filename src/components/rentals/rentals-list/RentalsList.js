import { useEffect, useState } from "react";
import { getAllRentals, deleteRental } from "../../../utils/http-utils/rentals-requests";
import { RentalCard } from '../rental-card/RentalCard';
import './RentalsList.scss';

export function RentalsList(){

    const [rentals, setRentals] = useState([]);

    useEffect(() => {
        getAllRentals().then(response => {
            setRentals(response.data);
        });
    }, []);

    const deleteRentalHandler = async (id) => {
        await deleteRental(id);
        setRentals(prevState => {
            return prevState.filter(rental => rental.id !== id);
        });
    };

    return(
        <div className="rentals-list-wrapper">
           {rentals.map(rental => <RentalCard rental={rental} key={rental.id} deleteRental={deleteRentalHandler}/>)}
        </div>
    );
}