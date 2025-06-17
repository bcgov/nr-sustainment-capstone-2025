import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend,
    defaults
} from 'chart.js';

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend,
);
import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';

defaults.responsive = true;

export const Chart = ({userData}) => {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/check-coverage-report');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                console.log("Error", err)
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    let chartData;
    if (data) {
        const chartDataObj = data.map((dataPoint) => {if (dataPoint.userId == userData) return dataPoint.coverage_percentage});
        chartData = Object.values(chartDataObj);
        chartData = chartData.filter((element) => {
            return element !== undefined;
        });
    }

    if (chartData.length == 0) {
        return <p>No Data...</p>;
    }

    return(
        <>
            { data && 
            <Line 
                data={{
                    labels,
                    datasets: [{
                        label: 'Soil Coverage Monthly Trend',
                        data: chartData,
                        fill: false,
                        borderColor: 'rgb(75, 94, 115)',
                        backgroundColor: 'rgb(75, 94, 115)',
                        tension: 0.1
                    }]
                }}
            /> }
        </>
    )
}
