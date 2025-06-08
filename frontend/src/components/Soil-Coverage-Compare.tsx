import Footer from './common/Footer/Footer.tsx';
import Header from './common/Header/Header.tsx';
import Collapsible from './common/Collapsible/Collapsible.tsx';
import { Button } from './common/Button/Button.tsx';
import { useNavigate } from 'react-router-dom';
import BackNavButton from './common/BackNavButton/BackNavButton.tsx';
import { Chart } from './common/Chart/Chart.tsx';

function CoverageCompare(){
    const navigate = useNavigate();

    const handleReturnHomeClick = () => {
        navigate("/");
    }

    const handleCaptureDataClick = () => {
        navigate("/categories", {state:{page:'capture'}});
    }

    const handleCompareDataClick = () => {
        navigate("/categories", {state:{page:'compare'}});
    }
    return(
        <>
            <Header />
            <BackNavButton />
            <Chart />
                <div className='' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Button size={'md'} variant='secondary' disabled={false} text={'Back to Home'} handleClick={handleReturnHomeClick}/>
                    <Button size={'md'} variant='primary' disabled={false} text={'Input Another Category'} handleClick={handleCaptureDataClick}/>
                    <Button size={'md'} variant='primary' disabled={false} text={'Compare Data'} handleClick={handleCompareDataClick}/>
                </div>
            <Collapsible children={<Footer/>}/>
        </>
    )
}

export default CoverageCompare;
