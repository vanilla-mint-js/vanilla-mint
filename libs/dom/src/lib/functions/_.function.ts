import { TElementProps } from "../types/element-props.type";
import { setAttrs } from "./set-element-attributes.function";
import { setElementStyles } from "./set-element-styles.function";

export const _ = <TElement extends HTMLElement>(element: TElement, { style, className, children, ...props }: TElementProps<TElement> = {}) => {
    if (style) {
        setElementStyles(element, style);
    }

    if (className) {
        element.className = className;
    }

    if (children?.length) {
        children.forEach(child => element.appendChild(child));
    }

    setAttrs(element, props as any);

    return element;
}

export const $a = (props?: TElementProps<HTMLAnchorElement>) => _(document.createElement('a'), props);
export const $abbr = (props?: TElementProps<HTMLElement>) => _(document.createElement('abbr'), props);
export const $address = (props?: TElementProps<HTMLElement>) => _(document.createElement('address'), props);
export const $area = (props?: TElementProps<HTMLAreaElement>) => _(document.createElement('area'), props);
export const $article = (props?: TElementProps<HTMLElement>) => _(document.createElement('article'), props);
export const $aside = (props?: TElementProps<HTMLElement>) => _(document.createElement('aside'), props);
export const $audio = (props?: TElementProps<HTMLAudioElement>) => _(document.createElement('audio'), props);
export const $b = (props?: TElementProps<HTMLElement>) => _(document.createElement('b'), props);
export const $base = (props?: TElementProps<HTMLBaseElement>) => _(document.createElement('base'), props);
export const $bdi = (props?: TElementProps<HTMLElement>) => _(document.createElement('bdi'), props);
export const $bdo = (props?: TElementProps<HTMLElement>) => _(document.createElement('bdo'), props);
export const $blockquote = (props?: TElementProps<HTMLQuoteElement>) => _(document.createElement('blockquote'), props);
export const $body = (props?: TElementProps<HTMLBodyElement>) => _(document.createElement('body'), props);
export const $br = (props?: TElementProps<HTMLBRElement>) => _(document.createElement('br'), props);
export const $button = (props?: TElementProps<HTMLButtonElement>) => _(document.createElement('button'), props);
export const $canvas = (props?: TElementProps<HTMLCanvasElement>) => _(document.createElement('canvas'), props);
export const $caption = (props?: TElementProps<HTMLTableCaptionElement>) => _(document.createElement('caption'), props);
export const $cite = (props?: TElementProps<HTMLElement>) => _(document.createElement('cite'), props);
export const $code = (props?: TElementProps<HTMLElement>) => _(document.createElement('code'), props);
export const $col = (props?: TElementProps<HTMLTableColElement>) => _(document.createElement('col'), props);
export const $colgroup = (props?: TElementProps<HTMLTableColElement>) => _(document.createElement('colgroup'), props);
export const $data = (props?: TElementProps<HTMLDataElement>) => _(document.createElement('data'), props);
export const $datalist = (props?: TElementProps<HTMLDataListElement>) => _(document.createElement('datalist'), props);
export const $dd = (props?: TElementProps<HTMLElement>) => _(document.createElement('dd'), props);
export const $del = (props?: TElementProps<HTMLModElement>) => _(document.createElement('del'), props);
export const $details = (props?: TElementProps<HTMLDetailsElement>) => _(document.createElement('details'), props);
export const $dfn = (props?: TElementProps<HTMLElement>) => _(document.createElement('dfn'), props);
export const $dialog = (props?: TElementProps<HTMLDialogElement>) => _(document.createElement('dialog'), props);
export const $div = (props?: TElementProps<HTMLDivElement>) => _(document.createElement('div'), props);
export const $dl = (props?: TElementProps<HTMLDListElement>) => _(document.createElement('dl'), props);
export const $dt = (props?: TElementProps<HTMLElement>) => _(document.createElement('dt'), props);
export const $em = (props?: TElementProps<HTMLElement>) => _(document.createElement('em'), props);
export const $embed = (props?: TElementProps<HTMLEmbedElement>) => _(document.createElement('embed'), props);
export const $fieldset = (props?: TElementProps<HTMLFieldSetElement>) => _(document.createElement('fieldset'), props);
export const $figcaption = (props?: TElementProps<HTMLElement>) => _(document.createElement('figcaption'), props);
export const $figure = (props?: TElementProps<HTMLElement>) => _(document.createElement('figure'), props);
export const $footer = (props?: TElementProps<HTMLElement>) => _(document.createElement('footer'), props);
export const $form = (props?: TElementProps<HTMLFormElement>) => _(document.createElement('form'), props);
export const $h1 = (props?: TElementProps<HTMLHeadingElement>) => _(document.createElement('h1'), props);
export const $h2 = (props?: TElementProps<HTMLHeadingElement>) => _(document.createElement('h2'), props);
export const $h3 = (props?: TElementProps<HTMLHeadingElement>) => _(document.createElement('h3'), props);
export const $h4 = (props?: TElementProps<HTMLHeadingElement>) => _(document.createElement('h4'), props);
export const $h5 = (props?: TElementProps<HTMLHeadingElement>) => _(document.createElement('h5'), props);
export const $h6 = (props?: TElementProps<HTMLHeadingElement>) => _(document.createElement('h6'), props);
export const $head = (props?: TElementProps<HTMLHeadElement>) => _(document.createElement('head'), props);
export const $header = (props?: TElementProps<HTMLElement>) => _(document.createElement('header'), props);
export const $hgroup = (props?: TElementProps<HTMLElement>) => _(document.createElement('hgroup'), props);
export const $hr = (props?: TElementProps<HTMLHRElement>) => _(document.createElement('hr'), props);
export const $html = (props?: TElementProps<HTMLHtmlElement>) => _(document.createElement('html'), props);
export const $i = (props?: TElementProps<HTMLElement>) => _(document.createElement('i'), props);
export const $iframe = (props?: TElementProps<HTMLIFrameElement>) => _(document.createElement('iframe'), props);
export const $img = (props?: TElementProps<HTMLImageElement>) => _(document.createElement('img'), props);
export const $input = (props?: TElementProps<HTMLInputElement>) => _(document.createElement('input'), props);
export const $ins = (props?: TElementProps<HTMLModElement>) => _(document.createElement('ins'), props);
export const $kbd = (props?: TElementProps<HTMLElement>) => _(document.createElement('kbd'), props);
export const $label = (props?: TElementProps<HTMLLabelElement>) => _(document.createElement('label'), props);
export const $legend = (props?: TElementProps<HTMLLegendElement>) => _(document.createElement('legend'), props);
export const $li = (props?: TElementProps<HTMLLIElement>) => _(document.createElement('li'), props);
export const $link = (props?: TElementProps<HTMLLinkElement>) => _(document.createElement('link'), props);
export const $main = (props?: TElementProps<HTMLElement>) => _(document.createElement('main'), props);
export const $map = (props?: TElementProps<HTMLMapElement>) => _(document.createElement('map'), props);
export const $mark = (props?: TElementProps<HTMLElement>) => _(document.createElement('mark'), props);
export const $math = (props?: TElementProps<HTMLElement>) => _(document.createElement('math'), props);
export const $menu = (props?: TElementProps<HTMLMenuElement>) => _(document.createElement('menu'), props);
export const $meta = (props?: TElementProps<HTMLMetaElement>) => _(document.createElement('meta'), props);
export const $meter = (props?: TElementProps<HTMLMeterElement>) => _(document.createElement('meter'), props);
export const $nav = (props?: TElementProps<HTMLElement>) => _(document.createElement('nav'), props);
export const $noscript = (props?: TElementProps<HTMLElement>) => _(document.createElement('noscript'), props);
export const $object = (props?: TElementProps<HTMLObjectElement>) => _(document.createElement('object'), props);
export const $ol = (props?: TElementProps<HTMLOListElement>) => _(document.createElement('ol'), props);
export const $optgroup = (props?: TElementProps<HTMLOptGroupElement>) => _(document.createElement('optgroup'), props);
export const $option = (props?: TElementProps<HTMLOptionElement>) => _(document.createElement('option'), props);
export const $output = (props?: TElementProps<HTMLOutputElement>) => _(document.createElement('output'), props);
export const $p = (props?: TElementProps<HTMLParagraphElement>) => _(document.createElement('p'), props);
export const $picture = (props?: TElementProps<HTMLPictureElement>) => _(document.createElement('picture'), props);
export const $pre = (props?: TElementProps<HTMLPreElement>) => _(document.createElement('pre'), props);
export const $progress = (props?: TElementProps<HTMLProgressElement>) => _(document.createElement('progress'), props);
export const $q = (props?: TElementProps<HTMLQuoteElement>) => _(document.createElement('q'), props);
export const $rp = (props?: TElementProps<HTMLElement>) => _(document.createElement('rp'), props);
export const $rt = (props?: TElementProps<HTMLElement>) => _(document.createElement('rt'), props);
export const $ruby = (props?: TElementProps<HTMLElement>) => _(document.createElement('ruby'), props);
export const $s = (props?: TElementProps<HTMLElement>) => _(document.createElement('s'), props);
export const $samp = (props?: TElementProps<HTMLElement>) => _(document.createElement('samp'), props);
export const $script = (props?: TElementProps<HTMLScriptElement>) => _(document.createElement('script'), props);
export const $section = (props?: TElementProps<HTMLElement>) => _(document.createElement('section'), props);
export const $select = (props?: TElementProps<HTMLSelectElement>) => _(document.createElement('select'), props);
export const $slot = (props?: TElementProps<HTMLSlotElement>) => _(document.createElement('slot'), props);
export const $small = (props?: TElementProps<HTMLElement>) => _(document.createElement('small'), props);
export const $source = (props?: TElementProps<HTMLSourceElement>) => _(document.createElement('source'), props);
export const $span = (props?: TElementProps<HTMLSpanElement>) => _(document.createElement('span'), props);
export const $strong = (props?: TElementProps<HTMLElement>) => _(document.createElement('strong'), props);
export const $style = (props?: TElementProps<HTMLStyleElement>) => _(document.createElement('style'), props);
export const $sub = (props?: TElementProps<HTMLElement>) => _(document.createElement('sub'), props);
export const $summary = (props?: TElementProps<HTMLElement>) => _(document.createElement('summary'), props);
export const $sup = (props?: TElementProps<HTMLElement>) => _(document.createElement('sup'), props);
export const $table = (props?: TElementProps<HTMLTableElement>) => _(document.createElement('table'), props);
export const $tbody = (props?: TElementProps<HTMLTableSectionElement>) => _(document.createElement('tbody'), props);
export const $td = (props?: TElementProps<HTMLTableCellElement>) => _(document.createElement('td'), props);
export const $template = (props?: TElementProps<HTMLTemplateElement>) => _(document.createElement('template'), props);
export const $textarea = (props?: TElementProps<HTMLTextAreaElement>) => _(document.createElement('textarea'), props);
export const $tfoot = (props?: TElementProps<HTMLTableSectionElement>) => _(document.createElement('tfoot'), props);
export const $th = (props?: TElementProps<HTMLTableCellElement>) => _(document.createElement('th'), props);
export const $thead = (props?: TElementProps<HTMLTableSectionElement>) => _(document.createElement('thead'), props);
export const $time = (props?: TElementProps<HTMLTimeElement>) => _(document.createElement('time'), props);
export const $title = (props?: TElementProps<HTMLTitleElement>) => _(document.createElement('title'), props);
export const $tr = (props?: TElementProps<HTMLTableRowElement>) => _(document.createElement('tr'), props);
export const $track = (props?: TElementProps<HTMLTrackElement>) => _(document.createElement('track'), props);
export const $u = (props?: TElementProps<HTMLElement>) => _(document.createElement('u'), props);
export const $ul = (props?: TElementProps<HTMLUListElement>) => _(document.createElement('ul'), props);
export const $var = (props?: TElementProps<HTMLElement>) => _(document.createElement('var'), props);
export const $video = (props?: TElementProps<HTMLVideoElement>) => _(document.createElement('video'), props);
export const $wbr = (props?: TElementProps<HTMLElement>) => _(document.createElement('wbr'), props);