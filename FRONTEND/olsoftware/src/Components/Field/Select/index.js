import React from 'react';
import Select from 'react-select';
import { useStyles, components } from '../Styles';

export const RenderSelect = ({ input, meta: { touched, error, active }, label, id, opciones, disabled, defaultValue, requerido }) => {
    const classes = useStyles();

    const _onBlur = e => {
        e.preventDefault();
        input.onBlur();
    }

    const _onChange = value => {
        input.onChange(value);
    }

    return (
        <div>
            <Select
                {...input}
                classes={classes}
                value={input.value}
                defaultValue={defaultValue}
                onChange={_onChange}
                onBlur={_onBlur}
                options={opciones}
                inputId={id}
                placeholder={""}
                TextFieldProps={{
                    name: input.name,
                    label: label,
                    error: (touched && error) ? true : false,
                    helperText: touched && error,
                    required: requerido,
                    disabled,
                    InputLabelProps: {
                        htmlFor: id,
                        shrink: input.value || active ? true : false,
                        disabled,
                    },
                }}
                components={components}
                isDisabled={disabled}
            />
        </div>
    )
};