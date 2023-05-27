import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';

const VerticalDots = ({ id, onClick }) => {
    const vertDotsColor = () => {
        if (id % 2 === 0) {
            return 'cardBackgroundColor.alternate';
        } else {
            return 'cardBackgroundColor.main';
        }
    };
    return (
        <div>
            <IconButton onClick={onClick}>
            <MoreVertIcon
                sx={{ color: vertDotsColor(), width: 35, height: 35 }}
            />
            </IconButton>
        </div>
    )
}

export default VerticalDots
