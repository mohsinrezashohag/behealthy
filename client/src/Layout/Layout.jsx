import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Layout.css'

const Layout = ({ children }) => {

  const location = useLocation()
  const navigate = useNavigate()
  const [collapse, setCollapse] = useState(false)

  const { loading } = useSelector(state => state.alerts)
  const { user } = useSelector((state) => state.user)
  console.log(loading);
  const userMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'ri-home-line',
    },
    {
      name: 'Appointments',
      path: '/appointments',
      icon: 'ri-file-list-line',
    },
    {
      name: 'Apply Doctor',
      path: '/apply-doctor',
      icon: 'ri-hospital-line',
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: 'ri-user-line',
    },
  ]

  const adminMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'ri-home-line',
    },
    {
      name: 'Users',
      path: '/users',
      icon: 'ri-file-list-line',
    },
    {
      name: 'Doctors',
      path: '/doctors',
      icon: 'ri-hospital-line',
    },
  ]

  const menuItems = user?.isAdmin ? adminMenu : userMenu

  return (
    <div className='main'>
      <div className='layout d-flex'>
        <div className={`sidebar ${collapse && 'collapsed-sidebar'}`}>
          <div className='sidebar-header'>
            <h1 className='logo'>BH</h1>
          </div>

          {!loading && <div className='menu'>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path

              return (
                <div
                  key={item.name}
                  className={`d-flex menu-item ${isActive && 'active-menu-link'
                    }`}
                >
                  <i className={item.icon}></i>
                  {!collapse && <Link to={item.path}>{item.name}</Link>}
                </div>
              )
            })}

            <div className='d-flex menu-item'>
              <i className='ri-logout-box-line'></i>

              <Link onClick={() => {
                localStorage.clear()
                navigate('/login')
              }}>Logout
              </Link>

            </div>
          </div>}

        </div>

        <div className='content'>
          <div className='header'>
            <div className='collapse-action'>
              {collapse ? (
                <i
                  className='ri-menu-line'
                  onClick={() => setCollapse(false)}
                ></i>
              ) : (
                <i
                  className='ri-close-line'
                  onClick={() => setCollapse(true)}
                ></i>
              )}
            </div>

            <div className='d-flex align-items-center justify-content-center'>
              <div>
                <i className='ri-notification-line header-action-icon'></i>
              </div>
              <div className='d-flex align-items-center justify-content-center'>

                <i className='ri-user-line header-action-icon'></i>


                <p className='user-name'>{user?.name}</p>

              </div>
            </div>



            {/* <div className='user-and-notification d-flex align-items-center justify-content-center'>
              <i className='ri-notification-line header-action-icon'></i>
              <div className='d-flex align-items-center justify-content-center'>
                <i className='ri-user-line header-action-icon'></i>
                <p>{user?.name}</p>
              </div>
            </div> */}



          </div>

          <div className='body'>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Layout
