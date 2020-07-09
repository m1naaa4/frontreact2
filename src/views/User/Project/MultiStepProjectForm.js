import React from "react";
import { useForm, useStep } from "react-hooks-helper";
import Step1View from "./Step/Step1View";
import Step2View from "./Step/Step2View";
import Step3View from "./Step/Step3View";
import FinalView from "./Step/FinalView";



const steps = [
    { id: "step1" },
    { id: "step2" },
    { id: "step3" },
    { id: "final" }
];

const defaultData = {
    name: "project test",
    logo: "",
    sector: "2",
    project_id: "",
    zone: "Goulmima",
    financement: "1000000$a1000000000000$",
    description: "",
    etat: "50",
    action: "createProject",
    look_mentor: 0,
    look_angel: 1,
    step: "1",
    url: "",
};

const MultiStepProjectForm = ({ props }) => {

    const [formData, setForm] = useForm(defaultData);
    const { step, navigation } = useStep({ initialStep: 0, steps });
    const { id } = step;

    const data = { formData, setForm, navigation, props };

    switch (id) {
        case "step1":
            return <Step1View {...data} />;
        case "step2":
            return <Step2View {...data} />;
        case "step3":
            return <Step3View {...data} />;
        case "final":
            return <FinalView {...data} />;
        default:
            return null;
    }
};

export default MultiStepProjectForm;