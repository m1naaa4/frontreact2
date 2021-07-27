import countries from '../countries'


export const countryName = (code) =>
{
    let obj = countries.filter(item => item.value === code).shift()
    return (obj !== undefined) ? obj.label : code
}