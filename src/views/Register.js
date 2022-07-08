import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register(props) {

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(e);

        // Check that the passwords match
        let password = e.target.password.value;
        let confirmPass = e.target.confirmPass.value;
        if(password !== confirmPass){
            props.flashMessage('Passwords do not match', 'warning')
        } else {
            // Set up the request to Flask API
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json')

            let data = JSON.stringify({
                username: e.target.username.value,
                email: e.target.email.value,
                password: password
            })

            fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: myHeaders,
                body: data
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    props.flashMessage('You have successfully registered', 'success')
                    navigate('/')
                })
        }

    }

    return (
        <>
        <h4 className='text-center'>Register</h4>
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input type='text' className='form-control' placeholder='Enter Email' name='email' />

                <label htmlFor='username'>Username</label>
                <input type='text' className='form-control' placeholder='Enter Username' name='username' />

                <label htmlFor='password'>Password</label>
                <input type='password' className='form-control' placeholder='Enter Password' name='password' />

                <label htmlFor='confirmPass'>Confirm Password</label>
                <input type='password' className='form-control' placeholder='Enter Password Again' name='confirmPass' />

                <input type='submit' className='btn btn-warning w-100 mt-3' value='Register' />

            </div>
        </form>
        </>
    )
}
