import React from 'react'
import PorteurView  from '../../../views/User/Profile/PorteurView'
import {useForm} from "react-hooks-helper";
import PorteurView0 from "../../../views/User/Profile/PorteurView0";

export default function Porteur(props ) {
console.log("porteur" , props)
    const defaultData = {
        search: "",
        zone: "",
        sector: "",
        financement: "",
        etat: "",
        action: "getallProjects",
    };
    const [filterInput, setFilterInput] = useForm(defaultData);

    const data = { filterInput, setFilterInput, props}

    return (
        <div>
            <PorteurView {...data}/>
            {/*<PorteurView0/>*/}
        </div>
    )
}


