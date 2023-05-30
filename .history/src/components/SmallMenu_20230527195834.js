import React from 'react'
import { Menu, MenuItem } from '@mui/material'

const SmallMenu = ({ anchorEl, handleClose }) => {
    
    const [listEdit, setListEdit] = useState(false);

    const handleEdit = () => {
        setListEdit(true);
    }
    
    return (
        <div>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>
        </div>
    )
}

export default SmallMenu
