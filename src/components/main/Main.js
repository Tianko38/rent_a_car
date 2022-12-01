import { Route, Routes } from "react-router-dom";
import { UserForm } from "../User/user-form/UserForm";
import { User } from "../User/user/User";
import { UsersList } from "../User/users-list/UsersList";
import { VehiclesList } from "../vehicles/vehiclesList/VehiclesList";
import { Vehicle } from '../vehicles/vehicle/Vehicle';
import { Vehicleform } from '../vehicles/vehicle-form/VehicleForm';
import { RentalsList } from "../rentals/rentals-list/RentalsList";
import { RentalForm } from "../rentals/rental-form/RentalForm";
import { EditForm } from "../rentals/rental-form/EditForm";
import { Rental } from "../rentals/rental/Rental";

export function Main(){
    return(
        <div className="main-content">
            <Routes>
                
                <Route path="/vehicles-list" element={<VehiclesList/>}/>
                <Route path="/vehicle/:id" element={<Vehicle/>}/>
                <Route path="/vehicle/create" element={<Vehicleform/>}/>
                <Route path="/vehicle/edit/:id" element={<Vehicleform/>}/>

                <Route path="/users-list" element={<UsersList/>}/>
                <Route path="/user/:id" element={<User/>}/>
                <Route path="/user/create" element={<UserForm/>}/>
                <Route path="/user/edit/:id" element={<UserForm/>}/>

                <Route path="/rentals-list" element={<RentalsList/>}/>
                <Route path="/rental/:id" element={<Rental/>}/>
                <Route path="/rental/create/:rentalId" element={<RentalForm/>}/>
                <Route path="/rental/edit/:id" element={<EditForm/>}/>
            </Routes>
        </div>
    );
}