import {mkdir,copyFile,rm} from 'node:fs/promises';
const root=new URL('./',import.meta.url);
await rm(new URL('dist/',root),{recursive:true,force:true});
await mkdir(new URL('dist/assets/',root),{recursive:true});
for(const f of ['index.html','style.css','app.js','i18n.js','favicon.svg'])await copyFile(new URL(f,root),new URL('dist/'+f,root));
for(const f of ['boxing.png','archery.png','shooting.png','bjj.png','left-hook.png','right-hook.png','left-upper.png','right-upper.png','face-reference.png','noto-sans-thai.ttf'])await copyFile(new URL('assets/'+f,root),new URL('dist/assets/'+f,root));
console.log('Ego Gym built in dist/');
