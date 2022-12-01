import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { RentalCard } from '../rental-card/RentalCard'
import { getRentalById } from "../../../utils/http-utils/rentals-requests";
import './Rental.scss';

export function Rental(props){
    const params = useParams();
    const [rental, setRental] = useState(null);

    console.log(params);

    useEffect(() => {
        getRentalById(params.id).then(response => setRental(response.data));
    }, [params.id]);

    return(
        <div className="rental">
            <RentalCard rental={rental}/>
        </div>
    );
}