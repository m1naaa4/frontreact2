import React from "react";
import { useForm, useStep } from "react-hooks-helper";
import FirstStepFunder from "./Steps/FirstStepFunder";
import SecondStepFunder from "./Steps/SecondStepFunder";
import ThirdStepFunder from "./Steps/ThirdStepFunder";
import FinalStepFunder from "./Steps/FinalStepFunder";
// import Step2View from "./Step/Step2View";
// import Step3View from "./Step/Step3View";
// import FinalView from "./Step/FinalView";



const steps = [
    { id: "step1" },
    { id: "step2" },
    { id: "step3" },
    { id: "final" }
];

const defaultData = {
    type: '',
    zone: '',
    sector_id: '',
    phone: '',
    url: '',
    date: '',
    proposition: '',
    finances: '',
    video: new FormData(),
    description: '',
    project_status: '',
    action: 'create',
    look_mentor: 0,
    look_angel: 1,
    step: "1",
    tags: [],
    mediatype: '',
    media: '',
};

const MultiStepProjectFormFunder = ( props ) => {
    const [formData, setForm] = useForm(defaultData);
    const { step, navigation } = useStep({ initialStep: 0, steps });
    const { id } = step;

    const data = { formData, setForm, navigation, props };

    switch (id) {
        case "step1":
            return <FirstStepFunder {...data} />;
        case "step2":
             return <SecondStepFunder {...data} />;
        case "step3":
            return <ThirdStepFunder {...data} />;
        case "final":
             return <FinalStepFunder {...data} />;
        default:
            return null;
    }
};

export default MultiStepProjectFormFunder;