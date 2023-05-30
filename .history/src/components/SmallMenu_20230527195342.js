import React from 'react'
import { Menu, MenuItem } from '@mui/material'

const SmallMenu = ({ anchorEl, handleClose }) => {
    return (
        <div>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Edit</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>
        </div>
    )
}

export default SmallMenu
