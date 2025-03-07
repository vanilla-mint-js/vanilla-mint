const regex = /(?:^\w|[A-Z]|\b\w)/g;

export function camelCase(_: string) {
    return _.replace(regex, (__, i) => {
        return i === 0 ? __.toLowerCase() : __.toUpperCase();
    }).replace(/\s+/g, '');
}