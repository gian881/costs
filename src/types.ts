export interface ProjectFromApi {
    category: {
        id: number
        name: string
    },
    name: string
    budget: number
    cost: number
    services: {
        name: string
        cost: number
        description: string
        id: string
    }[],
    id: number
}


export interface Option {
    id: number
    name: string
}
