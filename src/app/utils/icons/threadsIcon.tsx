import SvgIcon, {SvgIconProps} from '@mui/material/SvgIcon'
import React from 'react'

const ThreadsIcon: React.FC<SvgIconProps> = props => (
    <SvgIcon {...props} viewBox='0 0 24 24'>
        <path d='M10 20h4V4h-4v16zm-6 0h4V4H4v16zm12 0h4V4h-4v16z' />
    </SvgIcon>
)

export default ThreadsIcon
