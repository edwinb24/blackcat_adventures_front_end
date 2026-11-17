import type {EVENT_STATUS, MODULE_STATUS} from '@/utils/constants'

export interface TypeModuleContent {
    title: string
    description?: string
    imageLink: string
    altText: string
    moduleStatus: MODULE_STATUS
    linkToPurchase: string
}

export interface TypeModuleEntry extends TypeModuleContent {
    shortDescription: string
    link: string
    position: number
}

export type EventSessionsType = {
    eventSessionNotes: string | null
    eventSessionStartTime: string | null
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
    position: number
}

export type TypeContactUsFieldName = 'name' | 'email' | 'message'

export type TypeContactUsFormInput = {
    value: string
    validationMessage: string
    edited: boolean
}

export type TypeContactUsFormData = Record<
    TypeContactUsFieldName,
    TypeContactUsFormInput
>
