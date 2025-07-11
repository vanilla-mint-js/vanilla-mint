import { TSvgProps } from "../types/svg-props.type";
import { setSvgAttrs } from "./set-svg-attributes.function";
import { setSvgStyles } from "./set-svg-styles.function";

export const svgNamespace = 'http://www.w3.org/2000/svg';

const __ = <TElement extends SVGElement>(element: TElement, { style, className, children, ...props }: TSvgProps<TElement> = {}) => {
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

export const $svgA = (props: TSvgProps<SVGAElement>) => __(document.createElementNS(svgNamespace, 'a'), props);
export const $svgAnimate = (props: TSvgProps<SVGAnimateElement>) => __(document.createElementNS(svgNamespace, 'animate'), props);
export const $svgAnimateMotion = (props: TSvgProps<SVGAnimateMotionElement>) => __(document.createElementNS(svgNamespace, 'animateMotion'), props);
export const $svgAnimateTransform = (props: TSvgProps<SVGAnimateTransformElement>) => __(document.createElementNS(svgNamespace, 'animateTransform'), props);
export const $svgCircle = (props: TSvgProps<SVGCircleElement>) => __(document.createElementNS(svgNamespace, 'circle'), props);
export const $svgClipPath = (props: TSvgProps<SVGClipPathElement>) => __(document.createElementNS(svgNamespace, 'clipPath'), props);
export const $svgDefs = (props: TSvgProps<SVGDefsElement>) => __(document.createElementNS(svgNamespace, 'defs'), props);
export const $svgDesc = (props: TSvgProps<SVGDescElement>) => __(document.createElementNS(svgNamespace, 'desc'), props);
export const $svgDiscard = (props: TSvgProps<SVGElement>) => __(document.createElementNS(svgNamespace, 'discard'), props);
export const $svgEllipse = (props: TSvgProps<SVGEllipseElement>) => __(document.createElementNS(svgNamespace, 'ellipse'), props);
export const $svgFeBlend = (props: TSvgProps<SVGFEBlendElement>) => __(document.createElementNS(svgNamespace, 'feBlend'), props);
export const $svgFeColorMatrix = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'feColorMatrix'), props);
export const $svgFeComponentTransfer = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'feComponentTransfer'), props);
export const $svgFeComposite = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'feComposite'), props);
export const $svgFeConvolveMatrix = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'feConvolveMatrix'), props);
export const $svgFeDiffuseLighting = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'feDiffuseLighting'), props);
export const $svgFeDisplacementMap = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'feDisplacementMap'), props);
export const $svgFeDistantLight = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'feDistantLight'), props);
export const $svgFeDropShadow = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'feDropShadow'), props);
export const $svgFeFlood = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'feFlood'), props);
export const $svgFeFuncA = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'feFuncA'), props);
export const $svgFeFuncB = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'feFuncB'), props);
export const $svgFeFuncG = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'feFuncG'), props);
export const $svgFeFuncR = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'feFuncR'), props);
export const $svgFeGaussianBlur = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'feGaussianBlur'), props);
export const $svgFeImage = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'feImage'), props);
export const $svgFeMerge = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'feMerge'), props);
export const $svgFeMergeNode = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'feMergeNode'), props);
export const $svgFeMorphology = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'feMorphology'), props);
export const $svgFeOffset = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'feOffset'), props);
export const $svgFePointLight = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'fePointLight'), props);
export const $svgFeSpecularLighting = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'feSpecularLighting'), props);
export const $svgFeSpotLight = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'feSpotLight'), props);
export const $svgFeTile = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'feTile'), props);
export const $svgFeTurbulence = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'feTurbulence'), props);
export const $svgFilter = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'filter'), props);
export const $svgForeignObject = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'foreignObject'), props);
export const $svgG = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'g'), props);
export const $svgImage = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'image'), props);
export const $svgLine = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'line'), props);
export const $svgLinearGradient = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'linearGradient'), props);
export const $svgMarker = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'marker'), props);
export const $svgMask = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'mask'), props);
export const $svgMetadata = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'metadata'), props);
export const $svgMpath = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'mpath'), props);
export const $svgPath = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'path'), props);
export const $svgPattern = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'pattern'), props);
export const $svgPolygon = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'polygon'), props);
export const $svgPolyline = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'polyline'), props);
export const $svgRadialGradient = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'radialGradient'), props);
export const $svgRect = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'rect'), props);
export const $svgScript = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'script'), props);
export const $svgSet = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'set'), props);
export const $svgStop = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'stop'), props);
export const $svgStyle = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'style'), props);
export const $svgSvg = (props: TSvgProps<SVGSVGElement>) => __(document.createElementNS(svgNamespace, 'svg'), props);
export const $svgSwitch = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'switch'), props);
export const $svgSymbol = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'symbol'), props);
export const $svgText = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'text'), props);
export const $svgTextPath = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'textPath'), props);
export const $svgTitle = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'title'), props);
export const $svgTspan = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'tspan'), props);
export const $svgUse = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'use'), props);
export const $svgView = (props: TSvgProps<any>) => __(document.createElementNS(svgNamespace, 'view'), props);