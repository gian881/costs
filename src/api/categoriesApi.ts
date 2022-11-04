import { Category } from "../types"

export async function getCategories(): Promise<Category[]> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    return res.json()
}
