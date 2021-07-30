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