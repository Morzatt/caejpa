// Images Import
import arrowDown from "./images/keyboard_double_arrow_down_FILL0_wght400_GRAD0_opsz24.svg"

// Images Import 


import type { PageLoad } from './$types';

export const load = (async () => {
    try {
        // Request to get all the variables 
        const variablesRequest = await fetch("http://localhost:2606/variables")
        const variables = await variablesRequest.json()
        return {
            variables,
            images: {
                arrowDown: arrowDown
            }
        } 
    } catch(err) {
        console.log(err)
    }
}) satisfies PageLoad;
