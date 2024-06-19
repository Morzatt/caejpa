import type { PageLoad } from './$types';
import arrowDown from "./images/keyboard_double_arrow_down_FILL0_wght400_GRAD0_opsz24.svg"
export const load = (async () => {
    return {
        images: {
            arrowDown: arrowDown
        }
    };
}) satisfies PageLoad;