import React from 'react'
import PorteurView  from '../../../views/User/Projects/PorteurView'
import {useForm} from "react-hooks-helper";
import ListProjectView from '../../../views/User/Projects/ListProjectView';

export default function ListProject(props ) {
    const defaultData = {
        search: "",
        project_area: "",
        sector_id: "",
        funding_search: "",
        project_status: "",
        action: "getallProjects",
    };
    const [filterInput, setFilterInput] = useForm(defaultData);

    const data = { filterInput, setFilterInput, props}

    return (
        <div>
            <ListProjectView {...data}/>
            {/* <PorteurView {...data}/> */}
            {/*<PorteurView0/>*/}
        </div>
    )
}


