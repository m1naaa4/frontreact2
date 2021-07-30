import React, {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from "react-redux";
import ProgressBar from "../../../skeleton/ProgressBar";
import { Player } from 'video-react';
import UploadService from '../../../helpers/FileUploadService';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const FinalStepFunder = ( {formData, setForm, navigation, props} ) => {
    
    
    return (
        <div>Final Step</div>
    )
};

export default FinalStepFunder;