import React, { useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { useLocation } from 'react-router-dom';
import { displayErrorMessages } from '../../../helpers/displayErr';
import { useTranslation } from 'react-i18next';
import $ from "jquery";
import 'jquery-validation'
import Spinner from 'react-bootstrap/Spinner'
import ZoneDropFilterFunders from '../FilterFunders/ZoneDropFilterFunders';
import SectorDropFilterFunders from '../FilterFunders/SectorDropFilterFunders';
import DatePicker from "react-datepicker";
import { CreateFunderAction } from '../../../store/actions/Funder/FunderActions'


const SecondStepFunder = ( {formData, setForm, navigation, props} ) => {

    
    return (
        <div>Welcome</div>
    )
};

export default SecondStepFunder;