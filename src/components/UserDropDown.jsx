import { Dropdown } from "react-bootstrap"
export default function UserDropDown(props){
    return(
        <Dropdown className="nav-link mx-auto">
            <Dropdown.Toggle variant="link" id="dropdown-basic">
            {props.username}
            </Dropdown.Toggle>
    
            <Dropdown.Menu>
                <Dropdown.Item onClick={props.logOut}>Log Out</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
    
}