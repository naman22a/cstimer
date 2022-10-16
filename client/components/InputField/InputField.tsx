import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';

type Props = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
};

const InputField: React.FC<Props> = ({ label, size: _, ...props }) => {
    const [field, { error }] = useField(props);

    return (
        <div className="flex flex-col my-5">
            <label className="mb-2 text-lg" htmlFor={field.name}>
                {label}
            </label>
            <input
                {...field}
                {...props}
                id={field.name}
                placeholder={props.placeholder ? props.placeholder : label}
                autoComplete="off"
                className={`px-3 py-1 bg-gray-200 dark:bg-Grey dark:text-white rounded outline-none ${
                    error ? 'outline-1 outline-red-600' : ''
                }`}
            />
            {error && <p className="text-red-600 mt-2 capitalize">{error}</p>}
        </div>
    );
};

export default InputField;
