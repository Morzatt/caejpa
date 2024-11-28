import { base } from "$lib"

export async function getPreguntas() {
    const request = await fetch(`${base}/register/securityQuestions`, {
        method: "GET",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    const response = await request.json()
    return response 
}