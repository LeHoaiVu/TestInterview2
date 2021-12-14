import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import CustomSelect from './CustomSelect'
import './EmployeeForm.css'

const validationSchema = yup.object({
    name: yup
        .string('Input name')
        .min(2, 'Number of characters can not be less than 2')
        .max(15, 'Number of characters can not be more than 15')
        .required('You have to input name'),
    email: yup
        .string('Input the email')
        .email('Email is not valid')
        .required('You have to input the email'),
    gender: yup
        .string('Choose your gender')
        .required('You have to input the gender'),
    status: yup
        .string('Choose the status')
        .required('You have to input the status')
})

const genders = [

    {
        value: 'Male',
        label: 'Male',
    },
    {
        value: 'Female',
        label: 'Female',
    },
]

const statuses = [
    {
        value: 'active',
        label: 'Active',
    },
    {
        value: 'inactive',
        label: 'Inactive',
    },
]

function EmployeeForm(props) {

    //Check error for the gender
    const validateGender = (values) => {
        const errors = {}
        if (values.gender == '') {
            errors.gender = 'You have to input the gender'
        }

        return errors
    }

    //Check error for the status
    const validateStatus = (values) => {
        const errors = {}

        if (values.status == '') {
            errors.status = 'You have to input the status'
        }

        return errors
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: props.employee
            ? {
                  name: props.employee.name,
                  email: props.employee.email,
                  gender: props.employee.gender,
                  status: props.employee.status,
              }
            : {
                  name: '',
                  email: '',
                  gender: '',
                  status: '',
              },
        validationSchema: validationSchema,
        validateGender,
        validateStatus,
        onSubmit: (values) => {
            props.onSubmit(values)
        },
    })

    return (
        formik !== null && (
            <form onSubmit={formik.handleSubmit}>
                <div className='form-field'> 
                    <label htmlFor="Name">
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className='errorValidate'>{formik.errors.name}</div>
                    ) : null}
                </div>
                <div className='form-field'>
                    <label htmlFor="Gender">
                        Gender
                    </label>
                    <CustomSelect
                        error={formik.errors.gender}
                        onChange={(value) =>
                            formik.setFieldValue('gender', value.value)
                        }
                        value={formik.values.gender}
                        options={genders}
                    />
                    {formik.errors.gender ? (
                        <div
                            style={{
                                fontSize: 12.5,
                                marginTop: '5px',
                                color: 'red',
                            }}
                        >
                            {formik.errors.gender}
                        </div>
                    ) : null}
                </div>
                <div className='form-field'>
                    <label htmlFor="Email">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className='errorValidate'>{formik.errors.email}</div>
                    ) : null}
                </div>
                <div className='form-field'>
                    <label htmlFor="Status">
                        Status
                    </label>
                    <CustomSelect
                        error={formik.errors.status}
                        onChange={(value) =>
                            formik.setFieldValue('status', value.value)
                        }
                        value={formik.values.status}
                        options={statuses}
                    />
                    {formik.errors.status ? (
                        <div
                            style={{
                                fontSize: 12.5,
                                marginTop: '5px',
                                color: 'red',
                            }}
                        >
                            {formik.errors.status}
                        </div>
                    ) : null}
                </div>
                <button id="btn-submit" type="submit">Submit</button>
            </form>
        )
    )
}

export default EmployeeForm
