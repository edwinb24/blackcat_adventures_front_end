import SvgIcon, {SvgIconProps} from '@mui/material/SvgIcon'
import React from 'react'

const TwitchIcon: React.FC<SvgIconProps> = props => (
    <SvgIcon {...props} viewBox='0 0 24 24'>
        <path d='M4 2L2 6v14h6v4h4l4-4h4l4-4V2H4zm16 12l-2 2h-4l-2 2v-2H6V4h14v10zM9 7h2v5H9V7zm4 0h2v5h-2V7z' />
    </SvgIcon>
)

export default TwitchIcon
