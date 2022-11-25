import React from 'react'
import Layout from '../Layout/Layout'
import { Button, Col, Form, Input, Row, TimePicker } from 'antd'
import './pages.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'

const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.user)

  const onFinish = async (values) => {
    try {
      const res = await axios.post('/api/v1/user/apply-doctor-account', {
        userId: user._id,
        ...values,
      })
      if (res.data.success) {
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <Layout>
      <div>
        <h1 className='page-title'>Apply Doctor</h1>

        <div className='mt-4'>
          <h1 className='content-title '>Personal Information</h1>
          <Form onFinish={onFinish} layout='vertical' className='p-2'>
            <Row gutter={16}>
              <Col span={8} xs={24} sm={24} lg={8}>
                <Form.Item
                  label='First Name'
                  name='firstName'
                  rules={[
                    { required: true, message: 'Please input your First Name' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              {/*firstName,lastName,email,phoneNumber,website,address,specialization,experience,feePerConsultation,timings,status */}
              <Col span={8} xs={24} sm={24} lg={8}>
                <Form.Item
                  label='Last Name'
                  name='lastName'
                  rules={[
                    { required: true, message: 'Please input your Last Name' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8} xs={24} sm={24} lg={8}>
                <Form.Item
                  label='Phone'
                  name='phoneNumber'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Phone Number',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8} xs={24} sm={24} lg={8}>
                <Form.Item
                  label='Website'
                  name='website'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your website Address',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8} xs={24} sm={24} lg={8}>
                <Form.Item
                  label='Address'
                  name='address'
                  rules={[
                    { required: true, message: 'Please input your Address' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <h1 className='content-title'>Professional Information</h1>

            <Row gutter={16}>
              <Col span={8} xs={24} sm={24} lg={8}>
                <Form.Item
                  label='Specialization'
                  name='specialization'
                  rules={[
                    {
                      required: true,
                      message: 'input your specialized sector ',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8} xs={24} sm={24} lg={8}>
                <Form.Item
                  label='Experience'
                  name='experience'
                  rules={[
                    { required: true, message: 'input your experience time ' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8} xs={24} sm={24} lg={8}>
                <Form.Item
                  label='Consultation Fee'
                  name='feePerConsultation'
                  rules={[
                    { required: true, message: 'input your Consultation Fee' },
                  ]}
                >
                  <Input type='Number' />
                </Form.Item>
              </Col>

              <Col span={8} xs={24} sm={24} lg={8}>
                <Form.Item
                  label='Appointment Schedule'
                  name='timings'
                  rules={[
                    { required: true, message: 'input your Consultation Fee' },
                  ]}
                >
                  <TimePicker.RangePicker format='HH:mm' />
                </Form.Item>
              </Col>
            </Row>

            <div className='d-flex justify-content-end'>
              <Button
                className='primary-button apply-button'
                type='primary'
                htmlType='submit'
              >
                Apply Account
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  )
}

export default ApplyDoctor
