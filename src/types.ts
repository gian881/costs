export interface Category {
    id: number
    name: string
}

export interface Service {
    name: string
    cost: number
    description: string
    id: string
}

export interface Project {
    category: Category
    name: string
    budget: number
    cost: number
    services: Service[],
    id: number
}


