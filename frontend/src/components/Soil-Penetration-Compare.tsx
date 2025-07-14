import Footer from './common/Footer/Footer.tsx';
import Header from './common/Header/Header.tsx';
import Collapsible from './common/Collapsible/Collapsible.tsx';
import { Button } from './common/Button/Button.tsx';
import LogoutButton from './common/LogoutButton/LogoutButton.tsx';
import BackNavButton from './common/BackNavButton/BackNavButton.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import Chart from './common/Chart/Chart.tsx';

function SoilPenetrationResistanceCompare({handleLogoutClick}: any) {
    const location = useLocation();
    const navigate = useNavigate();
    const userData = location.state.id;

    const handleReturnHomeClick = () => {
        navigate("/", {state:{id: userData}});
    }

    const handleCaptureDataClick = () => {
        navigate("/categories", {state:{page:'capture', id: userData}});
    }

    const handleCompareDataClick = () => {
        navigate("/categories", {state:{page:'compare', id: userData}});
    }

    return(
        <>
            <Header />
            <BackNavButton />
            <LogoutButton handleLogoutClick={handleLogoutClick} />
            <div className='coverageUploadImage' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                <div style={{height: '20vh'}}></div>
                <div className='chart-container'><Chart userData={userData} category={"Soil-Penetration"} /></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Button size={'home'} variant='secondary' disabled={false} text={'Home'} handleClick={handleReturnHomeClick}/>
                <Button size={'nav'} variant='primary' disabled={false} text={'Add Data'} handleClick={handleCaptureDataClick} />
                <Button size={'nav'} variant='primary' disabled={false} text={'Compare'} handleClick={handleCompareDataClick}/>
            </div>
            <Collapsible children={<Footer/>}/>
        </>
    )
}

export default SoilPenetrationResistanceCompare;
