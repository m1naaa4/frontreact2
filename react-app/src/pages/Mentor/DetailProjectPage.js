import React from 'react'
import {useForm} from "react-hooks-helper";
import AddProject from "../../../views/User/Project/AddProject";

export default function DetailProjectPage(props) {

    const defaultData = {
        name: "project test",
        logo: "",
        sector: "2",
        zone: "",
        financement: "1000000$a1000000000000$",
        etat: "50",
        action: "createProject",
        look_mentor: 0,
        look_angel: 1,
        step: "1",
        url: "",
    };
    const [filterInput, setFilterInput] = useForm(defaultData);

    const data = { filterInput, setFilterInput, props}

    return (
        <div>
            <AddProject {...data}/>
        </div>
    )
}


