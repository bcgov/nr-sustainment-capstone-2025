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
import { Select } from '@bcgov/design-system-react-components';

export const Chart = ({userData, category}: any) => {
    // State holds array initialized as empty
    const [chartData, setChartData] = useState<number[]>([]);
    const [filterValue, setFilterValue] = useState(1);
    const [loading, setLoading] = useState(true);
    const labels = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];
    const title = category === "Coverage" ? "Monthly Soil Coverage Trend" : "Monthly Organic Matter Analysis Trend";
    const xAxis = category === "Coverage" ? "Soil Coverage" : "Colour Score";
    const min = category === "Coverage" ? 0 : 2;
    const max = category === "Coverage" ? 100 : 8;
    const stepSize = category === "Coverage" ? 25 : 2;

    useEffect(() => {
        let dateData;

        if(filterValue == 1){
            dateData = new Date().getFullYear();
        } else if (filterValue == 2){
            dateData = new Date().getFullYear() - 3;
        } else {
            dateData = new Date().getFullYear() - 5;
        }

        console.log(dateData);

        const sendData = {
            date: new Date(dateData, 0, 1)
        }

        if (category === "Coverage") {
            fetch('http://localhost:3000/api/check-coverage-report', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sendData)})
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
                .catch(err => console.error('Failed to fetch data:', err))
                .finally(()=> {
                    setLoading(false);
                })
        }
        else if (category === "OMA") {
            fetch('http://localhost:3000/api/check-oma-report', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sendData)})
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

                        // Only add if value is valid
                        if (entry.value !== null && entry.value >= 2 && entry.value <= 8 && entry.userId == userData) {
                            monthlyData[monthIndex] += entry.value;
                            monthlyCounts[monthIndex] += 1;
                        }
                    });
                    // Calculate average coverage per month
                    const averagedData = monthlyData.map((sum, index) => {
                        return monthlyCounts[index] > 0 ? sum / monthlyCounts[index] : 2;
                    });
                    setChartData(averagedData);
                })
                .catch(err => console.error('Failed to fetch data:', err))
                .finally(()=> {
                    setLoading(false);
                })
        }
        
    }, [filterValue]);

    if (loading) {
        return <p>Loading...</p>;
    }

    const filter = [
        {
            id: 1,
            label: "Current Year"
        },
        {
            id: 2,
            label: "Last 3 Years"
        },
        {
            id: 3,
            label: "Last 5 years"
        }
    ]

    const handleFilter = (event: any) => {
        setLoading(true);
        setFilterValue(event);
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        plugins: {
            title: {
                display: true,
                text: title,
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
                min: min,
                max: max,
                title: {
                    display: true,
                    align: 'center',
                    text: xAxis,
                    color: 'black',
                },
                ticks: {
                    grace: 5,
                    beginAtZero: true,
                    stepSize: stepSize
                }
            }
        }
    };

    return(
        <>
            <Select className={'select-font'} items={filter} label="Filter" size='small' defaultSelectedKey={filterValue} onSelectionChange={handleFilter}/>
            <Line 
                data={{
                    labels,
                    datasets: [{
                        label: 'Monthly Trend',
                        data: chartData,
                        fill: false,
                        borderColor: 'rgb(75, 94, 115)',
                        backgroundColor: 'rgb(75, 94, 115)',
                        tension: 0.1
                    }]
                }}
                options={options}
            />
        </>
    )
};

export default Chart;
