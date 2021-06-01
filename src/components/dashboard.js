import { Bar } from 'react-chartjs-2';
import React from 'react';
class Dashboard extends React.Component{
    constructor(props)
    {
        super(props);

    }
    render()
    {
        return (
            <Bar
                data = {{
                    labels: ['Recovered', 'Confirmed', 'Deaths'],
                    datasets: [{
                        label: '# of Cases',
                        data: [this.props.recovered, this.props.confirmed, this.props.deaths],
                        backgroundColor: [
                            'green', 
                            'red',
                            'grey'
                        ],
                        borderColor: [
                            'green', 
                            'red',
                            'grey'
                        ],
                        borderWidth: 1
                    }]
                }}
            />
        )
    }
}
export default Dashboard;