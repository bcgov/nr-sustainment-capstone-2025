import { useState, useEffect } from 'react';
import zoomPlugin from 'chartjs-plugin-zoom';
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
    plugins,
    zoomPlugin
);
import { Bar } from 'react-chartjs-2';
import { Select } from '@bcgov/design-system-react-components';
import { useOrientation } from 'react-use';

 import { viteBackendUrl } from '../../../config';

export const Chart = ({userData, category}: any) => {
    const { type } = useOrientation();
    // State holds array initialized as empty
    const [currentYearChartData, setCurrentYearChartData] = useState<number[]>([]);
    const [oneYearRemovedChartData, setOneYearRemovedChartData] = useState<number[]>([]);
    const [twoYearRemovedChartData, setTwoYearRemovedChartData] = useState<number[]>([]);
    const [threeYearRemovedChartData, setThreeYearRemovedChartData] = useState<number[]>([]);
    const [fourYearRemovedChartData, setFourYearRemovedChartData] = useState<number[]>([]);
    const [januaryData, setJanuaryData] = useState<number[]>([]);
    const [februaryData, setFebruaryData] = useState<number[]>([]);
    const [marchData, setMarchData] = useState<number[]>([]);
    const [aprilData, setAprilData] = useState<number[]>([]);
    const [mayData, setMayData] = useState<number[]>([]);
    const [juneData, setJuneData] = useState<number[]>([]);
    const [julyData, setJulyData] = useState<number[]>([]);
    const [augustData, setAugustData] = useState<number[]>([]);
    const [septemberData, setSeptemberData] = useState<number[]>([]);
    const [octoberData, setOctoberData] = useState<number[]>([]);
    const [novemberData, setNovemberData] = useState<number[]>([]);
    const [decemberData, setDecemberData] = useState<number[]>([]);
    const [filterValue, setFilterValue] = useState(1);
    const [filterValueYearly, setFilterValueYearly] = useState(1);
    const [filterValueQuarterly, setFilterValueQuarterly] = useState(1);
    const [filterValueMonthly, setFilterValueMonthly] = useState(1);
    const [loading, setLoading] = useState(true);
    const [labels, setLabels] = useState([
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ]);
    const year = new Date().getFullYear();
    const title = category === "Coverage" ? "Monthly Soil Coverage Trend" : category === "Soil-Penetration" ? "Monthly Soil Penetration Resistance Trend" : "Monthly Organic Matter Analysis Trend";
    const xAxis = category === "Coverage" ? "Soil Coverage" : category === "Soil-Penetration" ? "Score" : "Colour Score";
    const min = 0;
    const max = category === "Coverage" || category === "Soil-Penetration" ? 100 : 8;
    const stepSize = category === "Coverage" || category === "Soil-Penetration" ? 25 : 2;

    useEffect(() => {
        const currentDate = new Date().getFullYear();
        let dateData = currentDate - 5;

        if(filterValue == 1 && filterValueYearly == 1) {
            dateData = currentDate;
        } else if (filterValue == 1 && filterValueYearly == 2) {
            dateData = currentDate - 3;
        } else {
            dateData = currentDate - 5;
        }

        const sendData = {
            date: new Date(dateData, 0, 1),
            moistureLevel: ''
        }

        // Initialize array with 12 months
        // Yearly Data
        const currentYearMonthlyData = new Array(12).fill(0);
        const oneYearRemovedMonthlyData = new Array(12).fill(0);
        const twoYearRemovedMonthlyData = new Array(12).fill(0);
        const threeYearRemovedMonthlyData = new Array(12).fill(0);
        const fourYearRemovedMonthlyData = new Array(12).fill(0);
        // Quarterly / Monthly Data
        const januaryYearlyData = new Array(5).fill(0);
        const februaryYearlyData = new Array(5).fill(0);
        const marchYearlyData = new Array(5).fill(0);
        const aprilYearlyData = new Array(5).fill(0);
        const mayYearlyData = new Array(5).fill(0);
        const juneYearlyData = new Array(5).fill(0);
        const julyYearlyData = new Array(5).fill(0);
        const augustYearlyData = new Array(5).fill(0);
        const septemberYearlyData = new Array(5).fill(0);
        const octoberYearlyData = new Array(5).fill(0);
        const novemberYearlyData = new Array(5).fill(0);
        const decemberYearlyData = new Array(5).fill(0);

        // Track entries per month for now
        // Yearly Data
        const currentYearMonthlyCounts = new Array(12).fill(0);
        const oneYearRemovedMonthlyCounts = new Array(12).fill(0);
        const twoYearRemovedMonthlyCounts = new Array(12).fill(0);
        const threeYearRemovedMonthlyCounts = new Array(12).fill(0);
        const fourYearRemovedMonthlyCounts = new Array(12).fill(0);
        // Quarterly / Monthly Data
        const januaryYearlyCounts = new Array(5).fill(0);
        const februaryYearlyCounts = new Array(5).fill(0);
        const marchYearlyCounts = new Array(5).fill(0);
        const aprilYearlyCounts = new Array(5).fill(0);
        const mayYearlyCounts = new Array(5).fill(0);
        const juneYearlyCounts = new Array(5).fill(0);
        const julyYearlyCounts = new Array(5).fill(0);
        const augustYearlyCounts = new Array(5).fill(0);
        const septemberYearlyCounts = new Array(5).fill(0);
        const octoberYearlyCounts = new Array(5).fill(0);
        const novemberYearlyCounts = new Array(5).fill(0);
        const decemberYearlyCounts = new Array(5).fill(0);

        function isEntryValid(entry: any, userId: number){
            if(category === "Coverage" || "Soil-Penetration"){
                if(entry !== null && entry >= 0 && entry <= 100 && userId == userData){
                    return true;
                } else {
                    return false
                }  
            } else {
                if(entry !== null && entry >= 2 && entry <= 8 && userId == userData){
                    return true;
                } else {
                    return false;
                }
            }
        }

        function setupGraphDataYearly(value: any, year: number, index: number ){
            if (year == currentDate) {
                currentYearMonthlyData[index] += value;
                currentYearMonthlyCounts[index] += 1;
            }
            else if (year == currentDate - 1) {
                oneYearRemovedMonthlyData[index] += value;
                oneYearRemovedMonthlyCounts[index] += 1;
            }
            else if (year == currentDate - 2) {
                twoYearRemovedMonthlyData[index] += value;
                twoYearRemovedMonthlyCounts[index] += 1;
            }
            else if (year == currentDate - 3) {
                threeYearRemovedMonthlyData[index] += value;
                threeYearRemovedMonthlyCounts[index] += 1;
            }
            else if (year == currentDate - 4) {
                fourYearRemovedMonthlyData[index] += value;
                fourYearRemovedMonthlyCounts[index] += 1;
            }
        }

        function setupGraphDataMonthly(value: any, index: number, month: number ){
            index == 2021 ? index = 0 : index == 2022 ? index = 1 : index == 2023 ? index = 2 : index == 2024 ? index = 3 : index = 4;
            if (month == 0) {
                januaryYearlyData[index] += value;
                januaryYearlyCounts[index] += 1;
            }
            else if (month == 1) {
                februaryYearlyData[index] += value;
                februaryYearlyCounts[index] += 1;
            }
            else if (month == 2) {
                marchYearlyData[index] += value;
                marchYearlyCounts[index] += 1;
            }
            else if (month == 3) {
                aprilYearlyData[index] += value;
                aprilYearlyCounts[index] += 1;
            }
            else if (month == 4) {
                mayYearlyData[index] += value;
                mayYearlyCounts[index] += 1;
            }
            else if (month == 5) {
                juneYearlyData[index] += value;
                juneYearlyCounts[index] += 1;
            }
            else if (month == 6) {
                julyYearlyData[index] += value;
                julyYearlyCounts[index] += 1;
            }
            else if (month == 7) {
                augustYearlyData[index] += value;
                augustYearlyCounts[index] += 1;
            }
            else if (month == 8) {
                septemberYearlyData[index] += value;
                septemberYearlyCounts[index] += 1;
            }
            else if (month == 9) {
                octoberYearlyData[index] += value;
                octoberYearlyCounts[index] += 1;
            }
            else if (month == 10) {
                novemberYearlyData[index] += value;
                novemberYearlyCounts[index] += 1;
            }
            else if (month == 11) {
                decemberYearlyData[index] += value;
                decemberYearlyCounts[index] += 1;
            }
        }

        function calculateAverageYearlyData(){
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

            setCurrentYearChartData(averagedData);
            setOneYearRemovedChartData(averagedOneYearRemovedData);
            setTwoYearRemovedChartData(averagedTwoYearRemovedData);
            setThreeYearRemovedChartData(averagedThreeYearRemovedData);
            setFourYearRemovedChartData(averagedFourYearRemovedData);
        }

        function calculateAverageMonthlyData(){
            // Calculate average coverage per month
            const januaryAveragedData = januaryYearlyData.map((sum, index) => {
                return januaryYearlyCounts[index] > 0 ? sum / januaryYearlyCounts[index] : 0;
            });
            const februaryAveragedData = februaryYearlyData.map((sum, index) => {
                return februaryYearlyCounts[index] > 0 ? sum / februaryYearlyCounts[index] : 0;
            });
            const marchAveragedData = marchYearlyData.map((sum, index) => {
                return marchYearlyCounts[index] > 0 ? sum / marchYearlyCounts[index] : 0;
            });
            const aprilAveragedData = aprilYearlyData.map((sum, index) => {
                return aprilYearlyCounts[index] > 0 ? sum / aprilYearlyCounts[index] : 0;
            });
            const mayAveragedData = mayYearlyData.map((sum, index) => {
                return mayYearlyCounts[index] > 0 ? sum / mayYearlyCounts[index] : 0;
            });
            const juneAveragedData = juneYearlyData.map((sum, index) => {
                return juneYearlyCounts[index] > 0 ? sum / juneYearlyCounts[index] : 0;
            });
            const julyAveragedData = julyYearlyData.map((sum, index) => {
                return julyYearlyCounts[index] > 0 ? sum / julyYearlyCounts[index] : 0;
            });
            const augustAveragedData = augustYearlyData.map((sum, index) => {
                return augustYearlyCounts[index] > 0 ? sum / augustYearlyCounts[index] : 0;
            });
            const septemberAveragedData = septemberYearlyData.map((sum, index) => {
                return septemberYearlyCounts[index] > 0 ? sum / septemberYearlyCounts[index] : 0;
            });
            const octoberAveragedData = octoberYearlyData.map((sum, index) => {
                return octoberYearlyCounts[index] > 0 ? sum / octoberYearlyCounts[index] : 0;
            });
            const novemberAveragedData = novemberYearlyData.map((sum, index) => {
                return novemberYearlyCounts[index] > 0 ? sum / novemberYearlyCounts[index] : 0;
            });
            const decemberAveragedData = decemberYearlyData.map((sum, index) => {
                return decemberYearlyCounts[index] > 0 ? sum / decemberYearlyCounts[index] : 0;
            });

            setJanuaryData(januaryAveragedData);
            setFebruaryData(februaryAveragedData);
            setMarchData(marchAveragedData);
            setAprilData(aprilAveragedData);
            setMayData(mayAveragedData);
            setJuneData(juneAveragedData);
            setJulyData(julyAveragedData);
            setAugustData(augustAveragedData);
            setSeptemberData(septemberAveragedData);
            setOctoberData(octoberAveragedData);
            setNovemberData(novemberAveragedData);
            setDecemberData(decemberAveragedData);
        }

        if (category === "Coverage") {
            fetch(`${viteBackendUrl}/api/check-coverage-report`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sendData)})
                .then(res => res.json())
                .then(data => {
                    data.forEach((entry: any) => {
                        const date = new Date(entry.createdAt);
                        // Index goes from 0 (Jan) to 11 (Dec)
                        const year = date.getFullYear()
                        const monthIndex = date.getMonth();

                        // Only add if coverage_percentage is valid
                        if (isEntryValid(entry.coverage_percentage, entry.userId)) {
                            if (filterValue == 1) {
                                setupGraphDataYearly(entry.coverage_percentage, year, monthIndex);
                            }
                            else {
                                setupGraphDataMonthly(entry.coverage_percentage, year, monthIndex)
                            }
                        }
                    });
                    if (filterValue == 1) {
                        calculateAverageYearlyData();
                    }
                    else {
                        calculateAverageMonthlyData();
                    }
                })
                .catch(err => console.error('Failed to fetch data:', err))
                .finally(()=> {
                    setLoading(false);
                })
        }
        else if (category === "OMA-dry") {
            sendData.moistureLevel = 'dry';
            fetch(`${viteBackendUrl}/api/check-oma-report`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sendData)})
                .then(res => res.json())
                .then(data => {
                    data.forEach((entry: any) => {
                        const date = new Date(entry.createdAt);
                        // Index goes from 0 (Jan) to 11 (Dec)
                        const year = date.getFullYear()
                        const monthIndex = date.getMonth();

                        // Only add if value is valid
                        if (isEntryValid(entry.value, entry.userId)) {
                            if (filterValue == 1) {
                                setupGraphDataYearly(entry.value, year, monthIndex);
                            }
                            else {
                                setupGraphDataMonthly(entry.value, year, monthIndex);
                            }
                        }
                    });
                    if (filterValue == 1) {
                        calculateAverageYearlyData();
                    }
                    else {
                        calculateAverageMonthlyData();
                    }
                })
                .catch(err => console.error('Failed to fetch data:', err))
                .finally(()=> {
                    setLoading(false);
                })
        } else if (category === "OMA-wet") {
            sendData.moistureLevel = 'wet';
            fetch(`${viteBackendUrl}/api/check-oma-report`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sendData)})
                .then(res => res.json())
                .then(data => {
                    data.forEach((entry: any) => {
                        const date = new Date(entry.createdAt);
                        // Index goes from 0 (Jan) to 11 (Dec)
                        const year = date.getFullYear()
                        const monthIndex = date.getMonth();

                        // Only add if value is valid
                        if (isEntryValid(entry.value, entry.userId)) {
                            if (filterValue == 1) {
                                setupGraphDataYearly(entry.value, year, monthIndex);
                            }
                            else {
                                setupGraphDataMonthly(entry.value, year, monthIndex);
                            }
                        }
                    });
                    // Calculate average coverage per month
                    if (filterValue == 1) {
                        calculateAverageYearlyData();
                    }
                    else {
                        calculateAverageMonthlyData();
                    }
                })
                .catch(err => console.error('Failed to fetch data:', err))
                .finally(()=> {
                    setLoading(false);
                })
        } else if (category === "Soil-Penetration"){
            fetch(`${viteBackendUrl}/api/check-soil-penetration-report`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sendData)})
                .then(res => res.json())
                .then(data => {
                    data.forEach((entry: any) => {
                        const date = new Date(entry.createdAt);
                        // Index goes from 0 (Jan) to 11 (Dec)
                        const year = date.getFullYear()
                        const monthIndex = date.getMonth();

                        // Only add if score is valid
                        if (isEntryValid(entry.score, entry.userId)) {
                            if (filterValue == 1) {
                                setupGraphDataYearly(entry.score, year, monthIndex);
                            }
                            else {
                                setupGraphDataMonthly(entry.score, year, monthIndex);
                            }
                        }
                    });
                    if (filterValue == 1) {
                        calculateAverageYearlyData();
                    }
                    else {
                        calculateAverageMonthlyData();
                    }
                })
                .catch(err => console.error('Failed to fetch data:', err))
                .finally(()=> {
                    setLoading(false);
                })
        }
        
    }, [filterValue, filterValueYearly, filterValueQuarterly, filterValueMonthly, category]);

    if (loading) {
        return <p>Loading...</p>;
    }

    const filter = [
        { id: 1, label: "Yearly" }, { id: 2, label: "Quarterly" }, { id: 3, label: "Monthly" }
    ]

    const filterWithYearly = [
        { id: 1, label: "Current Year" }, { id: 2, label: "Last 3 Years" }, { id: 3, label: "Last 5 years" }
    ]

    const filterWithQuarterly = [
        { id: 1, label: "First Quarter" }, { id: 2, label: "Second Quarter" }, 
        { id: 3, label: "Third Quarter" }, { id: 4, label: "Fourth Quarter" }
    ]

    const filterWithMonthly = [
        { id: 1, label: "January" }, { id: 2, label: "February" }, { id: 3, label: "March" },
        { id: 4, label: "April" }, { id: 5, label: "May" }, { id: 6, label: "June" },
        { id: 7, label: "July" }, { id: 8, label: "August" }, { id: 9, label: "September" },
        { id: 10, label: "October" }, { id: 11, label: "November" }, { id: 12, label: "December" }
    ]

    const handleFilter = (event: any) => {
        if (event != filterValue) {
            setLoading(true);
        }
        setFilterValue(event);
        if (event == 1) {
            setLabels([
                'January', 'February', 'March', 'April',
                'May', 'June', 'July', 'August',
                'September', 'October', 'November', 'December'
            ])
        }
        else if (event == 2 || event == 3) {
            setLabels([
                '2021', '2022', '2023', '2024', '2025'
            ])
        }
    }

    const handleFilterYearly = (event: any) => {
        if (event != filterValueYearly) {
            setLoading(true);
        }
        setFilterValueYearly(event);
    }

    const handleFilterQuarterly = (event: any) => {
        if (event != filterValueQuarterly) {
            setLoading(true);
        }
        setFilterValueQuarterly(event);
    }

    const handleFilterMonthly = (event: any) => {
        if (event != filterValueMonthly) {
            setLoading(true);
        }
        setFilterValueMonthly(event);
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
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                        speed: 0.002
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'xy',
                },
                limits: { 
                    y: {min: 0, max: category === 'OMA-wet' || category === 'OMA-dry' ? 8 : 100},
                    x: {min: 0, max: 100}
                },
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
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {type === 'landscape-primary' ? <Select style={{marginRight: '1em', left: '45%'}} className={'select-font'} items={filter} label="Filter" size='small' defaultSelectedKey={filterValue} onSelectionChange={handleFilter}/> :
                <Select style={{marginRight: '1em'}} className={'select-font'} items={filter} label="Filter" size='small' defaultSelectedKey={filterValue} onSelectionChange={handleFilter}/> }
                { filterValue == 1 && <Select className={'select-font'} items={filterWithYearly} label="Filter" size='small' defaultSelectedKey={filterValueYearly} onSelectionChange={handleFilterYearly}/>}
                { filterValue == 2 && <Select className={'select-font'} items={filterWithQuarterly} label="Filter" size='small' defaultSelectedKey={filterValueQuarterly} onSelectionChange={handleFilterQuarterly}/>}
                { filterValue == 3 && <Select className={'select-font'} items={filterWithMonthly} label="Filter" size='small' defaultSelectedKey={filterValueMonthly} onSelectionChange={handleFilterMonthly}/>}
            </div>

            {/* Yearly && Current Year */}
            { filterValue == 1 && filterValueYearly == 1 &&
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

            {/* Yearly && Last 3 Years */}
            { filterValue == 1 && filterValueYearly == 2 &&
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

            {/* Yearly && Last 5 Years */}
            { filterValue == 1 && filterValueYearly == 3 &&
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
                    }]
                }}
                options={options}
            />}

            {/* First Quarter */}
            { filterValue == 2 && filterValueQuarterly == 1 &&
            <Bar 
                data={{
                    labels,
                    datasets: [{
                        label: "January",
                        data: januaryData,
                        borderColor: 'rgb(75, 94, 115)',
                        backgroundColor: 'rgb(75, 94, 115)',
                    },
                    {
                        label: "February",
                        data: februaryData,
                        borderColor: 'rgb(110, 53, 47)',
                        backgroundColor: 'rgb(110, 53, 47)',
                    },
                    {
                        label: "March",
                        data: marchData,
                        borderColor: 'rgb(54, 109, 67)',
                        backgroundColor: 'rgb(54, 109, 67)',
                    }]
                }}
                options={options}
            />}

            {/* Second Quarter */}
            { filterValue == 2 && filterValueQuarterly == 2 &&
            <Bar 
                data={{
                    labels,
                    datasets: [{
                        label: "April",
                        data: aprilData,
                        borderColor: 'rgb(75, 94, 115)',
                        backgroundColor: 'rgb(75, 94, 115)',
                    },
                    {
                        label: "May",
                        data: mayData,
                        borderColor: 'rgb(110, 53, 47)',
                        backgroundColor: 'rgb(110, 53, 47)',
                    },
                    {
                        label: "June",
                        data: juneData,
                        borderColor: 'rgb(54, 109, 67)',
                        backgroundColor: 'rgb(54, 109, 67)',
                    }]
                }}
                options={options}
            />}

            {/* Third Quarter */}
            { filterValue == 2 && filterValueQuarterly == 3 &&
            <Bar 
                data={{
                    labels,
                    datasets: [{
                        label: "July",
                        data: julyData,
                        borderColor: 'rgb(75, 94, 115)',
                        backgroundColor: 'rgb(75, 94, 115)',
                    },
                    {
                        label: "August",
                        data: augustData,
                        borderColor: 'rgb(110, 53, 47)',
                        backgroundColor: 'rgb(110, 53, 47)',
                    },
                    {
                        label: "September",
                        data: septemberData,
                        borderColor: 'rgb(54, 109, 67)',
                        backgroundColor: 'rgb(54, 109, 67)',
                    }]
                }}
                options={options}
            />}

            {/* Fourth Quarter */}
            { filterValue == 2 && filterValueQuarterly == 4 &&
            <Bar 
                data={{
                    labels,
                    datasets: [{
                        label: "October",
                        data: octoberData,
                        borderColor: 'rgb(75, 94, 115)',
                        backgroundColor: 'rgb(75, 94, 115)',
                    },
                    {
                        label: "November",
                        data: novemberData,
                        borderColor: 'rgb(110, 53, 47)',
                        backgroundColor: 'rgb(110, 53, 47)',
                    },
                    {
                        label: "December",
                        data: decemberData,
                        borderColor: 'rgb(54, 109, 67)',
                        backgroundColor: 'rgb(54, 109, 67)',
                    }]
                }}
                options={options}
            />}

            {/* January */}
            { filterValue == 3 && filterValueMonthly == 1 &&
            <Bar 
                data={{
                    labels,
                    datasets: [{
                        label: "January",
                        data: januaryData,
                        borderColor: 'rgb(75, 94, 115)',
                        backgroundColor: 'rgb(75, 94, 115)',
                    }]
                }}
                options={options}
            />}

            {/* February */}
            { filterValue == 3 && filterValueMonthly == 2 &&
            <Bar 
                data={{
                    labels,
                    datasets: [{
                        label: "February",
                        data: februaryData,
                        borderColor: 'rgb(75, 94, 115)',
                        backgroundColor: 'rgb(75, 94, 115)',
                    }]
                }}
                options={options}
            />}

            {/* March */}
            { filterValue == 3 && filterValueMonthly == 3 &&
            <Bar 
                data={{
                    labels,
                    datasets: [{
                        label: "March",
                        data: marchData,
                        borderColor: 'rgb(75, 94, 115)',
                        backgroundColor: 'rgb(75, 94, 115)',
                    }]
                }}
                options={options}
            />}

            {/* April */}
            { filterValue == 3 && filterValueMonthly == 4 &&
            <Bar 
                data={{
                    labels,
                    datasets: [{
                        label: "April",
                        data: aprilData,
                        borderColor: 'rgb(75, 94, 115)',
                        backgroundColor: 'rgb(75, 94, 115)',
                    }]
                }}
                options={options}
            />}

            {/* May */}
            { filterValue == 3 && filterValueMonthly == 5 &&
            <Bar 
                data={{
                    labels,
                    datasets: [{
                        label: "May",
                        data: mayData,
                        borderColor: 'rgb(75, 94, 115)',
                        backgroundColor: 'rgb(75, 94, 115)',
                    }]
                }}
                options={options}
            />}

            {/* June */}
            { filterValue == 3 && filterValueMonthly == 6 &&
            <Bar 
                data={{
                    labels,
                    datasets: [{
                        label: "June",
                        data: juneData,
                        borderColor: 'rgb(75, 94, 115)',
                        backgroundColor: 'rgb(75, 94, 115)',
                    }]
                }}
                options={options}
            />}

            {/* July */}
            { filterValue == 3 && filterValueMonthly == 7 &&
            <Bar 
                data={{
                    labels,
                    datasets: [{
                        label: "July",
                        data: julyData,
                        borderColor: 'rgb(75, 94, 115)',
                        backgroundColor: 'rgb(75, 94, 115)',
                    }]
                }}
                options={options}
            />}

            {/* August */}
            { filterValue == 3 && filterValueMonthly == 8 &&
            <Bar 
                data={{
                    labels,
                    datasets: [{
                        label: "August",
                        data: augustData,
                        borderColor: 'rgb(75, 94, 115)',
                        backgroundColor: 'rgb(75, 94, 115)',
                    }]
                }}
                options={options}
            />}

            {/* September */}
            { filterValue == 3 && filterValueMonthly == 9 &&
            <Bar 
                data={{
                    labels,
                    datasets: [{
                        label: "September",
                        data: septemberData,
                        borderColor: 'rgb(75, 94, 115)',
                        backgroundColor: 'rgb(75, 94, 115)',
                    }]
                }}
                options={options}
            />}

            {/* October */}
            { filterValue == 3 && filterValueMonthly == 10 &&
            <Bar 
                data={{
                    labels,
                    datasets: [{
                        label: "October",
                        data: octoberData,
                        borderColor: 'rgb(75, 94, 115)',
                        backgroundColor: 'rgb(75, 94, 115)',
                    }]
                }}
                options={options}
            />}

            {/* November */}
            { filterValue == 3 && filterValueMonthly == 11 &&
            <Bar 
                data={{
                    labels,
                    datasets: [{
                        label: "November",
                        data: novemberData,
                        borderColor: 'rgb(75, 94, 115)',
                        backgroundColor: 'rgb(75, 94, 115)',
                    }]
                }}
                options={options}
            />}

            {/* December */}
            { filterValue == 3 && filterValueMonthly == 12 &&
            <Bar 
                data={{
                    labels,
                    datasets: [{
                        label: "December",
                        data: decemberData,
                        borderColor: 'rgb(75, 94, 115)',
                        backgroundColor: 'rgb(75, 94, 115)',
                    }]
                }}
                options={options}
            />}
        </>
    )
};

export default Chart;
