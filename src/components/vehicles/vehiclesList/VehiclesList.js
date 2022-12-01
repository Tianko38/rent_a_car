import { useEffect, useState } from "react";
import { deleteVehicle, getAllVehicles } from "../../../utils/http-utils/vehicles-requests";
import { VehicleCard } from "../vehicle-card/VehicleCard";
import './VehiclesList.scss'

export function VehiclesList(){

    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        getAllVehicles().then(response => {
            setVehicles(response.data);
        });
    }, []);

    const deleteVehicleHandler = async (id) => {
        await deleteVehicle(id);
        setVehicles(prevState => {
            return prevState.filter(vehicle => vehicle.id !== id);
        });
    };

    return(
        <div className="vehicles-list-wrapper">
           {vehicles.map(vehicle => <VehicleCard vehicle={vehicle} key={vehicle.id} deleteVehicle={deleteVehicleHandler}/>)}
        </div>
    );
}