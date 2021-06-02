import React from 'react';
import './styles.css';
import axios from 'axios';
import Dashboard from './dashboard';
import Dash from './dashboard2';
import Pic from './images/img1.svg';
class India extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            status: "loading",
            place : "",
            states : [],
            confirmed: 0,
            deaths: 0, 
            recovered: 0,
            tested : 0,
            vaccinated: 0
        }
        this.checkStatus = this.checkStatus.bind(this);
        this.view = this.view.bind(this);
    }
    view(e, loc)
    {
        e.preventDefault(); 
        this.setState({confirmed: loc.confirmed});
        this.setState({recovered: loc.recovered});
        this.setState({deaths: loc.deaths}); 
        this.setState({tested: loc.tested});
        this.setState({vaccinated : loc.vaccinated});
    }
    checkStatus()
    {
        if(this.state.status === "loading")
        {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        }
        if(this.state.status === "loaded")
        {
            return (
                <div>
                <div class = "container">
                    <div style={{paddingTop:"2%"}}></div>
                    <div style={{textAlign:"center"}}>
                        <h1>COVID-19 Tracker</h1>
                    </div>
                    <div style={{paddingTop:"2%"}}></div>  
                    <div class = "container">
                        <div class = "row">
                            <div class = "col-lg-6 col-md-12" style={{textAlign:"center"}}>
                                <div >
                                    <img src = {Pic} style={{width:"400px", height: "500px"}}/>
                                    <div style={{paddingTop:"3%"}}></div>
                                    <h1>Click the respective state to view the analytics!</h1>
                                    <Dashboard confirmed = {this.state.confirmed} deaths ={this.state.deaths} recovered = {this.state.recovered}/>
                                    <div style = {{paddingTop:"3%"}}></div>
                                    <Dash confirmed = {this.state.confirmed} vaccinated = {this.state.vaccinated} tested = {this.state.tested}/>
                                    <div style={{paddingTop:"2%"}}></div>
                                    <button class = "go">Vaccine slots</button>
                                </div>
                            </div>
                            <div class = "col-lg-6 col-md-12">
                                <div class = "container" style={{textAlign:"center"}}>
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                            <th scope="col">State</th>
                                            <th scope="col">Recovered</th>
                                            <th scope="col">Confirmed</th>
                                            <th scope="col">Deaths</th>
                                            <th scope = "col">Vaccinated</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.states.map(loc => {
                                                    return <tr onClick = {(e) => {this.view(e, loc)}}>
                                                    <th scope="row">{loc.state}</th>
                                                    <td>{loc.recovered}</td>
                                                    <td>{loc.confirmed}</td>
                                                    <td>{loc.deaths}</td>
                                                    <td>{loc.vaccinated}</td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        }
    }
    componentWillMount()
    {

        axios.get('http://localhost:5000/India')
        .then(res => {
            this.setState({states: res.data});
            this.setState({status: "loaded"});
        })
    }
    render()
    {
        return this.checkStatus();
    }
}
export default India;