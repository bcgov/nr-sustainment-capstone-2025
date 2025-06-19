import { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend,
    plugins
} from 'chart.js';

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend,
    plugins
);
import { Line } from 'react-chartjs-2';

export const Chart = ({userData}: any) => {
    // State holds array initialized as empty
    const [chartData, setChartData] = useState<number[]>([]);

    const labels = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    useEffect(() => {
        fetch('http://localhost:3000/api/check-coverage-report')
            .then(res => res.json())
            .then(data => {
                // Initialize array with 12 months
                const monthlyData = new Array(12).fill(0);
                // Track entries per month for now
                const monthlyCounts = new Array(12).fill(0);
                data.forEach((entry: any) => {
                    const date = new Date(entry.createdAt);
                    // Index goes from 0 (Jan) to 11 (Dec)
                    const monthIndex = date.getMonth();

                    // Only add if coverage_percentage is valid
                    if (entry.coverage_percentage !== null && entry.coverage_percentage >= 0 && entry.coverage_percentage <= 100 && entry.userId == userData) {
                        monthlyData[monthIndex] += entry.coverage_percentage;
                        monthlyCounts[monthIndex] += 1;
                    }
                });
                // Calculate average coverage per month
                const averagedData = monthlyData.map((sum, index) => {
                    return monthlyCounts[index] > 0 ? sum / monthlyCounts[index] : 0;
                });
                setChartData(averagedData);
            })
            .catch(err => console.error('Failed to fetch data:', err));
    }, [userData]);

    if (chartData.length == 0) {
        return <p>Loading...</p>;
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        plugins: {
            title: {
                display: true,
                text: 'Monthly Soil Coverage Trend',
            },
        },
        scales: {
            x: {
                grace: 5,
                title: {
                    display: true,
                    align: 'center',
                    text: 'Month',
                    color: 'black',
                },
                ticks: {
                    autoSkip: false,
                    beginAtZero: true,
                    stepSize: 1,
                }
            },
            y: {
                autoSkip: false,
                min: 0,
                max: 100,
                title: {
                    display: true,
                    align: 'center',
                    text: 'Coverage Percentage',
                    color: 'black',
                },
                ticks: {
                    grace: 5,
                    beginAtZero: true,
                    stepSize: 25
                }
            }
        }
    };

    return(
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
            options={options}
        />
    )
};

export default Chart;
