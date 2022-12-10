import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './component.css'

const Doctor = (props) => {
    const doctor = props.doctor;
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()
    const onlyUser = !user?.isDoctor && !user?.isAdmin
    return (
        <div className={`card text-start p-2 ${onlyUser && 'doctor-div'}`} onClick={() => {
            if (onlyUser) {
                navigate(`/doctor-appointment/${doctor._id}`)
            }
        }}>
            <h5>{doctor.firstName} {doctor.lastName} </h5>
            <hr />
            <p><span className='fw-bold me-2'>Specialty :</span>{doctor.specialization}</p>
            <p><span className='fw-bold me-2'>Address :</span>{doctor.address}</p>
            <p><span className='fw-bold me-2'>Consultation Fee :</span>{doctor.feePerConsultation}</p>
            <p><span className='fw-bold me-2'>Consultation Time : </span>{doctor.timings[0]} - {doctor.timings[1]}</p>
        </div >
    );
};

export default Doctor;