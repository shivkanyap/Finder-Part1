import React from 'react';
import './App.css';
import axios from 'axios'
import {BrowserRouter ,Switch,Route} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Users from './components/Users/Users'
import User from './components/Users/User'
import Search from './components/Users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'

class App extends React.Component {
  state={
    users:[],
    repos:[],
    isLoading:false,
    alert:null,
    user:{}
  }
  async componentDidMount(){
    this.setState({isLoading:true})
    const res= await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({users:res.data,isLoading:false})

  }
  clearUsers=()=>{
    this.setState({users:[],isLoading:true})
  }
  searchUsers= async(text)=>{this.setState({isLoading:true})

    const res= await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({users:res.data.items,isLoading:false})
  }
  //get all  single user
  getUser=async(username)=>{
    this.setState({isLoading:true})

    const res= await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({user:res.data,isLoading:false})

  }
  getUserRepos=async(username)=>{
    this.setState({isLoading:true})

    const res= await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({repos:res.data,isLoading:false})

  }
  
  setAlert=(msg,type)=>{
    this.setState({alert:{msg:msg,type:type}})
    setTimeout(()=>this.setState({alert:null}),5000)
  }

  render(){
    const {users,isLoading,user,repos }=this.state
  return (
    <BrowserRouter>
    <div className="App">
     
      <Navbar />
    
      <div className="container">
        <Alert alert={this.state.alert}/>
        <Switch>
          <Route exact path="/" render={props=>(
            <React.Fragment>
                 <Search 
                    searchUsers={this.searchUsers} 
                    clearUsers={this.clearUsers}
                    showClear={users.length> 0 ? true : false}
                    setAlert={this.setAlert}/>
                    <Users isLoading={isLoading} users={this.state.users}/>
            </React.Fragment>
         )}/>
         <Route exact path="/about" component={About}/>
         <Route exact path="/user/:login" render={props=>(
           <User {...props} getUser={this.getUser}  getUserRepos={this.getUserRepos} repos={repos} user={user} isLoading={isLoading}/>
         )}/>
        </Switch>
     
      </div>
     
    
      </div>
      </BrowserRouter>
  );
}
}

export default App;
