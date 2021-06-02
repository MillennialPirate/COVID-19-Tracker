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
                    labels: ['Vaccinated', 'Tested', 'Confirmed'],
                    datasets: [{
                        label: '# of Doses',
                        data: [this.props.vaccinated, this.props.tested, this.props.confirmed],
                        backgroundColor: [
                            'green', 
                            'grey',
                            'red'
                        ],
                        borderColor: [
                            'green', 
                            'grey',
                            'red'
                        ],
                        borderWidth: 1
                    }]
                }}
            />
        )
    }
}
export default Dashboard;