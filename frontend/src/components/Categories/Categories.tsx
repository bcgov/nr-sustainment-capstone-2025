import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../common/Footer/Footer.tsx';
import Header from '../common/Header/Header.tsx';
import Collapsible from '../common/Collapsible/Collapsible.tsx';
import { Button } from '../common/Button/Button.tsx';
import '../Categories/categories.styles.css';
import BackNavButton from '../common/BackNavButton/BackNavButton.tsx';

function Categories(){
    const location = useLocation();
    const navigate = useNavigate();
    const userClick = location.state.page;

    const handleSoilCoverageClick = () => {
        if (userClick === "capture") {
            navigate("/soil-coverage-capture");
        }
        else if (userClick === "compare") {
            navigate("/soil-coverage-compare");
        }
    }

    return(
        <>
            <Header />
            <BackNavButton />
                <h2>Select an Assessment:</h2>
                    <div className="button-container">
                        <Button size={'md'} variant='primary' disabled={false} text={'Soil Coverage'} handleClick={handleSoilCoverageClick}></Button>
                    </div>
            <Collapsible children={<Footer/>}/>
        </>
    )
}

export default Categories;
