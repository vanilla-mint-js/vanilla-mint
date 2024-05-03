
import { VanillaMint, injectScript } from '@vanilla-mint/core';
import { combineLatest, map, tap } from 'rxjs';


type TAttrs = {
    csv: any;
};

export class CsvTable extends VanillaMint<TAttrs> {
    static observedAttributes: Array<keyof TAttrs> = ['csv'];
    static tagName = 'csv-table';

    constructor() {
        super(CsvTable.observedAttributes);
    }

    override async vmConnected() {
        this.vmSubscribe(
            this.vmObserveAttr('csv')
                .pipe(
                    map(csv => csv.split('\n')),
                    map(([header]) => (header))
                )
        );
    }

    override vmDisconnected() { }
    override vmAdopted() { }
}
