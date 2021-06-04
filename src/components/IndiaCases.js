import React from 'react';
import './styles.css';
import axios from 'axios';
import Dashboard from './dashboard';
import Dash from './dashboard2';
import Pic from './images/img1.svg';
import {Link} from 'react-router-dom';
import Time from './LineChart';
import State from './stateAnalytics';
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
            vaccinated: 0,
            cases : [],
            dates : [],
            total : [],
            state: "",
        }
        this.checkStatus = this.checkStatus.bind(this);
        this.view = this.view.bind(this);
    }
    view(e, loc)
    {
        e.preventDefault(); 
        
        const data = {
            state : loc.stateCode
        }
        console.log(data);
        axios.post('http://localhost:5000/India/time', data)
        .then(res => {
            this.state.cases.length = 0;
            this.state.dates.length = 0;
            this.state.total.length = 0;
            this.setState({total : res.data}, () => {
                this.setState({state: loc.state});
                this.setState({confirmed: loc.confirmed});
                this.setState({recovered: loc.recovered});
                this.setState({deaths: loc.deaths}); 
                this.setState({tested: loc.tested});
                this.setState({vaccinated : loc.vaccinated});
                this.state.total.map((data) => {
                    this.state.cases.push(data.confirmed);
                    this.state.dates.push(data.date);
                    this.setState({status: "state"});
                })
            })

        })
        
        
    }
    checkStatus()
    {
        if(this.state.status === "loading")
        {
            return (
                <div style = {{textAlign:"center", paddingTop:"10%"}}>
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
                            
                            <div class = "col-lg-12 col-md-12">
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
                                                    return <tr >
                                                    <th scope="row"><a href = "" onClick = {(e) => {this.view(e, loc)}}>{loc.state}</a></th>
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
                                
                                <div style = {{textAlign:"center"}}>
                                <Link to = '/vaccine' ><button class = "go">Vaccine slots</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        }
        if(this.state.status === "state")
        {
            return <State cases = {this.state.cases} dates = {this.state.dates} confirmed = {this.state.confirmed} recovered = {this.state.recovered} deaths = {this.state.deaths} tested = {this.state.tested} state = {this.state.state}/>
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