import React from "react";
import { useForm, useStep } from "react-hooks-helper";
import RegisterStep1View from "./RegisterStep1View";
import RegisterStep2View from "./RegisterStep2View";
import Submit from "./Submit";


const steps = [
    { id: "registerstep1" },
    { id: "registerstep2" },
    { id: "submit" }
];

const defaultData = {
    name: "AbdeLKARIM",
    email: "ichiabdelkrim@gmail.com",
    address: "casablanca",
    company: "Dadupa",
    type: "PP",
    phone: "0602098403",
    password: ""
};

const MultiStepForm = ({ props }) => {
    const [formData, setForm] = useForm(defaultData);
    const { step, navigation } = useStep({ initialStep: 0, steps });
    const { id } = step;

    const data = { formData, setForm, navigation, props };

    switch (id) {
        case "registerstep1":
            return <RegisterStep1View {...data} />;
        case "registerstep2":
            return <RegisterStep2View {...data} />;
        case "submit":
            return <Submit {...data} />;
        default:
            return null;
    }
};

export default MultiStepForm;