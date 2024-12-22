import { mint } from "@vanilla-mint/core";

export const app$ = mint('todo-app', [], {
    vmConnected(_) {
        console.warn({_})
        _.vmAppendChild({tag: 'h1', textContent: 'TODO App', styles: {color: 'black'}});
        _.vmAppendChild({tag: 'button', innerHTML: 'Add TODO', styles: {color: 'black'}, onclick: () => alert('todo')});
        _.innerHTML = 'todo'
    }
});