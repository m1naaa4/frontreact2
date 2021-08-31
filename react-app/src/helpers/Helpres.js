import countries from '../countries'
import finances from '../finances'
import sectors from '../sectors'
export const countryName = (code) =>
{
    let obj = countries.filter(item => item.value === code).shift()
    return (obj !== undefined) ? obj.label : code
}


export const financeLabel = (code) =>
{
    let obj = finances.filter(item => item[0] == code).shift()
    return (obj !== undefined) ? obj[1] : code
}

export const sectorName = (code) =>
{
    let obj = sectors.filter(item => item[0] == code).shift()
    return (obj !== undefined) ? obj[1] : code
}

export const typeFunderName = (code) =>
{
    const etats = [
        ["business_angle", "funder.form.you_are.business_angle"],
        ["fonds", "funder.form.you_are.fonds"],
        ["corporate", "funder.form.you_are.corporate"],
    ];
    let obj = etats.filter(item => item[0] == code).shift()
    return (obj !== undefined) ? obj[1] : code
}

