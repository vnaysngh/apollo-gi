import {mkdir,copyFile,rm,writeFile} from 'node:fs/promises';
const root=new URL('./',import.meta.url);
await rm(new URL('dist/',root),{recursive:true,force:true});
await mkdir(new URL('dist/assets/',root),{recursive:true});
for(const f of ['index.html','style.css','app.js','i18n.js','activity.js','favicon.svg'])await copyFile(new URL(f,root),new URL('dist/'+f,root));
for(const f of ['boxing.png','archery.png','shooting.png','bjj.png','left-hook.png','right-hook.png','left-upper.png','right-upper.png','face-reference.png','noto-sans-thai.ttf'])await copyFile(new URL('assets/'+f,root),new URL('dist/assets/'+f,root));
console.log('Ego Gym built in dist/');

const projectToken=process.env.POSTHOG_PROJECT_TOKEN||'';
const host=process.env.POSTHOG_HOST||'';
if(projectToken&&!/^phc_[A-Za-z0-9_-]{10,}$/.test(projectToken))throw new Error('Invalid public PostHog project token');
if(host&&!['https://us.i.posthog.com','https://eu.i.posthog.com'].includes(host))throw new Error('Invalid PostHog ingestion host');
await writeFile(new URL('dist/analytics-config.js',root),'globalThis.EGO_ANALYTICS = Object.freeze('+JSON.stringify({projectToken,host})+');\n');
