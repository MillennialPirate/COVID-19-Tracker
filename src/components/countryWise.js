import React from 'react';
import './styles.css';
import axios from 'axios';
import Dashboard from './dashboard';
class CountryWise extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            country: "",
            confirmed: 0, 
            recovered: 0, 
            deaths: 0
        }
        this.country = this.country.bind(this);
        this.submit = this.submit.bind(this);
    }
    country(e)
    {
        this.setState({country: e.target.value});
        console.log(this.state.country)
    }
    submit(e)
    {
        e.preventDefault();
        if(this.state.country === "")
        {
            window.alert("Please enter a country!");
            return;
        }
        console.log("C");
        const country = {
            country: this.state.country
        };
        axios.post('http://localhost:5000/liveCases', country)
        .then(res => {
            if(res.data === "Error")
            {
                window.alert("Please enter a valid country name");
                return;
            }
            this.setState({confirmed: res.data.confirmedCases});
            this.setState({recovered: res.data.recovered});
            this.setState({deaths: res.data.deaths});
        })
    }
    render()
    {
        return (
            <div class = "container">
                <div style={{paddingTop:"2%"}}></div>
                <div style={{textAlign:"center"}}>
                    <h1>COVID-19 Tracker</h1>
                </div>
                <div style={{paddingTop:"2%"}}></div>   
                <div class = "container" style={{textAlign:"center"}}>
                    <div class="search-box">
                        <input type="text" class="search-input" placeholder="Country" onChange={this.country}/>
                        
                        
                    </div>
                    <div style={{paddingTop:"1%"}}></div>
                    <button type="submit" class = "go" onClick = {this.submit}>Go!</button>{" "}<button class = "go">India Stats</button>
                </div>
                <div style={{paddingTop:"2%"}}></div>
                <div class = "container">
                    <div class = "row">
                        <div class = "col-lg-4 col-md-12">
                            <div class="item item1">
                                <div style={{height: "10px", width:"100%", background:"green", top: "0px"}}></div>
                                <div style={{paddingTop:"2%"}}></div>
                                <h6>Recovered</h6>
                                <p>{this.state.recovered}</p>
                            </div>
                        </div>
                        <div class = "col-lg-4 col-md-12">
                            <div class="item item2">
                            <div style={{height: "10px", width:"100%", background:"red", top: "0px"}}></div>
                                <div style={{paddingTop:"2%"}}></div>
                                <h6>Confirmed</h6>
                                <p>{this.state.confirmed}</p>
                            </div>
                        </div>
                        <div class = "col-lg-4 col-md-12">
                            <div class="item item3">
                            <div style={{height: "10px", width:"100%", background:"grey", top: "0px"}}></div>
                                <div style={{paddingTop:"2%"}}></div>
                                <h6>Deaths</h6>
                                <p>{this.state.deaths}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{paddingTop:"5%"}}></div>
                <div class = "container" style={{textAlign:"center", width:"75%", margin: "auto"}}>
                <Dashboard confirmed = {this.state.confirmed} recovered = {this.state.recovered} deaths = {this.state.deaths}/>
                </div>
            </div>
        )
    }
}
export default CountryWise;