import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function CreatePost(props) {
    let navigate = useNavigate();

    const { loggedIn } = props;
    const { flashMessage } = props;

    useEffect(() => {
        if (!loggedIn){
            flashMessage('You must be logged in to make changes', 'danger');
            navigate('/login')
        }
    }, [loggedIn, flashMessage, navigate])

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`)

        let title = e.target.title.value;
        let content = e.target.content.value;
        let data = JSON.stringify({title,content})

        fetch('https://kekambas-blog.herokuapp.com/blog/posts', {
            method: 'POST',
            headers: myHeaders,
            body: data
        }).then(res => res.json())
            .then(data => {
                if (data.error){
                    flashMessage(data.error, 'danger')
                } else {
                    flashMessage(`${data.title} has been created`, 'success')
                    navigate('/')
                }
            })
    }

    return (
        <>
            <h4 className='text-center mt-5'>Lets Get Started</h4>
            <form onSubmit={handleSubmit}>
                <div className='from-group'>
                    <label htmlFor='service'>Pick a Streaming Service to View Titles</label>
                    <input type='text' name='title' className='form-control' placeholder='Choose from Netflix, Prime, Disney, Hbo, Hulu, Peacock, Paramount, Starz, Showtime, or Apple' />

                    <label htmlFor='type'>Movie or Series</label>
                    <input type='text' name='content' className='form-control' placeholder='Do you want to look for Movie a or Series?' />

                    <input type='submit' className='btn btn-light bg-warning w-100 mt-3' value='Search Available Options' />
                </div>
            </form>
        </>
    )
}
