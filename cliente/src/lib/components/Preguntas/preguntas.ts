export async function getPreguntas() {
    const request = await fetch("http://localhost:2606/register/securityQuestions", {
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