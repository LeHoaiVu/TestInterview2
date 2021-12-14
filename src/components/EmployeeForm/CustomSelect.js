import React from 'react'
import Select from 'react-select'

const customStyles = {
    control: (base) => ({
        ...base,
        height: 20,
        width: '100%'
    }),
}

const customStylesError = {
    control: (base) => ({
        ...base,
        borderColor: 'red',
        height: 20,
    }),
}

const CustomSelect = ({ onChange, options, value, error, placeholder }) => {
    const defaultValue = (options, value) => {
        return options ? options.find((option) => option.value === value) : ''
    }
    return (
        <div>
            {!error ? (
                <>
                    <Select
                        styles={customStyles}
                        value={defaultValue(options, value)}
                        placeholder={placeholder}
                        onChange={(value) => {
                            onChange(value)
                        }}
                        options={options}
                    />
                </>
            ) : (
                <>
                    <Select
                        styles={customStylesError}
                        value={defaultValue(options, value)}
                        placeholder={placeholder}
                        onChange={(value) => {
                            onChange(value)
                        }}
                        options={options}
                    />
                </>
            )}
        </div>
    )
}

export default CustomSelect
