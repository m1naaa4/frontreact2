import { FormControl, InputLabel } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import MUIDataTable from "mui-datatables";
import { ReportsAction } from '../../../store/actions/Admin/ReportActions';




export default function ReportView() { 
    const dispatch = useDispatch();
    const [responsive, setResponsive] = useState("vertical");
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");

    const reports = useSelector(state => state.reportsData.reports);
    const admin   = useSelector(state => state.adminAuth.admin);

    const columns = ["Priority", "Content type", "Link", "Description", "Reporter", "author", "Blocked", "Action"];

    const options = {
        filter: true,
        filterType: "dropdown",
        responsive,
        tableBodyHeight,
        tableBodyMaxHeight
    };
    console.log('dssssssssssssssssssssss', reports)


    const data = reports?.map((value)=>{
        console.log(value)
        return [value.priority, value.provider, <a href={value.link}>link</a>, value.description,
            <a href={value.reporter}>link</a>, <a href={value.author}>link</a>, value.blocked, 
            <><button type="button" name="button"  className="Invitation-Option_Confirm"><i className="uil uil-pen"></i></button>
            <button type="button" name="button"  className="Invitation-Option_Delete"><i className="uil uil-times"></i></button></>]
    })

    console.log('valueeeeeeeeeee', data)

    // countries.map((key) => 
    //   {if (key.value === defaultValue) {
    //     setOptionSelected({value : key.value, label: t(key.label)})
    //   }}
    // );
    // const data = [
    //     ["Gabby George", "Business Analyst", "Minneapolis"],
        
    // ];

    useEffect(() => {
        let data = {
            'url'   :   'admin/report'
        }
        dispatch(ReportsAction(data));
    }, [dispatch])

    return (
            <div className="Page-Wrapper">
                <div className="container">
                <React.Fragment>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Responsive Option</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={responsive}
                            style={{ width: "200px", marginBottom: "10px", marginRight: 10 }}
                            onChange={(e) => setResponsive(e.target.value)}
                        >
                            <MenuItem value={"vertical"}>vertical</MenuItem>
                            <MenuItem value={"standard"}>standard</MenuItem>
                            <MenuItem value={"simple"}>simple</MenuItem>

                            <MenuItem value={"scroll"}>scroll (deprecated)</MenuItem>
                            <MenuItem value={"scrollMaxHeight"}>
                                scrollMaxHeight (deprecated)
                            </MenuItem>
                            <MenuItem value={"stacked"}>stacked (deprecated)</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Table Body Height</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={tableBodyHeight}
                            style={{ width: "200px", marginBottom: "10px", marginRight: 10 }}
                            onChange={(e) => setTableBodyHeight(e.target.value)}
                        >
                            <MenuItem value={""}>[blank]</MenuItem>
                            <MenuItem value={"400px"}>400px</MenuItem>
                            <MenuItem value={"800px"}>800px</MenuItem>
                            <MenuItem value={"100%"}>100%</MenuItem>
                        </Select>
                    </FormControl>
                    <MUIDataTable
                        title={"Reports list"}
                        data={data}
                        columns={columns}
                        options={options}
                    />
                </React.Fragment>
                </div>
            </div>
    )
}
