export interface Category {
    id: number
    name: string
}

export interface Project {
    category: Category
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


