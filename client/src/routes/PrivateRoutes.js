import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/alertReducer'
import { setUser } from '../redux/userReducer'

const PrivateRoutes = (props) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const getUser = async () => {
    try {
      dispatch(showLoading())
      const res = await axios.post(
        '/api/v1/user/get-user-by-id',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )

      if (res.data) {
        dispatch(hideLoading())
        console.log(res.data.data)
        dispatch(setUser(res.data.data))
      } else {
        dispatch(hideLoading())
        localStorage.clear()
        navigate('/login')
      }
    } catch (error) {
      dispatch(hideLoading())
      localStorage.clear()
      navigate('/login')
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  if (localStorage.getItem('token')) {
    return props.children
  } else {
    return <Navigate to='/login'></Navigate>
  }
}

export default PrivateRoutes
