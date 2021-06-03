import axios from 'axios';
import React from 'react';
import './styles.css';
import Pic from './images/pic2.svg';
class Vaccine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "first",
            pincode: "",
            date: "",
            centers: [],
        }
        this.pincode = this.pincode.bind(this);
        this.submit = this.submit.bind(this);
        this.date = this.date.bind(this);
        this.checkStatus = this.checkStatus.bind(this);
    }
    pincode(e) {
        this.setState({ pincode: e.target.value });
    }
    date(e) {
        var d = e.target.value;
        var todayTime = new Date(d);
        var month = todayTime.getMonth() + 1;
        var day = todayTime.getDate();
        var year = todayTime.getFullYear();
        // var s = month + "/" + day + "/" + year;
        // console.log(s);
        var months = "", days = "", years = "";
        if (month < 10) {
            months = "0" + String(month);
        }
        else {
            months = month;
        }
        if (day < 10) {
            days = "0" + String(day);
        }
        else {
            days = day;
        }
        var s = days + "-" + months + "-" + year;
        this.setState({
            date: s
        });
        console.log(this.state.date);
    }
    submit(e) {
        if(this.state.date === "" || this.state.pincode === "")
        {
            window.alert("Please enter some value");
            return;
        }
        e.preventDefault();
        var data = {
            pincode: this.state.pincode,
            date: this.state.date
        }
        axios.post('http://localhost:5000/vaccines', data)
            .then(res => {
                if(res.data === "Error")
                {
                    window.alert("Please enter correct credentials");
                    return;
                }
                //asynchronous problem of setState can be resolved by a callback to change the status
                this.setState({centers: res.data}, () => {this.setState({status:"second"})});
            })
        
    }
    checkStatus() {
        if (this.state.status === "first") {
            return (
                <div>
                    <div class="container">
                        <div style={{ paddingTop: "2%" }}></div>
                        <div style={{ textAlign: "center" }}>
                            <h1>COVID-19 Vaccine Tracker</h1>
                        </div>
                        <div style={{ paddingTop: "5%" }}></div>
                        <div class="row">
                            <div class="col-lg-6 col-md-12" style={{ textAlign: "center" }}>
                                <div style={{ paddingTop: "10%" }}></div>
                                <div class="container" style={{ textAlign: "center" }}>
                                    <div class="search-box">
                                        <input type="text" class="search-input" placeholder="Pincode" onChange={this.pincode} />


                                    </div>
                                    <div class="container" style={{ textAlign: "center" }}>
                                        <div style={{ paddingTop: "2%" }}></div>
                                        <div class="search-box" style={{ width: "50%", margin: "auto", textAlign: "center" }}>
                                            Enter a date <div style={{ paddingLeft: "10%" }}></div><input type="date" onChange={this.date} />
                                        </div>
                                    </div>
                                    <div style={{ paddingTop: "1%" }}></div>
                                    <button type="submit" class="go" onClick={this.submit}>Go!</button>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-12" style={{ textAlign: "center" }}>
                                <img src={Pic} style={{ width: "450px", height: "450px" }} />
                            </div>

                        </div>
                    </div>
                </div>
            )
        }
        if (this.state.status === "second") {
            return (
                <div>
                    <div class="container">
                        <div style={{ paddingTop: "2%" }}></div>
                        <div style={{ textAlign: "center" }}>
                            <h1>COVID-19 Vaccine Tracker</h1>
                        </div>
                        <div style={{ paddingTop: "5%" }}></div>
                        <div class="row">
                            <div class="col-lg-6 col-md-12" style={{ textAlign: "center" }}>
                                <div style={{ paddingTop: "10%" }}></div>
                                <div class="container" style={{ textAlign: "center" }}>
                                    <div class="search-box">
                                        <input type="text" class="search-input" placeholder="Pincode" onChange={this.pincode} />


                                    </div>
                                    <div class="container" style={{ textAlign: "center" }}>
                                        <div style={{ paddingTop: "2%" }}></div>
                                        <div class="search-box" style={{ width: "50%", margin: "auto", textAlign: "center" }}>
                                            Enter a date <div style={{ paddingLeft: "10%" }}></div><input type="date" onChange={this.date} />
                                        </div>
                                    </div>
                                    <div style={{ paddingTop: "1%" }}></div>
                                    <button type="submit" class="go" onClick={this.submit}>Go!</button>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-12" style={{ textAlign: "center" }}>
                                <h1>Centers</h1>
                                {
                                    this.state.centers.map((center) => {
                                        return <div>
                                        <div style={{ paddingTop: "2%" }}></div>
                                        <div class="card1 card-1" style={{width:"100%", margin: "auto"}}>
                                            <h2>{center.name}</h2>
                                            <div style={{left:"2%"}}>
                                            <h4 style = {{fontWeight:"bolder"}}>Timings : {center.from + " to " + center.to}</h4>
                                            <h6 style={{fontWeight:"bolder"}}>Minimum Age : {center.minAge}</h6>
                                            <h6 style={{fontWeight:"bolder"}}>Slots</h6>
                                            {
                                                center.slots.map((slot) => {
                                                    return <div><p>{slot}</p></div>
                                                })
                                            }
                                            </div>
                                        </div></div>
                                    })
                                }
                            </div>

                        </div>
                    </div>
                </div>
            )
        }
    }
    render() {
        return this.checkStatus();
    }
}
export default Vaccine;