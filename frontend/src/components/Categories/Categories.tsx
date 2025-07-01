import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../common/Footer/Footer.tsx';
import Header from '../common/Header/Header.tsx';
import Collapsible from '../common/Collapsible/Collapsible.tsx';
import { Button } from '../common/Button/Button.tsx';
import LogoutButton from '../common/LogoutButton/LogoutButton.tsx';
import '../Categories/categories.styles.css';
import BackNavButton from '../common/BackNavButton/BackNavButton.tsx';

function Categories({handleLogoutClick}: any){
    const location = useLocation();
    const navigate = useNavigate();
    const userClick = location.state.page;
    const id = location.state.id;

    const handleSoilCoverageClick = () => {
        if (userClick === "capture") {
            navigate("/soil-coverage-capture", {state:{id: id}});
        }
        else if (userClick === "compare") {
            navigate("/soil-coverage-compare", {state:{id: id}});
        }
    }

    const handleOrganicMatterAnalysisClick = () => {
        if (userClick === "capture") {
            navigate("/organic-matter-analysis-capture", {state:{id: id}});
        }
        else if (userClick === "compare") {
            navigate("/organic-matter-analysis-compare", {state:{id: id}});
        }
    }

    const handleSoilPenetrationClick = () => {
        if (userClick === "capture") {
            navigate("/soil-penetration-resistance-capture", {state:{id: id}});
        }
        else if (userClick === "compare") {
            navigate("/soil-penetration-resistance-capture", {state:{id: id}});
        }
    }

    return(
        <>
            <Header />
            <BackNavButton />
            <LogoutButton handleLogoutClick={handleLogoutClick}/>
                <h2>Select an Assessment:</h2>
                    <div className="button-container">
                        <Button size={'md'} variant='primary' disabled={false} text={'Soil Coverage'} handleClick={handleSoilCoverageClick}></Button>
                        <Button size={'md'} variant='primary' disabled={false} text={'Organic Matter Analysis'} handleClick={handleOrganicMatterAnalysisClick}></Button>
                        <Button size={'md'} variant='primary' disabled={false} text={'Soil Penetration Resistance'} handleClick={handleSoilPenetrationClick}></Button>
                    </div>
            <Collapsible children={<Footer/>}/>
        </>
    )
}

export default Categories;
