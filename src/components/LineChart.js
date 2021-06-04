import { Line } from 'react-chartjs-2';
import React from 'react';
class Dashboard extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            labels: this.props.dates,
              datasets: [
                {
                  label: 'Confirmed cases',
                  fill: false,
                  lineTension: 0.5,
                  backgroundColor: 'rgba(75,192,192,1)',
                  borderColor: 'rgba(0,0,0,1)',
                  borderWidth: 2,
                  data: this.props.cases
                }
              ]
        }
    }
    componentDidMount()
    {
      console.log(this.props.dates);
      console.log(this.props.cases);
    }
    render()
    {
        return (
            <Line
          data={this.state}
          options={{
            title:{
              display:true,
              text:'No.of Cases',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
        )
    }
}
export default Dashboard;