import React from "react";
import { ErrorMessage, useField } from 'formik'
import './css/TextField.css'

type TextFieldProps = {
    label: string,
    name: string,
    type: string,
    placeholder: string,
    value: string
}

export const TextField = (props: TextFieldProps) => {
    const { label, ...rest } = props
    const [field, meta] = useField(rest)
    return (
        <div className="textContent">
            <label className="textLabel" htmlFor={field.name}>{label}</label>
            <input
                className={`textInput ${meta.touched && meta.error ? "textInputError" : ""}`}
                data-testid={field.name + `Input`}
                autoComplete="off"
                {...field}
                {...rest}
            />
            <ErrorMessage className="textLabelError" component="div" name={field.name}></ErrorMessage>
        </div>
    )
}