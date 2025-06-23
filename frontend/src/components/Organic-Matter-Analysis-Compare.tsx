import Footer from './common/Footer/Footer.tsx';
import Header from './common/Header/Header.tsx';
import Collapsible from './common/Collapsible/Collapsible.tsx';
import { Button } from './common/Button/Button.tsx';
import LogoutButton from './common/LogoutButton/LogoutButton.tsx';
import BackNavButton from './common/BackNavButton/BackNavButton.tsx';
import { useLocation, useNavigate } from 'react-router-dom';

function OrganicMatterAnalysisCompare({handleLogoutClick}: any) {
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
                <div className='' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Button size={'md'} variant='secondary' disabled={false} text={'Back to Home'} handleClick={handleReturnHomeClick}/>
                    <Button size={'md'} variant='primary' disabled={false} text={'Input Another Category'} handleClick={handleCaptureDataClick}/>
                    <Button size={'md'} variant='primary' disabled={false} text={'Compare Data'} handleClick={handleCompareDataClick}/>
                </div>
            <Collapsible children={<Footer/>}/>
        </>
    )
}


export default OrganicMatterAnalysisCompare;
