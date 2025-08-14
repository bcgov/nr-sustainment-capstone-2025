import StyledButton from "../Button/button.styles";
import "./logoutButton.styles.css"
import { Button } from "@bcgov/design-system-react-components";

function LogoutButton({handleLogoutClick}: any){
    return(
        <Button className='logout' size='medium' variant='secondary' onPress={handleLogoutClick}>
            Log out
        </Button>
    )
}

export default LogoutButton;
