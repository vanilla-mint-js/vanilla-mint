const letterRegex = /([a-z])([A-Z])/g;
const spaceRegex = /\s+/g;
const nonWordRegex = /[^\w-]/g;

export function dashCase(_: string) {
    return _.replace(letterRegex, '$1-$2')
        .toLowerCase()
        .replace(spaceRegex, '-')
        .replace(nonWordRegex, '')
        .toLowerCase();
}
