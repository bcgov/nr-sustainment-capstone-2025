import StyledButton from "../Button/button.styles";
import "./logoutButton.styles.css"

function LogoutButton({handleLogoutClick}: any){
    return(
        <StyledButton id='logout' size={'md'} variant='secondary' disabled={false} onClick={handleLogoutClick}>
            Log out
        </StyledButton>
    )
}

export default LogoutButton;
