import { $div, $h2, $img, $p, $section, TElementProps } from "@vanilla-mint/dom";
import { Route } from "@vanilla-mint/router";

export const landingPage: Route['render'] = () =>
    $div({
        className: 'grow flex flex-col justify-center items-center gap-16',
        children: [
            $landingSection({children: [
                $h2({ textContent: 'VanillaMintJS', className: 'text-6xl' }),
                $img({ src: 'logo.svg', style: { width: '10rem', height: '10rem' } }),
                $p({ className: 'text-lg', innerHTML: 'Experience the inspiration of the modern web <em>without</em> the common infusion of complexity.' }),
            ]}),
            $landingSection({className: 'bg-neutral-100', children: [

            ]})
        ],
    });


    const $landingSection = ({className, ...props}: TElementProps<HTMLElement>) => $section({
        className: 'w-full grow flex flex-col justify-center items-center gap-16 h-[80vh] ' + (className || ''), ...props
    });