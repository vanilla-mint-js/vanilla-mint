import { IFieldOption } from "./field-option.interface";
import { TKeysOf } from "./keys-of.type";

export type TFormFields<TFormData> = TKeysOf<TFormData, IFieldOption>;