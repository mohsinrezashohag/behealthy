import { Tabs } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { hideLoading, showLoading } from '../redux/alertReducer';
import { useNavigate } from 'react-router-dom';


const Notifications = () => {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const markAllAsSeen = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/mark-all-as-seen', { userId: user?._id }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token")
                }
            })
            if (res.data.data) {
                dispatch(hideLoading())
                toast.success(res.data.message);
                window.location.reload()

            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error(error.message);
        }
    }

    const deleteAllNotifications = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/delete-all-notifications', { userId: user?._id }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token")
                }
            })
            if (res.data.data) {
                dispatch(hideLoading())
                toast.success(res.data.message);
                window.location.reload();
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error(error.message);

        }
    }


    return (
        <Layout>
            <h1 className="page-title">Notifications</h1>

            <div className="p-3">
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Unseen Notifications" key="1">
                        <div className="d-flex justify-content-between">
                            <div >
                                {user?.unseenNotifications.map(notification => <p key={notification.type} className="notification-message">
                                    {notification.message}
                                </p>)}
                            </div>
                            <h6 className="custom-link" onClick={() => markAllAsSeen()}>Mark All As Read</h6>

                        </div>
                    </Tabs.TabPane>

                    <Tabs.TabPane tab="Seen Notifications" key="2">
                        <div className="d-flex justify-content-between">
                            <div >
                                {user?.seenNotifications.map(notification => <p key={notification.type} className="notification-message">
                                    {notification.message}
                                </p>)}
                            </div>
                            <h6 className='custom-link' onClick={() => deleteAllNotifications()}>Delete All</h6>
                        </div>

                    </Tabs.TabPane>

                </Tabs>
            </div>

        </Layout >
    );
};

export default Notifications;