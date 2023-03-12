import React, { useState, useEffect } from 'react'
// import { Button } from '@mui/material'
import axios from 'axios'

import { Link, useNavigate } from 'react-router-dom'
import { CCard, CCardBody, CCardGroup, CCol, CContainer, CRow } from '@coreui/react'
import SelectPurpose from './multiform/SelectPurpose.js'
import SelectBusiness from './multiform/SelectBusiness.js'
import SelectLanguage from './multiform/selectLanguage.js'
import BAddress from './multiform/BAddress.js'
import Button from '@material-ui/core/Button'


import { isAutheticated } from 'src/auth'


const AddBusiness = () => {
    const token = isAutheticated()
    const [productId, setProductId] = useState('')
    const [viewState, setViewState] = useState(1)


    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState({
        business: '',
        purpose: '',

        language: [],
        country: '',
        state: '',
        city: '',
        address_Line_1: '',
        address_Line_2: '',
        pincode: ''
    })



    console.log(data)

    const handleView = (n) => {
        if (viewState === n) return
        setViewState(n)
    }
    const handleSubmit = () => {
        if (
            data.address_Line_1.trim() === '' ||
            data.address_Line_2.trim() === '' ||

            data.business === '' ||
            data.purpose.trim() === '' ||
            data.language === '' ||
            data.country === '' ||
            data.state === '' ||
            data.city === '' ||
            data.pincode.trim() === ''
        ) {
            swal({
                title: 'Warning',
                text: 'Fill all mandatory fields',
                icon: 'error',
                button: 'Close',
                dangerMode: true,
            })
            return
        }
        setLoading(true)
        const formData = new FormData()
        formData.set('address_Line_1', data.address_Line_1)
        formData.set('address_Line_2', data.address_Line_2)

        formData.set('purpose', data.purpose)
        formData.set('business', data.business)
        formData.set('language', data.language)

        formData.set('country', data.country)
        formData.set('city', data.city)
        formData.set('state', data.state)


        formData.set('pincode', data.pincode)

        axios
            .post(`/api/businesses/add`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/formdata',
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then((res) => {
                swal({
                    title: 'Added',
                    text: res?.data?.message ? res?.data?.message : 'Business added successfully!',
                    icon: 'success',
                    button: 'Return',
                })
                setLoading(false)
                navigate('/businesses', { replace: true })
            })
            .catch((err) => {
                setLoading(false)
                const message = err.response?.data?.message || 'Something went wrong!'
                swal({
                    title: 'Warning',
                    text: message,
                    icon: 'error',
                    button: 'Retry',
                    dangerMode: true,
                })
            })
    }

    return (
        <CContainer>
            <CRow className="mt-3">
                <CCol md={12}>
                    <div
                        className="
                    page-title-box
                    d-flex
                    align-items-center
                    justify-content-between
                  "
                    >
                        <div style={{ fontSize: '22px' }} className="fw-bold">
                            Add Business
                        </div>
                        <div className="page-title-right">
                            <div className="page-title-right">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        fontWeight: 'bold',
                                        marginBottom: '1rem',
                                        textTransform: 'capitalize',
                                    }}
                                    onClick={() => {
                                        handleSubmit()

                                    }}
                                    disabled={data.address_Line_1.trim() === '' ||
                                        data.address_Line_2.trim() === '' ||

                                        data.business === '' ||
                                        data.purpose.trim() === '' ||
                                        data.language === '' ||
                                        data.country === '' ||
                                        data.state === '' ||
                                        data.city === '' ||
                                        data.pincode.trim() === ''}
                                >
                                    {loading ? 'Loading' : 'Add Now'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </CCol>
            </CRow>
            <CRow>
                <CCol md={9} className="mt-1">
                    <CCardGroup>
                        <CCard className="p-4 mb-3">
                            <CCardBody>
                                {viewState === 1 && (
                                    <SelectBusiness
                                        data={{ data, setData }}
                                        // categories={categories}
                                        handleView={handleView}
                                        // ProductId={{ productId, setProductId }}
                                        loading={{ loading, setLoading }}
                                    />
                                )}
                                {viewState === 2 && (
                                    <SelectPurpose
                                        data={{ data, setData }}
                                        handleView={handleView}

                                        // productId={productId}
                                        // data={{ varients, setVarients }}
                                        // taxes={taxes}
                                        // sizes={sizes}
                                        loading={{ loading, setLoading }}
                                    />
                                )}
                                {viewState === 3 && (
                                    <SelectLanguage
                                        data={{ data, setData }}
                                        handleView={handleView}

                                        // productId={productId}
                                        // data={{ images, setImages }}
                                        loading={{ loading, setLoading }}
                                    />
                                )}
                                {viewState === 4 && (
                                    <BAddress
                                        data={{ data, setData }}
                                        handleView={handleView}

                                        // productId={productId}
                                        // data={{ images, setImages }}
                                        loading={{ loading, setLoading }}
                                    />
                                )}
                            </CCardBody>
                        </CCard>
                    </CCardGroup>
                </CCol>
                <CCol md={3} className="mt-1">
                    <CCardGroup>
                        <CCard>
                            <CCardBody>
                                <div className="d-grid gap-2">
                                    <button
                                        className={viewState === 1 ? 'btn btn-light' : 'btn btn-info text-white'}
                                        type="button"
                                        onClick={() => handleView(1)}
                                    >
                                        Select Business Type

                                    </button>
                                    <button
                                        className={viewState === 2 ? 'btn btn-light' : 'btn btn-info text-white'}
                                        type="button"
                                        onClick={() => handleView(2)}
                                    >
                                        Select Purpose

                                    </button>
                                    <button
                                        className={viewState === 3 ? 'btn btn-light' : 'btn btn-info text-white'}
                                        type="button"
                                        onClick={() => handleView(3)}
                                    >
                                        Select Languages
                                    </button>
                                    <button
                                        className={viewState === 4 ? 'btn btn-light' : 'btn btn-info text-white'}
                                        type="button"
                                        onClick={() => handleView(4)}
                                    >
                                        Address
                                    </button>
                                </div>
                            </CCardBody>
                        </CCard>
                    </CCardGroup>
                </CCol>
            </CRow>
        </CContainer>
    )
}

export default AddBusiness