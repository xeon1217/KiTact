import React from "react";
import { useSelector } from 'react-redux';

const Permit = (props) => {
    const is_login = useSelector(state => state.user.user);
    
    if(is_login) {
        return (
            <React.Fragment>
                {props.children}
            </React.Fragment>
        );
    }
    return null;

}

export default Permit;