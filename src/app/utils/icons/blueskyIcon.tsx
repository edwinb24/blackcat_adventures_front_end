import SvgIcon, {SvgIconProps} from '@mui/material/SvgIcon'
import React from 'react'

const BlueskyIcon: React.FC<SvgIconProps> = props => (
    <SvgIcon {...props} viewBox='0 0 24 24'>
        <path d='M12 2C6.477 2 2 6.484 2 12s4.477 10 10 10c5.516 0 10-4.484 10-10S17.516 2 12 2zm0 16c-3.313 0-6-2.686-6-6s2.687-6 6-6 6 2.686 6 6-2.687 6-6 6z' />
    </SvgIcon>
)

export default BlueskyIcon
