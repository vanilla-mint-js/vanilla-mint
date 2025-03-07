import { execSync } from "child_process";
import { parse, resolve } from 'path';

const input = resolve(process.cwd(), process.argv[2]);
const {name, dir} = parse(input);
const asOutput = (postfix: string, ext='.png') => `${dir}/${name}${postfix}${ext}`;

console.log(asOutput('-16'))

execSync(`convert -density 300 -background transparent ${input} -resize 16x16 ${asOutput('-16', '.png')}`, { stdio: 'inherit' });
execSync(`convert -density 300 -background transparent ${input} -resize 32x32 ${asOutput('-32', '.png')}`, { stdio: 'inherit' });
execSync(`convert -density 300 -background transparent ${input} -resize 64x64 ${asOutput('-64', '.png')}`, { stdio: 'inherit' });

execSync(`convert ${asOutput('-16', '.png')} ${asOutput('-32', '.png')} ${asOutput('-64', '.png')} ${asOutput('', '.ico')}`, { stdio: 'inherit' });

