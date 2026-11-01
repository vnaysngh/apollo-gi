import http from 'node:http';
import {readFile} from 'node:fs/promises';
const files={'/':['index.html','text/html'],'/index.html':['index.html','text/html'],'/style.css':['style.css','text/css'],'/app.js':['app.js','text/javascript'],'/activity.js':['activity.js','text/javascript'],'/analytics-config.js':['analytics-config.js','text/javascript'],'/i18n.js':['i18n.js','text/javascript'],'/assets/noto-sans-thai.ttf':['assets/noto-sans-thai.ttf','font/ttf'],'/favicon.svg':['favicon.svg','image/svg+xml']};
for(const key of ['boxing','archery','shooting','bjj','face-reference','left-hook','right-hook','left-upper','right-upper'])files['/assets/'+key+'.png']=['assets/'+key+'.png','image/png'];
const server=http.createServer(async(req,res)=>{const file=files[new URL(req.url,'http://localhost').pathname];if(!file){res.writeHead(404);res.end('Not found');return}try{const data=await readFile(new URL(file[0],import.meta.url));res.writeHead(200,{'Content-Type':file[1],'Cache-Control':'no-cache'});res.end(data)}catch{res.writeHead(500);res.end('Unable to load page')}});
server.listen(Number(process.env.PORT||4173),'127.0.0.1',()=>console.log('Local: http://127.0.0.1:'+server.address().port));
