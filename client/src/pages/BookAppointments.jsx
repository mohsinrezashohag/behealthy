import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button, Col, DatePicker, Row, TimePicker } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertReducer';

const BookAppointments = () => {
    const { doctorId } = useParams()
    const { user } = useSelector(state => state.user)
    const [doctor, setDoctor] = useState(null)
    const [isAvailable, setIsAvailable] = useState(false)
    const [date, setDate] = useState()
    const [time, setTime] = useState()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getDoctorDetails = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/get-doctor-details', { doctorId: doctorId }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            dispatch(hideLoading())
            if (res.data.success) {
                setDoctor(res.data.data);
            }

        } catch (error) {
            console.log(error);
            toast.error("Error loading doctor")
        }
    }

    useEffect(() => {
        getDoctorDetails()
    }, [])



    const bookAppointment = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/book-appointment', {
                doctorId: doctorId,
                userId: user._id,
                userInfo: user,
                doctorInfo: doctor,
                date: date,
                time: time
            },
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                }
            )
            dispatch(hideLoading())
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/appointments')
            }

        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    const checkAvailability = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/check-availability', {
                doctorId: doctorId,
                date: date,
                time: time
            },
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                }
            )
            dispatch(hideLoading())
            if (res.data.success) {
                setIsAvailable(true)
                toast.success("Appointment Schedule Available")
            }
            if (!res.data.success) {
                setIsAvailable(false)
                toast.error("Appointment Schedule Not  Available")
            }



        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }





    return (
        <Layout>
            <div>
                {/* <h1 className="page-title">Book Appointments</h1> */}

                <div className="mt-5 text-start ms-2 text-capitalize">
                    <h2>{doctor?.firstName}</h2>
                    <hr />
                    <Row className="mt-5">
                        <Col span={12} >
                            <h3><span className='fw-bold me-2 pt-5'>Consultation : </span>{doctor?.timings[0]} - {doctor?.timings[1]}</h3>

                            <div className='mt-5'>
                                <DatePicker className='mb-3 w-75' format='DD:MM:YYYY'
                                    onChange={
                                        (value) => {
                                            setDate(moment(value).format('DD:MM:YYYY'))
                                            setIsAvailable(false)
                                        }}></DatePicker>
                                <br />
                                <TimePicker className='w-75' format='HH:mm' onChange={
                                    (value) => {
                                        setTime(moment(value).format('HH:mm'))
                                        setIsAvailable(false)

                                    }}></TimePicker>

                            </div>
                            {!isAvailable && <Button className='primary-button w-75 mt-3' onClick={() => checkAvailability()}> Check Availability </Button>}
                            {isAvailable && <Button className='primary-button w-75 mt-3' onClick={() => { bookAppointment() }}> Book Now</Button>
                            }
                        </Col>
                        <Col span={12} >
                            <h1>Basic Information</h1>
                            <p><span className='fw-bold me-2'>Specialty :</span>{doctor?.specialization}</p>
                            <p><span className='fw-bold me-2'>Experience :</span>{doctor?.experience}</p>
                            <p><span className='fw-bold me-2'>Consultation Fee :</span>{doctor?.feePerConsultation}</p>
                            <p><span className='fw-bold me-2'>Consultation Time : </span>{doctor?.timings[0]} - {doctor?.timings[1]}</p>
                            <p><span className='fw-bold me-2'>Address : </span>{doctor?.address}</p>
                        </Col>
                    </Row>
                </div>
            </div>
        </Layout >
    );
};

export default BookAppointments;