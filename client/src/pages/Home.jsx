import React, { useEffect } from 'react';
import axios from 'axios';

const Home = () => {

    const getData = async () => {
        try {
            const res = await axios.post('/api/v1/user/get-user-by-id', {}, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => { }, [
        getData()
    ])




    return (
        <div>
            <h1>Home</h1>
        </div>
    );
};

export default Home;