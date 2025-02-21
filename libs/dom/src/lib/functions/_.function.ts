import { TElementProps } from "../types/element-props.type";
import { setAttrs } from "./set-element-attributes.function";
import { setElementStyles } from "./set-element-styles.function";

function _<TElement extends HTMLElement>(element: TElement, { style, className, children, ...props }: TElementProps = {}) {
    if (style) {
        setElementStyles(element, style);
    }

    if (className) {
        element.className = className;
    }

    if (children?.length) {
        children.forEach(child => element.appendChild(child));
    }

    setAttrs(element, props);

    return element;
}
export const $a = (props?: TElementProps) => _(document.createElement('a'), props);
export const $abbr = (props?: TElementProps) => _(document.createElement('abbr'), props);
export const $address = (props?: TElementProps) => _(document.createElement('address'), props);
export const $area = (props?: TElementProps) => _(document.createElement('area'), props);
export const $article = (props?: TElementProps) => _(document.createElement('article'), props);
export const $aside = (props?: TElementProps) => _(document.createElement('aside'), props);
export const $audio = (props?: TElementProps) => _(document.createElement('audio'), props);
export const $b = (props?: TElementProps) => _(document.createElement('b'), props);
export const $base = (props?: TElementProps) => _(document.createElement('base'), props);
export const $bdi = (props?: TElementProps) => _(document.createElement('bdi'), props);
export const $bdo = (props?: TElementProps) => _(document.createElement('bdo'), props);
export const $blockquote = (props?: TElementProps) => _(document.createElement('blockquote'), props);
export const $body = (props?: TElementProps) => _(document.createElement('body'), props);
export const $br = (props?: TElementProps) => _(document.createElement('br'), props);
export const $button = (props?: TElementProps) => _(document.createElement('button'), props);
export const $canvas = (props?: TElementProps) => _(document.createElement('canvas'), props);
export const $caption = (props?: TElementProps) => _(document.createElement('caption'), props);
export const $cite = (props?: TElementProps) => _(document.createElement('cite'), props);
export const $code = (props?: TElementProps) => _(document.createElement('code'), props);
export const $col = (props?: TElementProps) => _(document.createElement('col'), props);
export const $colgroup = (props?: TElementProps) => _(document.createElement('colgroup'), props);
export const $data = (props?: TElementProps) => _(document.createElement('data'), props);
export const $datalist = (props?: TElementProps) => _(document.createElement('datalist'), props);
export const $dd = (props?: TElementProps) => _(document.createElement('dd'), props);
export const $del = (props?: TElementProps) => _(document.createElement('del'), props);
export const $details = (props?: TElementProps) => _(document.createElement('details'), props);
export const $dfn = (props?: TElementProps) => _(document.createElement('dfn'), props);
export const $dialog = (props?: TElementProps) => _(document.createElement('dialog'), props);
export const $div = (props?: TElementProps) => _(document.createElement('div'), props);
export const $dl = (props?: TElementProps) => _(document.createElement('dl'), props);
export const $dt = (props?: TElementProps) => _(document.createElement('dt'), props);
export const $em = (props?: TElementProps) => _(document.createElement('em'), props);
export const $embed = (props?: TElementProps) => _(document.createElement('embed'), props);
export const $fieldset = (props?: TElementProps) => _(document.createElement('fieldset'), props);
export const $figcaption = (props?: TElementProps) => _(document.createElement('figcaption'), props);
export const $figure = (props?: TElementProps) => _(document.createElement('figure'), props);
export const $footer = (props?: TElementProps) => _(document.createElement('footer'), props);
export const $form = (props?: TElementProps) => _(document.createElement('form'), props);
export const $h1 = (props?: TElementProps) => _(document.createElement('h1'), props);
export const $h2 = (props?: TElementProps) => _(document.createElement('h2'), props);
export const $h3 = (props?: TElementProps) => _(document.createElement('h3'), props);
export const $h4 = (props?: TElementProps) => _(document.createElement('h4'), props);
export const $h5 = (props?: TElementProps) => _(document.createElement('h5'), props);
export const $h6 = (props?: TElementProps) => _(document.createElement('h6'), props);
export const $head = (props?: TElementProps) => _(document.createElement('head'), props);
export const $header = (props?: TElementProps) => _(document.createElement('header'), props);
export const $hgroup = (props?: TElementProps) => _(document.createElement('hgroup'), props);
export const $hr = (props?: TElementProps) => _(document.createElement('hr'), props);
export const $html = (props?: TElementProps) => _(document.createElement('html'), props);
export const $i = (props?: TElementProps) => _(document.createElement('i'), props);
export const $iframe = (props?: TElementProps) => _(document.createElement('iframe'), props);
export const $img = (props?: TElementProps) => _(document.createElement('img'), props);
export const $input = (props?: TElementProps) => _(document.createElement('input'), props);
export const $ins = (props?: TElementProps) => _(document.createElement('ins'), props);
export const $kbd = (props?: TElementProps) => _(document.createElement('kbd'), props);
export const $label = (props?: TElementProps) => _(document.createElement('label'), props);
export const $legend = (props?: TElementProps) => _(document.createElement('legend'), props);
export const $li = (props?: TElementProps) => _(document.createElement('li'), props);
export const $link = (props?: TElementProps) => _(document.createElement('link'), props);
export const $main = (props?: TElementProps) => _(document.createElement('main'), props);
export const $map = (props?: TElementProps) => _(document.createElement('map'), props);
export const $mark = (props?: TElementProps) => _(document.createElement('mark'), props);
export const $math = (props?: TElementProps) => _(document.createElement('math'), props);
export const $menu = (props?: TElementProps) => _(document.createElement('menu'), props);
export const $meta = (props?: TElementProps) => _(document.createElement('meta'), props);
export const $meter = (props?: TElementProps) => _(document.createElement('meter'), props);
export const $nav = (props?: TElementProps) => _(document.createElement('nav'), props);
export const $noscript = (props?: TElementProps) => _(document.createElement('noscript'), props);
export const $object = (props?: TElementProps) => _(document.createElement('object'), props);
export const $ol = (props?: TElementProps) => _(document.createElement('ol'), props);
export const $optgroup = (props?: TElementProps) => _(document.createElement('optgroup'), props);
export const $option = (props?: TElementProps) => _(document.createElement('option'), props);
export const $output = (props?: TElementProps) => _(document.createElement('output'), props);
export const $p = (props?: TElementProps) => _(document.createElement('p'), props);
export const $param = (props?: TElementProps) => _(document.createElement('param'), props);
export const $picture = (props?: TElementProps) => _(document.createElement('picture'), props);
export const $pre = (props?: TElementProps) => _(document.createElement('pre'), props);
export const $progress = (props?: TElementProps) => _(document.createElement('progress'), props);
export const $q = (props?: TElementProps) => _(document.createElement('q'), props);
export const $rp = (props?: TElementProps) => _(document.createElement('rp'), props);
export const $rt = (props?: TElementProps) => _(document.createElement('rt'), props);
export const $ruby = (props?: TElementProps) => _(document.createElement('ruby'), props);
export const $s = (props?: TElementProps) => _(document.createElement('s'), props);
export const $samp = (props?: TElementProps) => _(document.createElement('samp'), props);
export const $script = (props?: TElementProps) => _(document.createElement('script'), props);
export const $section = (props?: TElementProps) => _(document.createElement('section'), props);
export const $select = (props?: TElementProps) => _(document.createElement('select'), props);
export const $slot = (props?: TElementProps) => _(document.createElement('slot'), props);
export const $small = (props?: TElementProps) => _(document.createElement('small'), props);
export const $source = (props?: TElementProps) => _(document.createElement('source'), props);
export const $span = (props?: TElementProps) => _(document.createElement('span'), props);
export const $strong = (props?: TElementProps) => _(document.createElement('strong'), props);
export const $style = (props?: TElementProps) => _(document.createElement('style'), props);
export const $sub = (props?: TElementProps) => _(document.createElement('sub'), props);
export const $summary = (props?: TElementProps) => _(document.createElement('summary'), props);
export const $sup = (props?: TElementProps) => _(document.createElement('sup'), props);
export const $table = (props?: TElementProps) => _(document.createElement('table'), props);
export const $tbody = (props?: TElementProps) => _(document.createElement('tbody'), props);
export const $td = (props?: TElementProps) => _(document.createElement('td'), props);
export const $template = (props?: TElementProps) => _(document.createElement('template'), props);
export const $textarea = (props?: TElementProps) => _(document.createElement('textarea'), props);
export const $tfoot = (props?: TElementProps) => _(document.createElement('tfoot'), props);
export const $th = (props?: TElementProps) => _(document.createElement('th'), props);
export const $thead = (props?: TElementProps) => _(document.createElement('thead'), props);
export const $time = (props?: TElementProps) => _(document.createElement('time'), props);
export const $title = (props?: TElementProps) => _(document.createElement('title'), props);
export const $tr = (props?: TElementProps) => _(document.createElement('tr'), props);
export const $track = (props?: TElementProps) => _(document.createElement('track'), props);
export const $u = (props?: TElementProps) => _(document.createElement('u'), props);
export const $ul = (props?: TElementProps) => _(document.createElement('ul'), props);
export const $var = (props?: TElementProps) => _(document.createElement('var'), props);
export const $video = (props?: TElementProps) => _(document.createElement('video'), props);
export const $wbr = (props?: TElementProps) => _(document.createElement('wbr'), props);