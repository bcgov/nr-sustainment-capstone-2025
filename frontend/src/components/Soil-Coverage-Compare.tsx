import Footer from './common/Footer/Footer.tsx';
import Header from './common/Header/Header.tsx';
import Collapsible from './common/Collapsible/Collapsible.tsx';
import { Button } from './common/Button/Button.tsx';
import LogoutButton from './common/LogoutButton/LogoutButton.tsx';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackNavButton from './common/BackNavButton/BackNavButton.tsx';
import { Chart } from './common/Chart/Chart.tsx';
import { Carousel } from './common/Carousel/Carousel.tsx';
import { TabOptions, TabContentDisplay } from './common/Tabs/Tabs.tsx';

function CoverageCompare({handleLogoutClick}: any){
    const navigate = useNavigate();
    const location = useLocation();
    const userData = location.state.id;

    const handleReturnHomeClick = () => {
        navigate("/",  {state:{id: userData}});
    }

    const handleCaptureDataClick = () => {
        navigate("/categories", {state:{page:'capture', id: userData}});
    }

    const handleCompareDataClick = () => {
        navigate("/categories", {state:{page:'compare', id: userData}});
    }

    const [activeTab, setActiveTab] = useState(1);

    const dataTab = {
        label: "Data",
        content: <div className='chart-container'><Chart userData={userData} category={"Coverage"} /></div>,
        id: "0"
    }

    const visualsTab = {
        label: "Visuals",
        content: <Carousel userData={userData}/>,
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
            <TabOptions activeTab={activeTab} tabs={[dataTab, visualsTab]} setActiveTab={tabSwitch} style={{marginRight: "175px"}}/>
            <TabContentDisplay activeTab={activeTab} tabs={[visualsTab, dataTab]} />
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Button size={'home'} variant='secondary' disabled={false} text={'Home'} handleClick={handleReturnHomeClick}/>
              <Button size={'nav'} variant='primary' disabled={false} text={'Add Data'} handleClick={handleCaptureDataClick} />
              <Button size={'nav'} variant='primary' disabled={false} text={'Compare'} handleClick={handleCompareDataClick}/>
            </div>
            <Collapsible children={<Footer/>}/>
        </>
    )
}

export default CoverageCompare;
