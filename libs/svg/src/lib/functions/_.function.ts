import { CSSProperties } from "../types/css-properties.type";
import { TSvgProps } from "../types/svg-props.type";
import { setSvgAttrs } from "./set-svg-attributes.function";
import { setSvgStyles } from "./set-svg-styles.function";

export const __ = <TElement extends SVGElement>(element: TElement, { style, className, children, ...props }: TSvgProps<TElement> = {}) => {
    if (style) {
        setSvgStyles(element, style);
    }

    // if (className) {
    //     element.className = className;
    // }

    setSvgAttrs(element, props as any);

    if (children?.length) {
        children.forEach(child => element.appendChild(child));
    }

    return element;
}

export const svg$a = (props: TSvgProps<SVGAElement>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'a'), props);
export const svg$animate = (props: TSvgProps<SVGAnimateElement>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'animate'), props);
export const svg$animateMotion = (props: TSvgProps<SVGAnimateMotionElement>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion'), props);
export const svg$animateTransform = (props: TSvgProps<SVGAnimateTransformElement>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'animateTransform'), props);
export const svg$circle = (props: TSvgProps<SVGCircleElement>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'circle'), props);
export const svg$clipPath = (props: TSvgProps<SVGClipPathElement>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'clipPath'), props);
export const svg$defs = (props: TSvgProps<SVGDefsElement>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'defs'), props);
export const svg$desc = (props: TSvgProps<SVGDescElement>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'desc'), props);
export const svg$discard = (props: TSvgProps<SVGElement>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'discard'), props);
export const svg$ellipse = (props: TSvgProps<SVGEllipseElement>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'ellipse'), props);
export const svg$feBlend = (props: TSvgProps<SVGFEBlendElement>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'feBlend'), props);
export const svg$feColorMatrix = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix'), props);
export const svg$feComponentTransfer = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'feComponentTransfer'), props);
export const svg$feComposite = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'feComposite'), props);
export const svg$feConvolveMatrix = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'feConvolveMatrix'), props);
export const svg$feDiffuseLighting = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'feDiffuseLighting'), props);
export const svg$feDisplacementMap = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap'), props);
export const svg$feDistantLight = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'feDistantLight'), props);
export const svg$feDropShadow = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'feDropShadow'), props);
export const svg$feFlood = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'feFlood'), props);
export const svg$feFuncA = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'feFuncA'), props);
export const svg$feFuncB = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'feFuncB'), props);
export const svg$feFuncG = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'feFuncG'), props);
export const svg$feFuncR = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'feFuncR'), props);
export const svg$feGaussianBlur = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur'), props);
export const svg$feImage = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'feImage'), props);
export const svg$feMerge = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'feMerge'), props);
export const svg$feMergeNode = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode'), props);
export const svg$feMorphology = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'feMorphology'), props);
export const svg$feOffset = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'feOffset'), props);
export const svg$fePointLight = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'fePointLight'), props);
export const svg$feSpecularLighting = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'feSpecularLighting'), props);
export const svg$feSpotLight = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'feSpotLight'), props);
export const svg$feTile = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'feTile'), props);
export const svg$feTurbulence = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'feTurbulence'), props);
export const svg$filter = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'filter'), props);
export const svg$foreignObject = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject'), props);
export const svg$g = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'g'), props);
export const svg$image = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'image'), props);
export const svg$line = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'line'), props);
export const svg$linearGradient = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient'), props);
export const svg$marker = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'marker'), props);
export const svg$mask = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'mask'), props);
export const svg$metadata = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'metadata'), props);
export const svg$mpath = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'mpath'), props);
export const svg$path = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'path'), props);
export const svg$pattern = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'pattern'), props);
export const svg$polygon = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'polygon'), props);
export const svg$polyline = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'polyline'), props);
export const svg$radialGradient = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient'), props);
export const svg$rect = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'rect'), props);
export const svg$script = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'script'), props);
export const svg$set = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'set'), props);
export const svg$stop = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'stop'), props);
export const svg$style = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'style'), props);
export const svg$svg = (props: TSvgProps<SVGSVGElement>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'svg'), props);
export const svg$switch = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'switch'), props);
export const svg$symbol = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'symbol'), props);
export const svg$text = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'text'), props);
export const svg$textPath = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'textPath'), props);
export const svg$title = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'title'), props);
export const svg$tspan = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'tspan'), props);
export const svg$use = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'use'), props);
export const svg$view = (props: TSvgProps<any>) => __(document.createElementNS('http://www.w3.org/2000/svg', 'view'), props);