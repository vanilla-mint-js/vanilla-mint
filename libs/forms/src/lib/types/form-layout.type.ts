type TFormFieldName<TFormData> = keyof TFormData;
type TArbitraryRendererWithValue<TFormData> = (value: TFormData) => any;
type TArbitraryRendererWithoutValue = () => any;
type TArbitraryRenderer<TFormData> = TArbitraryRendererWithValue<TFormData> | TArbitraryRendererWithoutValue;
export type TFormLayout<TFormData> = Array<Array<TArbitraryRenderer<TFormData> | TFormFieldName<TFormData>>>;