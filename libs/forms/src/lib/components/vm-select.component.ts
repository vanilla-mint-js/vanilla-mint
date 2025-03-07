import { $option, $select, TElementProps } from "@vanilla-mint/dom"
import { ILookup } from "../types/lookup.interface";

export const $vmSelect = ({ options, ...props }: TElementProps<HTMLSelectElement> & { options: Array<ILookup<string, string> | HTMLOptionElement> }) => {
    return $select({
        ...props,
        children: options.map((option) => option instanceof HTMLElement ? option : $option({
            textContent: option.display,
            value: option.value
        }))
    });
}
