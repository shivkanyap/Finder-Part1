import React from 'react'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'
// import ReposItem from '../repos/ReposItem'
import {Link} from 'react-router-dom'
import Repos from '../repos/Repos'
class User extends React.Component{
    componentDidMount(){
        this.props.getUser(this.props.match.params.login)
        this.props.getUserRepos(this.props.match.params.login)
    }
    static propTypes={
        getUser:PropTypes.func.isRequired,
        user:PropTypes.object.isRequired,
        isLoading:PropTypes.bool.isRequired,
        getUserRepos:PropTypes.func.isRequired,
        repos:PropTypes.func.isRequired

    }
    render()
    {
       const  {
            name,
            avatar_url,
            location,
            bio,
            company,
            website,
            blog,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable

        }=this.props.user;
        const {isLoading,repos}=this.props;
        if(isLoading) return <Spinner/>
        
        return(
            <React.Fragment>
                <Link to='/' className='btn btn-light'>
                    Back to search
                </Link>
                Hireable:{''}
                {hireable?(
                    <i className='fas fa-check text-success'/>
                ):(
                    <i className='fas fa-times-circle text-danger'/>
                )}
                <div className="card grid-2">
                    <div className="all-center">
                        <img 
                        src={avatar_url}
                        alt=""
                        className="roind-img"
                        style={{width:'150px'}}/>
                        <h1>{name}</h1>
                <p>Location: {location}</p>
                    </div>
                    <div>
                        {bio && (
                            <React.Fragment>
                                <h1>Bio</h1>
                                <p>{bio}</p>
                            </React.Fragment>
                        )}
                        <a href={html_url} className="btn btn-dark my-1"> Visit Github Profile</a>
                        <ul>
                            <li>
                                {login && (
                                    <React.Fragment>
                                        <strong>Username:</strong>{name}
                                    </React.Fragment>
                                )}
                            </li>
                            <li>
                                {company && (
                                    <React.Fragment>
                                        <strong>Company:</strong>{company}
                                    </React.Fragment>
                                )}
                            </li>
                            <li>
                                {blog && (
                                    <React.Fragment>
                                        <strong>Website</strong>{blog}
                                    </React.Fragment>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="badge badge-primary">Followers:{followers}</div>
                    <div className="badge badge-success">Following:{following}</div>
                    <div className="badge badge-danger">Public Repo:{public_repos}</div>
                    <div className="badge badge-dark">Piblic Gits:{public_gists}</div>
                </div>
                <Repos repos ={repos}/>
            </React.Fragment>
        )
    }
}
export default User