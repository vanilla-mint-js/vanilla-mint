import { $div } from "@vanilla-mint/dom";
import { leftArrowHtmlEntity, rightArrowHtmlEntity } from "./arrow.component";

export const $handoff = ({ isRtl, selfDirected }: { isRtl: boolean, selfDirected: boolean }) => {
        return $div({
            className: 'handoff',
            style: {
                display: 'flex',
                padding: '0',
                scale: '1.6'
            },
            children: !selfDirected ? [isRtl ? leftArrowHtmlEntity() : rightArrowHtmlEntity()] : []
        });
    }