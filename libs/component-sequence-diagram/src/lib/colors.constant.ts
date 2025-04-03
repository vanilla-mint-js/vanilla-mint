const red900 = 'rgb(130, 24, 26)';
const orange900 = 'rgb(126, 42, 12)';
const amber900 = 'rgb(123, 51, 6)';
const yellow900 = 'rgb(115, 62, 10)';
const lime900 = 'rgb(53, 83, 14)';
const green900 = 'rgb(13, 84, 43)';
const emerald900 = 'rgb(0, 79, 59)';
const teal900 = 'rgb(11, 79, 74)';
const cyan900 = 'rgb(16, 78, 100)';
const sky900 = 'rgb(2, 74, 112)';
const blue900 = 'rgb(28, 57, 142)';
const indigo900 = 'rgb(49, 44, 133)';
const violet900 = 'rgb(77, 23, 154)';
const purple900 = 'rgb(89, 22, 139)';
const fuschia900 = 'rgb(114, 19, 120)';
const pink900 = 'rgb(134, 16, 67)';
const rose900 = 'rgb(139, 8, 54)';
const stone900 = 'rgb(28, 25, 23)';
const neutral900 = 'rgb(23, 23, 23)';
const zinc900 = 'rgb(24, 24, 27)';
const gray900 = 'rgb(16, 24, 40)';
const slate900 = 'rgb(15, 23, 43)';

export const colors = [
    red900,
    orange900,
    amber900,
    yellow900,
    lime900,
    green900,
    emerald900,
    teal900,
    cyan900,
    sky900,
    blue900,
    indigo900,
    violet900,
    purple900,
    fuschia900,
    pink900,
    rose900,
    stone900,
    neutral900,
    zinc900,
    gray900,
    slate900,

].reverse();

export const colorsReduced = (count: number) => {
    const colorsInScope: string[] = [];
    const interval = Math.floor(colors.length / count);

    for (let i = 0; i < count; i++) {
        colorsInScope.push(colors[i * interval]);
    }

    return colorsInScope;

};