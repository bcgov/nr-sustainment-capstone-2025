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

defaults.responsive = true;

export const Chart = () => {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return(
        <Line 
            data={{
                labels,
                datasets: [{
                    label: 'Soil Coverage Monthly Trend',
                    data: [0, 4, 2, 1, 5, 3, 4, 3, 1, 2, 5, 5],
                    fill: false,
                    borderColor: 'rgb(75, 94, 115)',
                    backgroundColor: 'rgb(75, 94, 115)',
                    tension: 0.1
                }]
            }}
        />
    )
}
