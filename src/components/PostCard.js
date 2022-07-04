import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
    return (
        <div className='card'>
            <div className='card-body'>
                <Link to={`/posts/${post.id}`}>
                    <h5 className='card-title'>{ post.title }</h5>
                </Link>
                <h6 className='card-subtitle mb-2 text-muted'>By: { post?.author?.username }</h6>
                <p className='card-text'>{ post.content }</p>
            </div>
        </div>
    )
}
