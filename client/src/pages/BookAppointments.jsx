import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button, Col, DatePicker, Row, TimePicker } from 'antd';
import moment from 'moment';

const BookAppointments = () => {
    const { doctorId } = useParams()

    const [doctor, setDoctor] = useState(null)
    const [isAvailable, setIsavailable] = useState()
    const [date, setDate] = useState()
    const [selectedTimings, setSelectedTimings] = useState()


    const getDoctorDetails = async () => {
        try {
            const res = await axios.post('/api/v1/user/get-doctor-details', { DcId: doctorId }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
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
                                <DatePicker className='mb-3 w-75' format='DD:MM:YYYY' onChange={(value) => { setDate(moment(value).format('DD:MM:YYYY')); }}></DatePicker>
                                <br />
                                <TimePicker.RangePicker className='w-75' format='HH:mm' onChange={(values) => setSelectedTimings([
                                    moment(values[0]).format('HH:mm'),
                                    moment(values[1]).format('HH:mm')
                                ])}></TimePicker.RangePicker>

                            </div>
                            <Button className='primary-button w-75 mt-3'> Check Availability </Button>
                            <Button className='primary-button w-75 mt-3'> Book Now</Button>

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
        </Layout>
    );
};

export default BookAppointments;