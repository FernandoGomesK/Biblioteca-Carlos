import {NavLink} from 'react-router-dom';


interface MenuItemProps {
    direction: string;
    label: string;
}

function MenuItem({ direction, label }: MenuItemProps) {
    return (
        <NavLink to={direction} className=" hover:text-white transition-colors duration-200">
            {label}
        </NavLink>
    );
}

export default MenuItem;