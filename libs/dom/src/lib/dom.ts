import { TElementProps } from "./types/element-props.type";
import { asElementFactory } from "./functions/as-element-factory.function";

export const $a = (props?: TElementProps<HTMLAnchorElement>) => asElementFactory(document.createElement('a'), props);
export const $abbr = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('abbr'), props);
export const $address = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('address'), props);
export const $area = (props?: TElementProps<HTMLAreaElement>) => asElementFactory(document.createElement('area'), props);
export const $article = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('article'), props);
export const $aside = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('aside'), props);
export const $audio = (props?: TElementProps<HTMLAudioElement>) => asElementFactory(document.createElement('audio'), props);
export const $b = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('b'), props);
export const $base = (props?: TElementProps<HTMLBaseElement>) => asElementFactory(document.createElement('base'), props);
export const $bdi = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('bdi'), props);
export const $bdo = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('bdo'), props);
export const $blockquote = (props?: TElementProps<HTMLQuoteElement>) => asElementFactory(document.createElement('blockquote'), props);
export const $body = (props?: TElementProps<HTMLBodyElement>) => asElementFactory(document.createElement('body'), props);
export const $br = (props?: TElementProps<HTMLBRElement>) => asElementFactory(document.createElement('br'), props);
export const $button = (props?: TElementProps<HTMLButtonElement>) => asElementFactory(document.createElement('button'), props);
export const $canvas = (props?: TElementProps<HTMLCanvasElement>) => asElementFactory(document.createElement('canvas'), props);
export const $caption = (props?: TElementProps<HTMLTableCaptionElement>) => asElementFactory(document.createElement('caption'), props);
export const $cite = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('cite'), props);
export const $code = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('code'), props);
export const $col = (props?: TElementProps<HTMLTableColElement>) => asElementFactory(document.createElement('col'), props);
export const $colgroup = (props?: TElementProps<HTMLTableColElement>) => asElementFactory(document.createElement('colgroup'), props);
export const $data = (props?: TElementProps<HTMLDataElement>) => asElementFactory(document.createElement('data'), props);
export const $datalist = (props?: TElementProps<HTMLDataListElement>) => asElementFactory(document.createElement('datalist'), props);
export const $dd = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('dd'), props);
export const $del = (props?: TElementProps<HTMLModElement>) => asElementFactory(document.createElement('del'), props);
export const $details = (props?: TElementProps<HTMLDetailsElement>) => asElementFactory(document.createElement('details'), props);
export const $dfn = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('dfn'), props);
export const $dialog = (props?: TElementProps<HTMLDialogElement>) => asElementFactory(document.createElement('dialog'), props);
export const $div = (props?: TElementProps<HTMLDivElement>) => asElementFactory(document.createElement('div'), props);
export const $dl = (props?: TElementProps<HTMLDListElement>) => asElementFactory(document.createElement('dl'), props);
export const $dt = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('dt'), props);
export const $em = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('em'), props);
export const $embed = (props?: TElementProps<HTMLEmbedElement>) => asElementFactory(document.createElement('embed'), props);
export const $fieldset = (props?: TElementProps<HTMLFieldSetElement>) => asElementFactory(document.createElement('fieldset'), props);
export const $figcaption = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('figcaption'), props);
export const $figure = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('figure'), props);
export const $footer = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('footer'), props);
export const $form = (props?: TElementProps<HTMLFormElement>) => asElementFactory(document.createElement('form'), props);
export const $h1 = (props?: TElementProps<HTMLHeadingElement>) => asElementFactory(document.createElement('h1'), props);
export const $h2 = (props?: TElementProps<HTMLHeadingElement>) => asElementFactory(document.createElement('h2'), props);
export const $h3 = (props?: TElementProps<HTMLHeadingElement>) => asElementFactory(document.createElement('h3'), props);
export const $h4 = (props?: TElementProps<HTMLHeadingElement>) => asElementFactory(document.createElement('h4'), props);
export const $h5 = (props?: TElementProps<HTMLHeadingElement>) => asElementFactory(document.createElement('h5'), props);
export const $h6 = (props?: TElementProps<HTMLHeadingElement>) => asElementFactory(document.createElement('h6'), props);
export const $head = (props?: TElementProps<HTMLHeadElement>) => asElementFactory(document.createElement('head'), props);
export const $header = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('header'), props);
export const $hgroup = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('hgroup'), props);
export const $hr = (props?: TElementProps<HTMLHRElement>) => asElementFactory(document.createElement('hr'), props);
export const $html = (props?: TElementProps<HTMLHtmlElement>) => asElementFactory(document.createElement('html'), props);
export const $i = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('i'), props);
export const $iframe = (props?: TElementProps<HTMLIFrameElement>) => asElementFactory(document.createElement('iframe'), props);
export const $img = (props?: TElementProps<HTMLImageElement>) => asElementFactory(document.createElement('img'), props);
export const $input = (props?: TElementProps<HTMLInputElement>) => asElementFactory(document.createElement('input'), props);
export const $ins = (props?: TElementProps<HTMLModElement>) => asElementFactory(document.createElement('ins'), props);
export const $kbd = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('kbd'), props);
export const $label = (props?: TElementProps<HTMLLabelElement>) => asElementFactory(document.createElement('label'), props);
export const $legend = (props?: TElementProps<HTMLLegendElement>) => asElementFactory(document.createElement('legend'), props);
export const $li = (props?: TElementProps<HTMLLIElement>) => asElementFactory(document.createElement('li'), props);
export const $link = (props?: TElementProps<HTMLLinkElement>) => asElementFactory(document.createElement('link'), props);
export const $main = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('main'), props);
export const $map = (props?: TElementProps<HTMLMapElement>) => asElementFactory(document.createElement('map'), props);
export const $mark = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('mark'), props);
export const $math = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('math'), props);
export const $menu = (props?: TElementProps<HTMLMenuElement>) => asElementFactory(document.createElement('menu'), props);
export const $meta = (props?: TElementProps<HTMLMetaElement>) => asElementFactory(document.createElement('meta'), props);
export const $meter = (props?: TElementProps<HTMLMeterElement>) => asElementFactory(document.createElement('meter'), props);
export const $nav = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('nav'), props);
export const $noscript = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('noscript'), props);
export const $object = (props?: TElementProps<HTMLObjectElement>) => asElementFactory(document.createElement('object'), props);
export const $ol = (props?: TElementProps<HTMLOListElement>) => asElementFactory(document.createElement('ol'), props);
export const $optgroup = (props?: TElementProps<HTMLOptGroupElement>) => asElementFactory(document.createElement('optgroup'), props);
export const $option = (props?: TElementProps<HTMLOptionElement>) => asElementFactory(document.createElement('option'), props);
export const $output = (props?: TElementProps<HTMLOutputElement>) => asElementFactory(document.createElement('output'), props);
export const $p = (props?: TElementProps<HTMLParagraphElement>) => asElementFactory(document.createElement('p'), props);
export const $picture = (props?: TElementProps<HTMLPictureElement>) => asElementFactory(document.createElement('picture'), props);
export const $pre = (props?: TElementProps<HTMLPreElement>) => asElementFactory(document.createElement('pre'), props);
export const $progress = (props?: TElementProps<HTMLProgressElement>) => asElementFactory(document.createElement('progress'), props);
export const $q = (props?: TElementProps<HTMLQuoteElement>) => asElementFactory(document.createElement('q'), props);
export const $rp = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('rp'), props);
export const $rt = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('rt'), props);
export const $ruby = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('ruby'), props);
export const $s = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('s'), props);
export const $samp = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('samp'), props);
export const $script = (props?: TElementProps<HTMLScriptElement>) => asElementFactory(document.createElement('script'), props);
export const $section = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('section'), props);
export const $select = (props?: TElementProps<HTMLSelectElement>) => asElementFactory(document.createElement('select'), props);
export const $slot = (props?: TElementProps<HTMLSlotElement>) => asElementFactory(document.createElement('slot'), props);
export const $small = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('small'), props);
export const $source = (props?: TElementProps<HTMLSourceElement>) => asElementFactory(document.createElement('source'), props);
export const $span = (props?: TElementProps<HTMLSpanElement>) => asElementFactory(document.createElement('span'), props);
export const $strong = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('strong'), props);
export const $style = (props?: TElementProps<HTMLStyleElement>) => asElementFactory(document.createElement('style'), props);
export const $sub = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('sub'), props);
export const $summary = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('summary'), props);
export const $sup = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('sup'), props);
export const $table = (props?: TElementProps<HTMLTableElement>) => asElementFactory(document.createElement('table'), props);
export const $tbody = (props?: TElementProps<HTMLTableSectionElement>) => asElementFactory(document.createElement('tbody'), props);
export const $td = (props?: TElementProps<HTMLTableCellElement>) => asElementFactory(document.createElement('td'), props);
export const $template = (props?: TElementProps<HTMLTemplateElement>) => asElementFactory(document.createElement('template'), props);
export const $textarea = (props?: TElementProps<HTMLTextAreaElement>) => asElementFactory(document.createElement('textarea'), props);
export const $tfoot = (props?: TElementProps<HTMLTableSectionElement>) => asElementFactory(document.createElement('tfoot'), props);
export const $th = (props?: TElementProps<HTMLTableCellElement>) => asElementFactory(document.createElement('th'), props);
export const $thead = (props?: TElementProps<HTMLTableSectionElement>) => asElementFactory(document.createElement('thead'), props);
export const $time = (props?: TElementProps<HTMLTimeElement>) => asElementFactory(document.createElement('time'), props);
export const $title = (props?: TElementProps<HTMLTitleElement>) => asElementFactory(document.createElement('title'), props);
export const $tr = (props?: TElementProps<HTMLTableRowElement>) => asElementFactory(document.createElement('tr'), props);
export const $track = (props?: TElementProps<HTMLTrackElement>) => asElementFactory(document.createElement('track'), props);
export const $u = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('u'), props);
export const $ul = (props?: TElementProps<HTMLUListElement>) => asElementFactory(document.createElement('ul'), props);
export const $var = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('var'), props);
export const $video = (props?: TElementProps<HTMLVideoElement>) => asElementFactory(document.createElement('video'), props);
export const $wbr = (props?: TElementProps<HTMLElement>) => asElementFactory(document.createElement('wbr'), props);