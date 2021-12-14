import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EmployeeForm from '../EmployeeForm'
import './Employee.css'
import Pagination from './Pagination'

//Call API to get list of employee
const _getEmployee = async ({ page }) => {
    let _page = page ? page : 1
    let url = `https://gorest.co.in/public/v1/users?page=${_page}`
    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then((res) => resolve(res.data))
            .catch((err) => console.log(`getEmployee err`, err))
    })
}

function Employee(props) {
    const [employees, setEmployees] = useState([])
    const [employee, setEmployee] = useState(null)
    
    //The current page
    const [page, setPage] = useState(1)

    //Total of pages
    const [totalPages, setTotalPages] = useState(1)

    // Get the lis of employee
    const getEmployees = async ({ page }) => {
        console.log('getEmployees')
        // call api get list
        let res = await _getEmployee({ page })
        if (!res) {
            console.log(`No data of employee`)
        } else {
            setEmployees(res.data)
            setTotalPages(res.meta.pagination.pages)
        }
    }

    useEffect(() => {
        getEmployees({ page })
    }, [])

    // Function is call when user need to create new employee
    const createEmployee = async (formData) => {
        console.log('createEmployee')
        // call api create

        const res = await axios({
            method: 'post',
            url: 'https://gorest.co.in/public/v1/users',
            data: formData,
            headers: {
                Authorization:
                    'Bearer ff204d63332ec73ee6b9256320e985acae910bb57263977debf581bfd96b3169',
            },
        })
        getEmployees({ page })
    }

    // Function is call when user need to update information of employee
    const updateEmployee = async (formData) => {
        console.log('updateEmployee')
        // call api udpate
        const res = await axios({
            method: 'put',
            url: `https://gorest.co.in/public/v1/users/${employee.id}`,
            data: formData,
            headers: {
                Authorization:
                    'Bearer ff204d63332ec73ee6b9256320e985acae910bb57263977debf581bfd96b3169',
            },
        })
        getEmployees({ page })

    }

    // Function is call when user need to delete employee
    const deleteEmployee = async (id) => {
        console.log('deleteEmployee id:', id)
        // call api delete
        const res = await axios({
            method: 'delete',
            url: `https://gorest.co.in/public/v1/users/${id}`,
            headers: {
                Authorization:
                    'Bearer ff204d63332ec73ee6b9256320e985acae910bb57263977debf581bfd96b3169',
            },
        })
        getEmployees({ page })
    }

    //Check the change of page when user click for a new page
    const onPaginationChange = (page) => {
        setPage(page)
        getEmployees({ page })

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
    }
    return (
        <div className="form">
            <h1 id="title">EMPLOYEE</h1>
            {employee === null ? (
                <div>
                    <h3>CREATE</h3>
                    <EmployeeForm
                        onSubmit={(formData) => {
                            console.log(`formData`, formData)
                            createEmployee(formData)
                        }}
                    />
                </div>
            ) : (
                <div>
                    <h3>UPDATE</h3>
                    <EmployeeForm
                        employee={employee}
                        onSubmit={(formData) => {
                            updateEmployee(formData)
                        }}
                    />
                </div>
            )}

            <hr />
            <h3 className="list-item-title">List employees</h3>
            <div className="list-items">
                {employees.map((item, index) => (
                    <div key={index} className="list-item">
                        <div>{`ID: ${item.id}`}</div>
                        <div>{`Name: ${item.name}`}</div>
                        <div>{`Gender: ${item.gender}`}</div>
                        <div>{`Email: ${item.email}`}</div>
                        <div>{`Status: ${item.status}`}</div>
                        <div id="btn-modify-group">
                            <button
                                className="btn-modify"
                                onClick={() => {
                                    setEmployee(item)
                                    window.scrollTo({
                                        top: 0,
                                        left: 0,
                                        behavior: 'smooth',
                                    })
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="btn-modify"
                                onClick={() => {
                                    if (
                                        window.confirm(
                                            'Confirm delete employee'
                                        )
                                    ) {
                                        deleteEmployee(item.id)
                                    }
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onChange={onPaginationChange}
                />
            </div>
        </div>
    )
}

export default Employee