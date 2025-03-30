import { IStep } from "../types/i-step.type";

export function getWith(step: IStep) {
    if ((step?.with as any)?.join) {
        return `[${(step.with as any).join(', ')}]`;
    }

    if ((step?.with as any)) {
        return `${(step.with as any)}`;
    }

    if ((step?.withJson as any)) {
        return 'JSON';
    }

    return 'data';
}