
import { IStep } from "../types/i-step.type";
import { getWith } from "./get-with.function";

export function getMessage(step: IStep, startName: string, endName: string): string {
    if (step.internally || step.the) {
        return `<b style="color: #ffffff">${step.internally || step.the}</b> will ${step.will || step.because}`;
    }

    const transmission = `<em style="color: #ffffff">${getWith(step)}</em>`;
    const defaultMessage = `<b style="color: #ffffff">${startName}</b> transmits ${typeof transmission === 'string' ? transmission : JSON.stringify(transmission, null, 2)} to <b style="color: #ffffff">${endName}</b>`;

    if (step.because && (step.with || step.withJson)) {
        return `${defaultMessage} because ${step.because}`;
    }

    return step.because || defaultMessage;
}
