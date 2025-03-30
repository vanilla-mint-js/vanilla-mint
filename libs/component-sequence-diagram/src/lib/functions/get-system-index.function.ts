import { IStep } from "../types/i-step.type";

export function getSystemIndex(step: IStep, systems: string[]) {
    const startIndex = systems.indexOf(step.from || (step.internally || step.the) as string);
    const endIndex = systems.indexOf((step.to || (step.internally || step.the) as string) as string);

    return { startIndex, endIndex }
}