import { Tabs } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';

const Notifications = () => {
    const { user } = useSelector(state => state.user)
    const markAllAsSeen = async () => {
        try {
            const res = await axios.post('/api/v1/user/mark-all-as-seen', { userId: user?._id })
            if (res.data.data) {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
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
                            <h6>Delete All</h6>
                        </div>

                    </Tabs.TabPane>

                </Tabs>
            </div>

        </Layout >
    );
};

export default Notifications;