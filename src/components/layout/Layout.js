import {Header}  from "../header/Header";
import {Footer} from "../footer/Footer";
import {Main} from "../main/Main";
import { useState } from "react";

export function Layout(){
    return(
        <div>
            <Header/>
            <Main/>
            <Footer/>
        </div>
    );
}