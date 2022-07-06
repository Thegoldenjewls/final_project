import React from 'react';
import { Link } from 'react-router-dom';

export default function titleCard({ post }) {
    return (
        <div className='card'>
            <div className='card-body'>
                <Link to={`/posts/${post.id}`}>
                    <h5 className='card-title'>{ post.originalTitle }</h5>
                </Link>
                <h6 className='card-subtitle mb-2 text-muted'>Subscription Service: { post.streaminginfo}</h6>
                <h6 href='card-subtitle mb-2 text-muted'>{ post.streaminginfo }</h6>
                <h6 className='card-subtitle mb-2 text-muted'>IMDB Rating: { post.imdbRating }%</h6>
                <h6 className='card-subtitle mb-2 text-muted'>Run Time: { post.runtime } min</h6>
                <h6 className='card-subtitle mb-2 text-muted'>Overview: { post.overview }</h6>

               

            </div>
        </div>
    )
}
