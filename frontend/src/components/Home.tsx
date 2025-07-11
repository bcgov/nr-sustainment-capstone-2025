import Footer from './common/Footer/Footer.tsx';
import Header from './common/Header/Header.tsx';
import Collapsible from './common/Collapsible/Collapsible.tsx';
import { Button } from './common/Button/Button.tsx';
import LogoutButton from './common/LogoutButton/LogoutButton.tsx';
import { useLocation, useNavigate } from 'react-router-dom';

function Home({handleLogoutClick}: any) {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state.id;

    const handleCaptureDataClick = () => {
        navigate("/categories", {state:{page:'capture', id: id}});
    }

    const handleCompareDataClick = () => {
        navigate("/categories", {state:{page:'compare', id: id}});
    }

    return (
        <>
            <Header />
            <LogoutButton handleLogoutClick={handleLogoutClick} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button size={'lg'} variant={'primary'} disabled={false} text={'Capture Data'} handleClick={handleCaptureDataClick}/>
                <Button size={'lg'} variant={'primary'} disabled={false} text={'Compare Data'} handleClick={handleCompareDataClick}/>
            </div>
            <Collapsible children={<Footer/>}/>
        </>
    )
}

export default Home;
