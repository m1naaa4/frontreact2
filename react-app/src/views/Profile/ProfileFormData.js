import React from "react";
import HeaderProfileView from "./HeaderProfileView";
import { useForm } from "react-hooks-helper";



const defaultData = {
    avatar: new FormData(),
    cover: new FormData()
};

const ProfileHeaderForm = (props) => {
    const [formData, setForm] = useForm(defaultData);

    const data = { formData, setForm, props };

    return <HeaderProfileView {...data} />;
};

export default ProfileHeaderForm;