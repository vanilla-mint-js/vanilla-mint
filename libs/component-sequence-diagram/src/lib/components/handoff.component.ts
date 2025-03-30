import { $div } from "@vanilla-mint/dom";
import { leftArrowHtmlEntity, rightArrowHtmlEntity } from "./arrow.component";

export const $handoff = ({ isRtl, selfDirected }: { isRtl: boolean, selfDirected: boolean }) => {
        return $div({
            className: 'handoff',
            style: {
                display: 'flex',
                left: isRtl ? '.5rem' : undefined,
                right: isRtl ? undefined : '.5rem',
                top: '.3rem',
                position: 'relative',
                padding: '0',
                scale: '1.4'
            },
            children: !selfDirected ? [isRtl ? leftArrowHtmlEntity() : rightArrowHtmlEntity()] : []
        });
    }