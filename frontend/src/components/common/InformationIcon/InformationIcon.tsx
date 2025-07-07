import { useState } from 'react';
import "./informationIcon.styles.css";
import Modal from '../Modal/Modal'

function InformationIcon(){
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const instructions = <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <p style={{marginTop: '0.8em'}}>Using a wire flag, hold it by its end and insert it with
                            consistent speed into the soil, observing the resistance 
                            encountered as it is pushed in. Note the resistance (easy, 
                            noticeable, tough) and depth wire penetrates without bending.
                            Use the form below to record your observations.</p>
                            <img src="wire-flag.jpg" />
                        </div>

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
                        children={instructions}
                        modalStyle={{ width: '85vw' }}
                    />
            )}
        </>
    )
}

export default InformationIcon;
