import Footer from './common/Footer/Footer.tsx';
import Header from './common/Header/Header.tsx';
import Collapsible from './common/Collapsible/Collapsible.tsx';
import { Button } from './common/Button/Button.tsx';
import LogoutButton from './common/LogoutButton/LogoutButton.tsx';
import { useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import BackNavButton from './common/BackNavButton/BackNavButton.tsx';
import { Chart } from './common/Chart/Chart.tsx';
import { Carousel } from './common/Carousel/Carousel.tsx';
import { TabOptions, TabContentDisplay } from './common/Tabs/Tabs.tsx';

function CoverageCompare({handleLogoutClick}: any){
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

    const [activeTab, setActiveTab] = useState(1);

    const dataTab = {
        label: "Data",
        content: <Chart />,
        id: "0"
    }

    const visualsTab = {
        label: "Visuals",
        content: <Carousel />,
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
            <TabOptions activeTab={activeTab} tabs={[dataTab, visualsTab]} setActiveTab={tabSwitch}/>
            <TabContentDisplay activeTab={activeTab} tabs={[visualsTab, dataTab]} />
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
