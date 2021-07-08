import {SETTINGS} from "../actionsList";

export function op_cl_action(value) {
    return {
        type: SETTINGS,
        value: value,
    }
}