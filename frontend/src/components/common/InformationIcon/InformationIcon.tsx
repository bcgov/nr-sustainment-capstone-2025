import { useState } from 'react';
import "./informationIcon.styles.css";
import Modal from '../Modal/Modal'
import { TabOptions, TabContentDisplay } from '../Tabs/Tabs.tsx';

function InformationIcon(){
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(1);
    
    const wireFlagInstructions = <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <p style={{marginTop: '0.8em'}}>Using a wire flag, hold it by its end and insert it with
                            consistent speed into the soil, observing the resistance 
                            encountered as it is pushed in. Note the resistance (easy, 
                            noticeable, tough) and depth wire penetrates without bending.
                            Use the form below to record your observations.</p>
                            <img src="wire-flag.jpg" />
                        </div>

    const penetrometerInstructions = <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <p style={{marginTop: '0.8em'}}>Using a penetrometer, apply slow and steady downward
                            pressure so the penetrometer rod sinks at about 1 inch per second, watching the pressure 
                            gauge as it moves. Record the maximum pressure and the corresponding depth observed.</p>
                            <img src="Penetrometer.jpg" />
                        </div>

    const wireFlagTab = {
        label: "Wire Flag",
        content: wireFlagInstructions,
        id: "0"
    }

    const penetrometerTab = {
        label: "Penetrometer",
        content: penetrometerInstructions,
        id: "1"
    }

    const tabSwitch = (index: number) => {
        index == 0 ? setActiveTab(1) : setActiveTab(0);
    }

    const handleImgClick = () => {
        setIsDialogOpen(true);
    }

    return(
        <>
            <img id="info" src="info-icon.png" onClick={handleImgClick}/>
            {isDialogOpen && (
                    <Modal
                        isOpen={isDialogOpen}
                        onOpenChange={() => {
                            setIsDialogOpen(false); 
                        }}
                        title='Instructions'
                        children={
                            <div>
                            <TabOptions activeTab={activeTab} tabs={[wireFlagTab, penetrometerTab]} setActiveTab={tabSwitch} style={{height: '7vh'}}/>
                            <TabContentDisplay activeTab={activeTab} tabs={[penetrometerTab, wireFlagTab]} />
                            </div>}
                        modalStyle={{ width: '85vw', overflow: 'scroll' }}
                    />
            )}
        </>
    )
}

export default InformationIcon;
