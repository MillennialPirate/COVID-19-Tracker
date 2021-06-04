import React from 'react';
import './styles.css';
import Dash from './dashboard';
import Dash1 from './dashboard2';
import Time from './LineChart';
import Pic1 from './images/img1.svg';
import Pic2 from './images/pic2.svg';
import India from './IndiaCases';
class State extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            status : "home",
        }
        this.checkStatus = this.checkStatus.bind(this);
    }
    checkStatus()
    {
        if(this.state.status === "home")
        {
            return  (
                <div >
                    <div class = "container">
                        <div style={{paddingTop:"2%"}}></div>
                            <div style={{textAlign:"center"}}>
                                <h1>COVID-19 Tracker</h1>
                            </div>
                            <div style = {{paddingTop:"2%"}}></div>
                            <div style= {{textAlign:"center"}}>
                                <h2>Analytics of {this.props.state}</h2>
                                <div style={{paddingTop:"2%"}}></div>
                                <div class = "container">
                                    
                                    <div class = "row">
                                        <div class = "col-lg-4 col-md-12">
                                        <Dash confirmed = {this.props.confirmed} recovered = {this.props.recovered} deaths = {this.props.deaths}/>
                                
                                        </div>
                                        <div class = "col-lg-4 col-md-12">
                                        <Dash1 vaccinated = {this.props.vaccinated} tested = {this.props.tested} confirmed = {this.props.confirmed}/>
                                        </div>
                                        <div class = "col-lg-4 col-md-12">
                                        <Time cases = {this.props.cases} dates = {this.props.dates}/>
                                        </div>
                                    </div>
                                    <div style={{paddingTop:"3%"}}></div>
                                    <div style= {{textAlign:"center"}}>
                                        <button class = "go" onClick = {(e) => {e.preventDefault(); this.setState({status :"back"})}}>Back</button><br/>
                                        <img src = {Pic1} style={{width:"250px", height:"250px"}}/>
                                    </div>
                                </div>
                            </div>
                        <div style={{paddingTop:"2%"}}></div> 
                    </div>
                </div>
            )
        }
        if(this.state.status === "back")
        {
            return <India/>
        }
    }
    render()
    {
        return this.checkStatus();
    }
}
export default State;