import Footer from './common/Footer/Footer.tsx';
import Header from './common/Header/Header.tsx';
import Collapsible from './common/Collapsible/Collapsible.tsx';
import { Button } from './common/Button/Button.tsx';
import LogoutButton from './common/LogoutButton/LogoutButton.tsx';
import BackNavButton from './common/BackNavButton/BackNavButton.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import Chart from './common/Chart/Chart.tsx';
import { TabOptions, TabContentDisplay } from './common/Tabs/Tabs.tsx';
import { useState } from 'react';

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

    const [activeTab, setActiveTab] = useState(1);

    const dryDataTab = {
        label: "Dry",
        content: <div className='chart-container'><Chart userData={userData} category={"OMA-dry"} /></div>,
        id: "0"
    }

    const wetDataTab = {
        label: "Wet",
        content: <div className='chart-container'><Chart userData={userData} category={"OMA-wet"} /></div>,
        id: "1"
    }

    const tabSwitch = (index: number) => {
        index == 0 ? setActiveTab(1) : setActiveTab(0);
    }

    return(
        <>
            <Header />
            <BackNavButton />
            <LogoutButton handleLogoutClick={handleLogoutClick} />
            <div className='chart-container'><Chart userData={userData} category={"OMA"} /></div>
            <TabOptions activeTab={activeTab} tabs={[dryDataTab, wetDataTab]} setActiveTab={tabSwitch}/>
            <TabContentDisplay activeTab={activeTab} tabs={[dryDataTab, wetDataTab]} />
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Button size={'home'} variant='secondary' disabled={false} text={'Home'} handleClick={handleReturnHomeClick}/>
                        <Button size={'nav'} variant='primary' disabled={false} text={'Add Data'} handleClick={handleCaptureDataClick} />
                        <Button size={'nav'} variant='primary' disabled={false} text={'Compare'} handleClick={handleCompareDataClick}/>
                </div>
            <Collapsible children={<Footer/>}/>
        </>
    )
}

export default OrganicMatterAnalysisCompare;
