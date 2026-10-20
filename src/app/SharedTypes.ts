import {MODULE_STATUS} from '@/utils/constants'

export interface TypeModuleContent {
    title: string
    description?: string
    imageLink: string
    moduleStatus: MODULE_STATUS
    linkToPurchase: string
    id: string
}

export interface TypeModuleEntry extends TypeModuleContent {
    shortDescription: string
    link: string
    imageLink: string
}
