import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function CreatePost(props) {
    let navigate = useNavigate();

    const { loggedIn } = props;
    const { flashMessage } = props;

    useEffect(() => {
        if (!loggedIn){
            flashMessage('You must be logged in', 'danger');
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

        fetch('https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=netflix&type=movie&genre=18&page=1&output_language=en&language=en/blog/posts', {
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
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <button class="btn btn-outline-secondary" type="button">Netflix</button>
                        <button class="btn btn-outline-secondary" type="button">Prime</button>
                        <button class="btn btn-outline-secondary" type="button">Disney</button>
                        <button class="btn btn-outline-secondary" type="button">Hbo</button>
                        <button class="btn btn-outline-secondary" type="button">Hulu</button>
                        <button class="btn btn-outline-secondary" type="button">Peacock</button>
                        <button class="btn btn-outline-secondary" type="button">Paramount</button>
                        <button class="btn btn-outline-secondary" type="button">Starz</button>
                        <button class="btn btn-outline-secondary" type="button">Showtime</button>
                        <button class="btn btn-outline-secondary" type="button">Apple TV</button>
                    </div>
                </div>
                <div>
                    <label htmlFor='type'>Pick a Type to Search</label>
                    <div class="input-group mb-3 text-center">
                        <div class="input-group-prepend">
                            <button class="btn btn-outline-secondary" type="button">Movie</button>
                            <button class="btn btn-outline-secondary" type="button">Series</button>
                        </div>         
                    </div>
                </div>    
                       

                    <input type='submit' className='btn btn-light bg-warning w-100 mt-3' value='Search Available Options' />
                </div>
            </form>
        </>
    )
}
