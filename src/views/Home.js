import React, { Component } from 'react'
import PostCard from '../components/TitleCard';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: []
        }
    }

    
    // componentDidMount(){
    //     fetch('https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=netflix&type=movie&genre=18&page=1&output_language=en&language=en',{
    //         method:"get",
    //         headers:{
    //         'X-RapidAPI-Key': '90e9ec67d0msh2ff1393dd7fd379p1a3d08jsne0257d03f53d',
    //         'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => this.setState({posts:data.results}))
    // }

    sortPosts = (method) => {
        const sortingMethods = {
            byTitleAsc: (a, b) => a.title > b.title ? 1 : -1,
            byTitleDesc: (a, b) => a.title > b.title ? -1 : 1,
        }
        let sortedPosts = [...this.state.posts].sort(sortingMethods[method])
        this.setState({ posts: sortedPosts })
    }

    render() {
        return (
            <>
                <h1 className='text-center mt-5'>Saved Titles</h1>
                <hr></hr>
                <div className='offset-8 col-4'>
                    <select onChange={(e) => this.sortPosts(e.target.value)} className='form-select'>
                        <option>Sort Saved Titles</option>
                        <option value='byTitleAsc'>By Title Ascending</option>
                        <option value='byTitleDesc'>By Title Descending</option>
                    </select>
                </div>
                {this.state.posts.map(p => <PostCard post={p} key={p.id} />)}
            </>
        )
    }
}
