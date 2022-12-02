import React from 'react'
import Layout from '../Layout/Layout'
import { Button, Col, Form, Input, Row, TimePicker } from 'antd'
import './pages.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'
import { hideLoading, showLoading } from '../redux/alertReducer'
import { useNavigate } from 'react-router-dom'
import DoctorForm from '../components/DoctorForm'
import moment from 'moment'

const ApplyDoctor = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)
  // const { loading } = useSelector((state) => state.loading)
  const dispatch = useDispatch()

  const onFinish = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/apply-doctor-account', {
        userId: user._id,
        ...values,
        timings: [
          moment(values.timings[0]).format("HH:mm"),
          moment(values.timings[1]).format("HH:mm"),
        ]
      }, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      dispatch(hideLoading())

      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/')
      }
    } catch (error) {
      dispatch(hideLoading())
      toast.error('Something went wrong ')
    }
  }

  return (
    <Layout>
      <h1 className='page-title'>Apply Doctor</h1>
      <DoctorForm onFinish={onFinish}></DoctorForm>
    </Layout>
  )
}

export default ApplyDoctor
