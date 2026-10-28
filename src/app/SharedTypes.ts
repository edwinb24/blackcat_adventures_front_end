import {EVENT_STATUS, MODULE_STATUS} from '@/utils/constants'

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
    position: number
}

export type EventSessionsType = {
    eventSessionNotes: string
    eventSessionStartTime: string
}

export type TypeEventEntry = {
    title: string
    description: string
    imageLink: string
    imageAltText: string
    eventNote: string
    eventSessions: Array<EventSessionsType>
    eventStatus: EVENT_STATUS
    linkToPurchaseTicket: string
    price: string
}
