import { base } from '$lib';
import type { PageLoad } from './$types';

export const load = (async () => {
    try {
        // Request to get all the variables 
        const variablesRequest = await fetch(`${base}/variables`)
        const variables = await variablesRequest.json()
        console.log(variables)

        return {
            variables
        } 
    } catch(err) {
        console.log(err)
    }
}) satisfies PageLoad;