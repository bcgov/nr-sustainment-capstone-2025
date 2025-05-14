import Footer from './Footer/Footer.tsx'
import Header from './Header/Header.tsx'
import { Button } from './Button/Button.tsx'
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleCreateDataClick = () => {
        navigate("/categories", {state:{name:'Create'}});
    }

    const handleCompareDataClick = () => {
        navigate("/categories", {state:{name:'Compare'}});
    }

    return (
        <>
        <Header />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button size={'lg'} variant={'primary'} disabled={false} text={'Create Data'} handleClick={handleCreateDataClick}/>
            <Button size={'lg'} variant={'primary'} disabled={false} text={'Compare Data'} handleClick={handleCompareDataClick}/>
        </div>
        <Footer />
        </>
    )
}

export default Home
