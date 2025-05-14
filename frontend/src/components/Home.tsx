import Footer from './common/Footer/Footer.tsx';
import Header from './common/Header/Header.tsx';
import { Button } from './common/Button/Button.tsx';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleCaptureDataClick = () => {
        navigate("/categories", {state:{page:'Capture'}});
    }

    const handleCompareDataClick = () => {
        navigate("/categories", {state:{page:'Compare'}});
    }

    return (
        <>
            <Header />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button size={'lg'} variant={'primary'} disabled={false} text={'Capture Data'} handleClick={handleCaptureDataClick}/>
                <Button size={'lg'} variant={'primary'} disabled={false} text={'Compare Data'} handleClick={handleCompareDataClick}/>
            </div>
            <Footer />
        </>
    )
}

export default Home;
