import { DialogContentText, FormControl, InputLabel, Tooltip } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import MUIDataTable from "mui-datatables";
import { ReportsAction } from '../../../store/actions/Admin/ReportActions';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import { BlockContentAction } from '../../../store/actions/Admin/AdminActions';




export default function ReportView() { 
    const dispatch = useDispatch();
    const [responsive, setResponsive] = useState("vertical");
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");

    const [open, setOpen] = useState(false);
    const [provider, setProvider] = useState();
    const [providerId, setProviderId] = useState();
    const [reportId, setReportId] = useState();


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
    
    const handleClickOpen = (idReport, id, provider) => {
        setProviderId(id);
        setProvider(provider);
        setReportId(idReport);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const data = reports?.map((value)=>{
        return [value.priority, value.provider, <a href={value.link}>link</a>, value.description,
            <a href={value.reporter}>link</a>, <a href={value.author}>link</a>, value.blocked, 
            <>  <Tooltip title="Add comment" arrow><button variant="outlined" onClick={()=>handleClickOpen(value.id, value.provider_id, value.provider)} type="button" name="button"  className="Invitation-Option_Confirm"><i className="uil uil-pen"></i></button></Tooltip>
                <Tooltip title="Delete content" arrow><button type="button" name="button"  className="Invitation-Option_Delete"><i className="uil uil-times"></i></button></Tooltip>
                <Tooltip title="Block content" arrow><button type="button" name="button"  className="Invitation-Option_Block"><i class="uil uil-ban"></i></button></Tooltip>
            </>
            ]
    })

    const handleBlock = () => {
        console.log(providerId, provider)
        let data = {
            'url'    : 'admin/report/block',
            'report_id'     : reportId,
            'provider_id'   : providerId,
            'provider'      : provider,
        }
        dispatch(BlockContentAction (data));
        setOpen(false);
    };


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
                <Dialog
                    open={open}
                    onClose={handleBlock}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleBlock} autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>
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
