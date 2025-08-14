/**
 * @summary Reusable back button navigation component
 * @author Dallas Richmond
 */
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function BackNavButton() {
    const navigate = useNavigate();
    const location = useLocation();

    const goBack = () => {
        navigate(-1);
    };

    if (location.pathname !== "/") {
        return (
            <FontAwesomeIcon className="backNavButton fa-3x" icon={faArrowLeft} color="#003366" onClick={goBack} />
        );
    }
    return <div />;
}
