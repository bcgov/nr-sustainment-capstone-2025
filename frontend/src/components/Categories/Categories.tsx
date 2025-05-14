import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../common/Footer/Footer.tsx';
import Header from '../common/Header/Header.tsx';
import { Button } from '../common/Button/Button.tsx';
import '../Categories/categories.styles.css';

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
                <h2>Pick a category for {userClick}:</h2>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div>
                        <Button size={'lg'} variant='primary' disabled={false} text={'Ponding'} ></Button>
                        <Button size={'lg'} variant='primary' disabled={false} text={'Surface Crusting'} ></Button>
                    </div>
                    <div>
                        <Button size={'lg'} variant='primary' disabled={false} text={'Soil Coverage'} handleClick={handleSoilCoverageClick}></Button>
                        <Button size={'lg'} variant='primary' disabled={false} text={'Biospores'} ></Button>
                    </div>
                    <div>
                        <Button size={'lg'} variant='primary' disabled={false} text={'Organic Matter Analyses'} ></Button>
                        <Button size={'lg'} variant='primary' disabled={false} text={'Penetration Resistance'} ></Button>
                    </div>
                </div>
                <div className="clear"></div>
            <Footer />
        </>
    )
}

export default Categories;
