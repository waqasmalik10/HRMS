import {ChangeEvent, PropsWithChildren} from "react";

type dataObject = {
    value: string,
    text: string,
}
interface selectProps {
    name: string,
    id: string,
    data: dataObject[],
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void,
    onBlur: (event: ChangeEvent<HTMLSelectElement>) => void,
    value: string,
}

const Select = ({name, id, data, onChange, onBlur, value}: PropsWithChildren<selectProps>) => {
    console.log(value, data);
    return (
        <select name={name} id={id} onChange={onChange} onBlur={onBlur} value={value}>
                {
                    data.map( d => {
                        return <option key={d.value} value={d.value}>
                            {d.text}
                        </option>
                    })
                }
        </select>
    )
}

export default Select;