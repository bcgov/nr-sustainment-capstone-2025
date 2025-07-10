import { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    LineElement,
    BarElement,
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
    BarElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend,
    plugins
);
import { Line, Bar } from 'react-chartjs-2';
import { Select } from '@bcgov/design-system-react-components';

export const Chart = ({userData, category}: any) => {
    // State holds array initialized as empty
    const [currentYearChartData, setCurrentYearChartData] = useState<number[]>([]);
    const [oneYearRemovedChartData, setOneYearRemovedChartData] = useState<number[]>([]);
    const [twoYearRemovedChartData, setTwoYearRemovedChartData] = useState<number[]>([]);
    const [threeYearRemovedChartData, setThreeYearRemovedChartData] = useState<number[]>([]);
    const [fourYearRemovedChartData, setFourYearRemovedChartData] = useState<number[]>([]);
    const [fiveYearRemovedChartData, setFiveYearRemovedChartData] = useState<number[]>([]);
    const [filterValue, setFilterValue] = useState(1);
    const [loading, setLoading] = useState(true);
    const labels = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];
    const year = new Date().getFullYear();
    const title = category === "Coverage" ? "Monthly Soil Coverage Trend" : "Monthly Organic Matter Analysis Trend";
    const xAxis = category === "Coverage" ? "Soil Coverage" : "Colour Score";
    const min = 0;
    const max = category === "Coverage" ? 100 : 8;
    const stepSize = category === "Coverage" ? 25 : 2;

    useEffect(() => {
        const currentDate = new Date().getFullYear();
        let dateData;

        if(filterValue == 1){
            dateData = currentDate;
        } else if (filterValue == 2){
            dateData = currentDate - 3;
        } else {
            dateData = currentDate - 5;
        }

        const sendData = {
            date: new Date(dateData, 0, 1),
            moistureLevel: ''
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
                    const currentYearMonthlyData = new Array(12).fill(0);
                    const oneYearRemovedMonthlyData = new Array(12).fill(0);
                    const twoYearRemovedMonthlyData = new Array(12).fill(0);
                    const threeYearRemovedMonthlyData = new Array(12).fill(0);
                    const fourYearRemovedMonthlyData = new Array(12).fill(0);
                    const fiveYearRemovedMonthlyData = new Array(12).fill(0);
                    // Track entries per month for now
                    const currentYearMonthlyCounts = new Array(12).fill(0);
                    const oneYearRemovedMonthlyCounts = new Array(12).fill(0);
                    const twoYearRemovedMonthlyCounts = new Array(12).fill(0);
                    const threeYearRemovedMonthlyCounts = new Array(12).fill(0);
                    const fourYearRemovedMonthlyCounts = new Array(12).fill(0);
                    const fiveYearRemovedMonthlyCounts = new Array(12).fill(0);
                    data.forEach((entry: any) => {
                        const date = new Date(entry.createdAt);
                        // Index goes from 0 (Jan) to 11 (Dec)
                        const year = date.getFullYear()
                        const monthIndex = date.getMonth();

                        // Only add if coverage_percentage is valid
                        if (entry.coverage_percentage !== null && entry.coverage_percentage >= 0 && entry.coverage_percentage <= 100 && entry.userId == userData) {
                            if (year == currentDate) {
                                currentYearMonthlyData[monthIndex] += entry.coverage_percentage;
                                currentYearMonthlyCounts[monthIndex] += 1;
                            }
                            else if (year == currentDate - 1) {
                                oneYearRemovedMonthlyData[monthIndex] += entry.coverage_percentage;
                                oneYearRemovedMonthlyCounts[monthIndex] += 1;
                            }
                            else if (year == currentDate - 2) {
                                twoYearRemovedMonthlyData[monthIndex] += entry.coverage_percentage;
                                twoYearRemovedMonthlyCounts[monthIndex] += 1;
                            }
                            else if (year == currentDate - 3) {
                                threeYearRemovedMonthlyData[monthIndex] += entry.coverage_percentage;
                                threeYearRemovedMonthlyCounts[monthIndex] += 1;
                            }
                            else if (year == currentDate - 4) {
                                fourYearRemovedMonthlyData[monthIndex] += entry.coverage_percentage;
                                fourYearRemovedMonthlyCounts[monthIndex] += 1;
                            }
                            else if (year == currentDate - 5) {
                                fiveYearRemovedMonthlyData[monthIndex] += entry.coverage_percentage;
                                fiveYearRemovedMonthlyCounts[monthIndex] += 1;
                            }
                        }
                    });
                    // Calculate average coverage per month
                    const averagedData = currentYearMonthlyData.map((sum, index) => {
                        return currentYearMonthlyCounts[index] > 0 ? sum / currentYearMonthlyCounts[index] : 0;
                    });
                    const averagedOneYearRemovedData = oneYearRemovedMonthlyData.map((sum, index) => {
                        return oneYearRemovedMonthlyCounts[index] > 0 ? sum / oneYearRemovedMonthlyCounts[index] : 0;
                    });
                    const averagedTwoYearRemovedData = twoYearRemovedMonthlyData.map((sum, index) => {
                        return twoYearRemovedMonthlyCounts[index] > 0 ? sum / twoYearRemovedMonthlyCounts[index] : 0;
                    });
                    const averagedThreeYearRemovedData = threeYearRemovedMonthlyData.map((sum, index) => {
                        return threeYearRemovedMonthlyCounts[index] > 0 ? sum / threeYearRemovedMonthlyCounts[index] : 0;
                    });
                    const averagedFourYearRemovedData = fourYearRemovedMonthlyData.map((sum, index) => {
                        return fourYearRemovedMonthlyCounts[index] > 0 ? sum / fourYearRemovedMonthlyCounts[index] : 0;
                    });
                    const averagedFiveYearRemovedData = fiveYearRemovedMonthlyData.map((sum, index) => {
                        return fiveYearRemovedMonthlyCounts[index] > 0 ? sum / fiveYearRemovedMonthlyCounts[index] : 0;
                    });

                    setCurrentYearChartData(averagedData);
                    setOneYearRemovedChartData(averagedOneYearRemovedData);
                    setTwoYearRemovedChartData(averagedTwoYearRemovedData);
                    setThreeYearRemovedChartData(averagedThreeYearRemovedData);
                    setFourYearRemovedChartData(averagedFourYearRemovedData);
                    setFiveYearRemovedChartData(averagedFiveYearRemovedData);
                })
                .catch(err => console.error('Failed to fetch data:', err))
                .finally(()=> {
                    setLoading(false);
                })
        }
        else if (category === "OMA-dry") {
            sendData.moistureLevel = 'dry';
            fetch('http://localhost:3000/api/check-oma-report', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sendData)})
                .then(res => res.json())
                .then(data => {
                    // Initialize array with 12 months
                    const currentYearMonthlyData = new Array(12).fill(0);
                    const oneYearRemovedMonthlyData = new Array(12).fill(0);
                    const twoYearRemovedMonthlyData = new Array(12).fill(0);
                    const threeYearRemovedMonthlyData = new Array(12).fill(0);
                    const fourYearRemovedMonthlyData = new Array(12).fill(0);
                    const fiveYearRemovedMonthlyData = new Array(12).fill(0);
                    // Track entries per month for now
                    const currentYearMonthlyCounts = new Array(12).fill(0);
                    const oneYearRemovedMonthlyCounts = new Array(12).fill(0);
                    const twoYearRemovedMonthlyCounts = new Array(12).fill(0);
                    const threeYearRemovedMonthlyCounts = new Array(12).fill(0);
                    const fourYearRemovedMonthlyCounts = new Array(12).fill(0);
                    const fiveYearRemovedMonthlyCounts = new Array(12).fill(0);
                    data.forEach((entry: any) => {
                        const date = new Date(entry.createdAt);
                        // Index goes from 0 (Jan) to 11 (Dec)
                        const year = date.getFullYear()
                        const monthIndex = date.getMonth();

                        // Only add if value is valid
                        if (entry.value !== null && entry.value >= 2 && entry.value <= 8 && entry.userId == userData) {
                            if (year == currentDate) {
                                currentYearMonthlyData[monthIndex] += entry.value;
                                currentYearMonthlyCounts[monthIndex] += 1;
                            }
                            else if (year == currentDate - 1) {
                                oneYearRemovedMonthlyData[monthIndex] += entry.value;
                                oneYearRemovedMonthlyCounts[monthIndex] += 1;
                            }
                            else if (year == currentDate - 2) {
                                twoYearRemovedMonthlyData[monthIndex] += entry.value;
                                twoYearRemovedMonthlyCounts[monthIndex] += 1;
                            }
                            else if (year == currentDate - 3) {
                                threeYearRemovedMonthlyData[monthIndex] += entry.value;
                                threeYearRemovedMonthlyCounts[monthIndex] += 1;
                            }
                            else if (year == currentDate - 4) {
                                fourYearRemovedMonthlyData[monthIndex] += entry.value;
                                fourYearRemovedMonthlyCounts[monthIndex] += 1;
                            }
                            else if (year == currentDate - 5) {
                                fiveYearRemovedMonthlyData[monthIndex] += entry.value;
                                fiveYearRemovedMonthlyCounts[monthIndex] += 1;
                            }
                        }
                    });
                    // Calculate average coverage per month
                    const averagedData = currentYearMonthlyData.map((sum, index) => {
                        return currentYearMonthlyCounts[index] > 0 ? sum / currentYearMonthlyCounts[index] : 0;
                    });
                    const averagedOneYearRemovedData = oneYearRemovedMonthlyData.map((sum, index) => {
                        return oneYearRemovedMonthlyCounts[index] > 0 ? sum / oneYearRemovedMonthlyCounts[index] : 0;
                    });
                    const averagedTwoYearRemovedData = twoYearRemovedMonthlyData.map((sum, index) => {
                        return twoYearRemovedMonthlyCounts[index] > 0 ? sum / twoYearRemovedMonthlyCounts[index] : 0;
                    });
                    const averagedThreeYearRemovedData = threeYearRemovedMonthlyData.map((sum, index) => {
                        return threeYearRemovedMonthlyCounts[index] > 0 ? sum / threeYearRemovedMonthlyCounts[index] : 0;
                    });
                    const averagedFourYearRemovedData = fourYearRemovedMonthlyData.map((sum, index) => {
                        return fourYearRemovedMonthlyCounts[index] > 0 ? sum / fourYearRemovedMonthlyCounts[index] : 0;
                    });
                    const averagedFiveYearRemovedData = fiveYearRemovedMonthlyData.map((sum, index) => {
                        return fiveYearRemovedMonthlyCounts[index] > 0 ? sum / fiveYearRemovedMonthlyCounts[index] : 0;
                    });

                    setCurrentYearChartData(averagedData);
                    setOneYearRemovedChartData(averagedOneYearRemovedData);
                    setTwoYearRemovedChartData(averagedTwoYearRemovedData);
                    setThreeYearRemovedChartData(averagedThreeYearRemovedData);
                    setFourYearRemovedChartData(averagedFourYearRemovedData);
                    setFiveYearRemovedChartData(averagedFiveYearRemovedData);
                })
                .catch(err => console.error('Failed to fetch data:', err))
                .finally(()=> {
                    setLoading(false);
                })
        } else if (category === "OMA-wet") {
            sendData.moistureLevel = 'wet';
            fetch('http://localhost:3000/api/check-oma-report', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sendData)})
                .then(res => res.json())
                .then(data => {
                    // Initialize array with 12 months
                    const currentYearMonthlyData = new Array(12).fill(0);
                    const oneYearRemovedMonthlyData = new Array(12).fill(0);
                    const twoYearRemovedMonthlyData = new Array(12).fill(0);
                    const threeYearRemovedMonthlyData = new Array(12).fill(0);
                    const fourYearRemovedMonthlyData = new Array(12).fill(0);
                    const fiveYearRemovedMonthlyData = new Array(12).fill(0);
                    // Track entries per month for now
                    const currentYearMonthlyCounts = new Array(12).fill(0);
                    const oneYearRemovedMonthlyCounts = new Array(12).fill(0);
                    const twoYearRemovedMonthlyCounts = new Array(12).fill(0);
                    const threeYearRemovedMonthlyCounts = new Array(12).fill(0);
                    const fourYearRemovedMonthlyCounts = new Array(12).fill(0);
                    const fiveYearRemovedMonthlyCounts = new Array(12).fill(0);
                    data.forEach((entry: any) => {
                        const date = new Date(entry.createdAt);
                        // Index goes from 0 (Jan) to 11 (Dec)
                        const year = date.getFullYear()
                        const monthIndex = date.getMonth();

                        // Only add if value is valid
                        if (entry.value !== null && entry.value >= 2 && entry.value <= 8 && entry.userId == userData) {
                            if (year == currentDate) {
                                currentYearMonthlyData[monthIndex] += entry.value;
                                currentYearMonthlyCounts[monthIndex] += 1;
                            }
                            else if (year == currentDate - 1) {
                                oneYearRemovedMonthlyData[monthIndex] += entry.value;
                                oneYearRemovedMonthlyCounts[monthIndex] += 1;
                            }
                            else if (year == currentDate - 2) {
                                twoYearRemovedMonthlyData[monthIndex] += entry.value;
                                twoYearRemovedMonthlyCounts[monthIndex] += 1;
                            }
                            else if (year == currentDate - 3) {
                                threeYearRemovedMonthlyData[monthIndex] += entry.value;
                                threeYearRemovedMonthlyCounts[monthIndex] += 1;
                            }
                            else if (year == currentDate - 4) {
                                fourYearRemovedMonthlyData[monthIndex] += entry.value;
                                fourYearRemovedMonthlyCounts[monthIndex] += 1;
                            }
                            else if (year == currentDate - 5) {
                                fiveYearRemovedMonthlyData[monthIndex] += entry.value;
                                fiveYearRemovedMonthlyCounts[monthIndex] += 1;
                            }
                        }
                    });
                    // Calculate average coverage per month
                    const averagedData = currentYearMonthlyData.map((sum, index) => {
                        return currentYearMonthlyCounts[index] > 0 ? sum / currentYearMonthlyCounts[index] : 0;
                    });
                    const averagedOneYearRemovedData = oneYearRemovedMonthlyData.map((sum, index) => {
                        return oneYearRemovedMonthlyCounts[index] > 0 ? sum / oneYearRemovedMonthlyCounts[index] : 0;
                    });
                    const averagedTwoYearRemovedData = twoYearRemovedMonthlyData.map((sum, index) => {
                        return twoYearRemovedMonthlyCounts[index] > 0 ? sum / twoYearRemovedMonthlyCounts[index] : 0;
                    });
                    const averagedThreeYearRemovedData = threeYearRemovedMonthlyData.map((sum, index) => {
                        return threeYearRemovedMonthlyCounts[index] > 0 ? sum / threeYearRemovedMonthlyCounts[index] : 0;
                    });
                    const averagedFourYearRemovedData = fourYearRemovedMonthlyData.map((sum, index) => {
                        return fourYearRemovedMonthlyCounts[index] > 0 ? sum / fourYearRemovedMonthlyCounts[index] : 0;
                    });
                    const averagedFiveYearRemovedData = fiveYearRemovedMonthlyData.map((sum, index) => {
                        return fiveYearRemovedMonthlyCounts[index] > 0 ? sum / fiveYearRemovedMonthlyCounts[index] : 0;
                    });

                    setCurrentYearChartData(averagedData);
                    setOneYearRemovedChartData(averagedOneYearRemovedData);
                    setTwoYearRemovedChartData(averagedTwoYearRemovedData);
                    setThreeYearRemovedChartData(averagedThreeYearRemovedData);
                    setFourYearRemovedChartData(averagedFourYearRemovedData);
                    setFiveYearRemovedChartData(averagedFiveYearRemovedData);
                })
                .catch(err => console.error('Failed to fetch data:', err))
                .finally(()=> {
                    setLoading(false);
                })
        }
        
    }, [filterValue, category]);

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
        console.log(event)
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

            {/* Current Year */}
            { filterValue == 1 && 
            <Bar 
                data={{
                    labels,
                    datasets: [{
                        label: year.toString(),
                        data: currentYearChartData,
                        borderColor: 'rgb(75, 94, 115)',
                        backgroundColor: 'rgb(75, 94, 115)',
                    }]
                }}
                options={options}
            />}

            {/* Last 3 Years */}
            { filterValue == 2 && 
            <Bar 
                data={{
                    labels,
                    datasets: [{
                        label: year.toString(),
                        data: currentYearChartData,
                        borderColor: 'rgb(75, 94, 115)',
                        backgroundColor: 'rgb(75, 94, 115)',
                    },
                    {
                        label: (year-1).toString(),
                        data: oneYearRemovedChartData,
                        borderColor: 'rgb(110, 53, 47)',
                        backgroundColor: 'rgb(110, 53, 47)',
                    },
                    {
                        label: (year-2).toString(),
                        data: twoYearRemovedChartData,
                        borderColor: 'rgb(54, 109, 67)',
                        backgroundColor: 'rgb(54, 109, 67)',
                    }]
                }}
                options={options}
            />}

            {/* Last 5 Years */}
            { filterValue == 3 && 
            <Bar 
                data={{
                    labels,
                    datasets: [{
                        label: year.toString(),
                        data: currentYearChartData,
                        borderColor: 'rgb(75, 94, 115)',
                        backgroundColor: 'rgb(75, 94, 115)',
                    },
                    {
                        label: (year-1).toString(),
                        data: oneYearRemovedChartData,
                        borderColor: 'rgb(110, 53, 47)',
                        backgroundColor: 'rgb(110, 53, 47)',
                    },
                    {
                        label: (year-2).toString(),
                        data: twoYearRemovedChartData,
                        borderColor: 'rgb(54, 109, 67)',
                        backgroundColor: 'rgb(54, 109, 67)',
                    },
                    {
                        label: (year-3).toString(),
                        data: threeYearRemovedChartData,
                        borderColor: 'rgb(135, 56, 99)',
                        backgroundColor: 'rgb(135, 56, 99)',
                    },
                    {
                        label: (year-4).toString(),
                        data: fourYearRemovedChartData,
                        borderColor: 'rgb(66, 153, 175)',
                        backgroundColor: 'rgb(66, 153, 175)',
                    },
                    {
                        label: (year-5).toString(),
                        data: fiveYearRemovedChartData,
                        borderColor: 'rgb(225, 236, 72)',
                        backgroundColor: 'rgb(225, 236, 72)',
                    }]
                }}
                options={options}
            />}
        </>
    )
};

export default Chart;
