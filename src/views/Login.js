import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let username = e.target.username.value;
        let password = e.target.password.value;

        let myHeaders = new Headers();
        myHeaders.append('Authorization', 'Basic ' + btoa(`${username}:${password}`))

        let response = await fetch('http://localhost:5000/api/token', { headers: myHeaders })
        let data = await response.json()
        localStorage.setItem('token', data.token);
        localStorage.setItem('expiration', data.expiration);

        props.login();

        props.flashMessage('You have successfully logged in', 'success')

        navigate('/')
    }

    return (
        <>
        <h4 className='text-center'>Login</h4>
        <form onSubmit={handleSubmit}>
            <div className='form-group'>

                <label htmlFor='username'>Username</label>
                <input type='text' className='form-control' placeholder='Enter Username' name='username' />

                <label htmlFor='password'>Password</label>
                <input type='password' className='form-control' placeholder='Enter Password' name='password' />

                <input type='submit' className='btn btn-warning w-100 mt-3' value='Login' />

            </div>
        </form>
        </>
    )
}
