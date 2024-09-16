import React from "react";
import { useForm, useStep } from "react-hooks-helper";
import FirstStepMentor from "./Steps/FirstStepMentor";
import SecondStepMentor from "./Steps/SecondStepMentor";
import ThirdStepMentor from "./Steps/ThirdStepMentor";
import FinalStepMentor from "./Steps/FinalStepMentor";



const steps = [
    { id: "step1" },
    { id: "step2" },
    { id: "step3" },
    { id: "final" }
];

const defaultData = {
    type: '',
    zone: '',
    logo: new FormData(),
    title: '',
    sector_id: '',
    phone: '',
    url: '',
    date: '',
    proposition: '',
    assistance: '',
    description: '',
    accompagnateurs: '',
    step: "1",
    tags: [],
    mediatype: '',
    media: '',
};

const MultiStepMentorForm = (props) => {
    const [formData, setForm] = useForm(defaultData);
    const { step, navigation } = useStep({ initialStep: 0, steps });
    const { id } = step;

    const data = { formData, setForm, navigation, props };

    switch (id) {
        case "step1":
            return <FirstStepMentor {...data} />;
        case "step2":
             return <SecondStepMentor {...data} />;
        case "step3":
            return <ThirdStepMentor {...data} />;
        case "final":
             return <FinalStepMentor {...data} />;
        default:
            return null;
    }
};

export default MultiStepMentorForm;