import Footer from './common/Footer/Footer.tsx';
import Header from './common/Header/Header.tsx';
import Collapsible from './common/Collapsible/Collapsible.tsx';
import { Button } from './common/Button/Button.tsx';
import LogoutButton from './common/LogoutButton/LogoutButton.tsx';
import BackNavButton from './common/BackNavButton/BackNavButton.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useOrientation } from 'react-use';
import Chart from './common/Chart/Chart.tsx';

function SoilPenetrationResistanceCompare({handleLogoutClick}: any) {
    const location = useLocation();
    const navigate = useNavigate();
    const userData = location.state.id;
    const { type } = useOrientation();

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
            <div className='' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', marginTop: '2.8em' }} >
                <div className='margin-div'></div>
                { type === 'landscape-primary' ? 
                <div className='chart-container-landscape' style={{ height: '100vh', width: '80vw', marginLeft: '12vw', marginTop: '25px'}}>
                    <Chart userData={userData} category={"Soil-Penetration"} /></div> :
                <div className='chart-container'><Chart userData={userData} category={"Soil-Penetration"} /></div> }
            </div>
            { type === 'landscape-primary' ? 
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'absolute',
                        top: '40vh', left: '2vw'}}>
                    <div style={{ marginBottom: '0.7em' }}>
                        <Button size={'nav'} variant='secondary' disabled={false} text={'Home'} handleClick={handleReturnHomeClick}/>
                    </div>
                    <div style={{ marginBottom: '0.7em' }}>
                        <Button size={'nav'} variant='primary' disabled={false} text={'Add Data'} handleClick={handleCaptureDataClick}/>
                    </div>
                    <div style={{ marginBottom: '0.7em' }}>
                        <Button size={'nav'} variant='primary' disabled={false} text={'Compare'} handleClick={handleCompareDataClick}/>
                    </div>
            </div> : 
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Button size={'home'} variant='secondary' disabled={false} text={'Home'} handleClick={handleReturnHomeClick}/>
                    <Button size={'nav'} variant='primary' disabled={false} text={'Add Data'} handleClick={handleCaptureDataClick}/>
                    <Button size={'nav'} variant='primary' disabled={false} text={'Compare'} handleClick={handleCompareDataClick}/>
            </div>}
            <Collapsible children={<Footer/>}/>
        </>
    )
}

export default SoilPenetrationResistanceCompare;
