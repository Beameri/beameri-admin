import React, { useEffect } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,

    CForm,
    CFormInput,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cil3d, cilAirplaneMode, cilBadge, cilBalanceScale, cilBoatAlt, cilBriefcase, cilBuilding, cilCalendar, cilGlobeAlt, cilListNumbered, cilLocationPin, cilLockLocked, cilMoney, cilNoteAdd, cilNotes, cilPeople, cilPhone, cilShareBoxed, cilUser, cilUserPlus } from '@coreui/icons'
import { useState } from 'react';
import axios from 'axios';
import { isAutheticated } from 'src/auth';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Country } from 'country-state-city';


const AddAirwaysBill = () => {
    const { token } = isAutheticated()
    const countries = Country.getAllCountries();
    const [bill, setBill] = useState({
        AWB_No: '',
        Actual_Billing: '',
        Actual_Margin: 'Andhra Pradesh',
        country: 'India',
        Actual_Weight: '',
        Client_Name: '',
        Customer_Address: "",
        Customer_Billing: "",
        Customer_Name: "",
        Customer_Phone: "",
        Date_Of_Dispatch: "",
        Dimension_Weight: "",
        Dimensions: "",
        Invoice_No: "",
        Item_Name: ""
        , Logistic_Name: "",
        Order_No: "",
        Projected_Margin: "",
        Recieved_Amount: "",
        Recieved_Date: "",
        Shipment_Charges: "",
        Shipments: "",
        Shipped_From: "",
        Sr_No: "",
        Total_Weight: "",
    })
    const [showCouriers, setShowCouriers] = useState([])
    const [showVendors, setShowVendors] = useState([])
    const [code, setCode] = useState()
    const history = useHistory()

    useEffect(() => {
        const generateCode = () => {
            setCode(Math.round(Math.random() * 1000000000))
        }


        const getData = async () => {

            const couriers = await axios.get('/api/courier',
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-type": "Application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
            const vendors = await axios.get('/api/vendor/view',
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-type": "Application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })

            // console.log(couriers.data.Pincode);
            // console.log(vendors.data.Stores);
            setShowVendors(vendors.data.Stores)
            setShowCouriers(couriers.data.Pincode)
        }
        getData();
        generateCode()
    }, [])


    const formatDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;
        return today
    }

    const handleChange = (e) => (event) => {
        setBill({ ...bill, [e]: event.target.value });
    };
    const handleClick = async () => {
        let res = await axios.post('/api/airways/add', { ...bill, code }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if ((res.data.message === "Success")) {
            console.log(res.data);
            Swal.fire({
                title: 'Done',
                text: 'Bill Added',
                icon: 'success',
                confirmButtonText: 'ok',
                confirmButtonColor: '#303c54',
                iconColor: '#303c54'
            }).then(() => {
                history.push('/airwaysbill')
            });
        } else {
            Swal("Oops!", "Something went wrong!", "error");
        }
    }
    console.log(bill);

    return <div className="bg-light min-vh-100 d-flex flex-row align-items-start">
        <CContainer>
            <CRow className="justify-content-start">
                <CCol md={8}>
                    <CForm>
                        <h1>Add New Bill</h1>
                        <p className="text-medium-emphasis">Fill the fields and submit to add a new bill</p>
                        {/* <CRow className='flex-row align-items-center'> */}
                        {/* <CCol md={2} ><h4>ID:</h4></CCol> */}
                        {/* <CCol><h6>{code}</h6></CCol> */}
                        {/* <p className="text-medium-emphasis">(auto-generated)</p> */}
                        {/* </CRow> */}
                        {/* <CRow className='flex-row align-items-center'> */}
                        {/* <CCol md={2} ><h4>Date:</h4></CCol> */}
                        {/* <CCol><h6>{formatDate()}</h6></CCol> */}
                        {/* <p className="text-medium-emphasis">(auto-generated)</p> */}
                        {/* </CRow> */}
                        {/* <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormSelect
                                aria-label="Default select example"
                                onChange={handleChange('vendor_name')}
                            >
                                <option value='India'>Select Vendor</option>{
                                    showVendors.map((item) =>
                                        <option value={item.vendor_name}>{item.vendor_name}</option>
                                    )
                                }
                            </CFormSelect>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilLocationPin} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Address Line 1"
                                // autoComplete="address"
                                onChange={handleChange('from_address_1')}
                            />
                            <CFormInput
                                type="text"
                                placeholder="Address Line 2(area)"
                                autoComplete="address2"
                                onChange={handleChange('from_address_2')}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilPeople} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="To (Name)"
                                autoComplete="toname"
                                onChange={handleChange('to_name')}
                            />

                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilLocationPin} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Address Line 1"
                                // autoComplete="address"
                                onChange={handleChange('to_address_1')}
                            />
                            <CFormInput
                                type="text"
                                placeholder="Address Line 2(area)"
                                autoComplete="address2"
                                onChange={handleChange('to_address_2')}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cil3d} />
                            </CInputGroupText>
                            <CFormSelect
                                aria-label="Default select example"
                                onChange={handleChange('courier')}
                            >
                                <option value='India'>Select Courier</option>{
                                    showCouriers.map((item) =>
                                        <option value={item._id}>{item.name}</option>
                                    )
                                }
                            </CFormSelect>
                        </CInputGroup> */}
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilAirplaneMode} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="AWB"
                                autoComplete="AWB"
                                onChange={handleChange('AWB_No')}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilListNumbered} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Order No
"
                                autoComplete="AWB"
                                onChange={handleChange('Order_No')}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormSelect
                                aria-label="Default select example"
                                onChange={handleChange('Client_Name')}
                            >
                                <option value='India'>Select Vendor</option>{
                                    showVendors.map((item) =>
                                        <option value={item.code}>{item.vendor_name}</option>
                                    )
                                }
                            </CFormSelect>
                        </CInputGroup>
                        {/* <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Client Name"
                                autoComplete="AWB"
                                onChange={handleChange(' Client_Name')}
                            />
                        </CInputGroup> */}
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilBadge} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Item Name"
                                autoComplete="AWB"
                                onChange={handleChange('Item_Name')}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Customer Name"
                                autoComplete="AWB"
                                onChange={handleChange('Customer_Name')}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilPhone} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Customer Phone"
                                autoComplete="AWB"
                                onChange={handleChange(' Customer_Phone')}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilLocationPin} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Customer Address"
                                autoComplete="AWB"
                                onChange={handleChange('Customer_Address')}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilGlobeAlt} />
                            </CInputGroupText>
                            <CFormSelect
                                aria-label="Default select example"
                                onChange={handleChange("country")}
                            >
                                <option value='India'>Select Country</option>{
                                    countries.map((item) =>
                                        <option value={item.name}>{item.name}</option>
                                    )
                                }
                            </CFormSelect>

                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilAirplaneMode} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Shipped From"
                                autoComplete="AWB"
                                value='India'
                                onChange={handleChange('Shipped_From')}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormSelect
                                aria-label="Default select example"
                                onChange={handleChange('Logistic_Name')}
                            >
                                <option value='India'>Select Courier</option>{
                                    showCouriers.map((item) =>
                                        <option value={item.code}>{item.name}</option>
                                    )
                                }
                            </CFormSelect>
                        </CInputGroup>
                        {/* <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilBuilding} />
                            </CInputGroupText>
                            
                            <CFormInput
                                type="text"
                                placeholder="Logistic Name
"
                                autoComplete="AWB"
                                onChange={handleChange('Logistic_Name')}
                            />
                        </CInputGroup> */}
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilCalendar} />
                                DOD
                            </CInputGroupText>
                            <CFormInput
                                type="date"
                                placeholder="Date of Dispatch
"
                                autoComplete="AWB"
                                onChange={handleChange('Date_Of_Dispatch')}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilBoatAlt} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Shipments
"
                                autoComplete="AWB"
                                onChange={handleChange('Shipments')}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cil3d} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Dimensions
"
                                autoComplete="AWB"
                                onChange={handleChange('Dimensions')}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilBalanceScale} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Dimenssion Weight
"
                                autoComplete="AWB"
                                onChange={handleChange('Dimension_Weight')}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilBalanceScale} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Actual Weight
"
                                autoComplete="AWB"
                                onChange={handleChange('Actual_Weight')}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilBalanceScale} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Total Weight
"
                                autoComplete="AWB"
                                onChange={handleChange('Total_weight')}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilMoney} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Shipment Charges
"
                                autoComplete="AWB"
                                onChange={handleChange('Shipment_Charges')}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilNotes} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Actual Billing
"
                                autoComplete="AWB"
                                onChange={handleChange('Actual_Billing')}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilNotes} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Customer Billing
"
                                autoComplete="AWB"
                                onChange={handleChange('Customer_Billing')}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilMoney} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Projceted Margin
"
                                autoComplete="AWB"
                                onChange={handleChange('Projected_Margin')}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilMoney} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Actual Margin"
                                autoComplete="AWB"
                                onChange={handleChange('Actual_Margin')}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilListNumbered} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Invoice No"
                                autoComplete="AWB"
                            // onChange={handleChange('AWB')}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilMoney} />
                            </CInputGroupText>
                            <CFormInput
                                type="text"
                                placeholder="Received Amount"
                                autoComplete="AWB"
                                onChange={handleChange('Invoice_No')}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                                <CIcon icon={cilCalendar} />
                                RD

                            </CInputGroupText>
                            <CFormInput
                                type="date"
                                placeholder="Received Date"
                                autoComplete="AWB"
                                onChange={handleChange('Recieved_Date')}
                            />
                        </CInputGroup>

                        <CButton color="dark" className="px-4" onClick={() => handleClick()}>
                            Submit
                        </CButton>

                    </CForm>

                </CCol>
            </CRow>
        </CContainer>
    </div>;;
};

export default AddAirwaysBill;