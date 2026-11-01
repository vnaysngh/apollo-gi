import {readFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const elements=new Map(),context=new Proxy({measureText:t=>({width:t.length*7})},{get:(o,k)=>o[k]||(()=>{})});
function el(){return {style:{},textContent:'',width:0,height:0,dataset:{},setAttribute(){},addEventListener(){},replaceChildren(){},append(){},focus(){},getContext:()=>context}}
const document={documentElement:{lang:'en'},querySelector:s=>{if(!elements.has(s))elements.set(s,el());return elements.get(s)},createElement:()=>el(),addEventListener(){}};
const sandbox={document,Image:class{addEventListener(){}},matchMedia:()=>({matches:false}),innerWidth:1440,innerHeight:900,performance:{now:()=>0},requestAnimationFrame(){},addEventListener(){},window:{},console};
vm.createContext(sandbox);vm.runInContext(readFileSync(new URL('i18n.js',import.meta.url),'utf8'),sandbox);vm.runInContext(readFileSync(new URL('app.js',import.meta.url),'utf8'),sandbox);const run=s=>vm.runInContext(s,sandbox);
run('for(const k of assetKeys)sheets[k]=[];function advance(dt){while(dt>0){const step=Math.min(dt,1/60);update(step);dt-=step}}');
// All six punches have distinct controls and score at impact, rather than on button-down.
for(const id of run('Object.keys(attacks)')){run(`choose('boxing');start();action('${id}')`);assert.equal(run('roundScore'),0);assert.equal(run('pendingPunch.type'),id);run('advance(.17)');assert.equal(run('pendingPunch'),null);assert.ok(run('roundScore')>0);assert.equal(run('hits'),1)}
run("choose('boxing');start();action('guard')");assert.equal(run('pendingPunch'),null);assert.equal(run('attempts'),0);assert.ok(!run("buttons.some(b=>/guard/i.test(b.id+b.label))"));
run("action('left');advance(.1)");const singleVelocity=run('bagVelocity');run("advance(.2);action('right');advance(.11)");assert.equal(run('combo'),2);assert.ok(run('bagVelocity')<singleVelocity);run('for(let i=0;i<90;i++)updateBagPhysics(1/60)');assert.ok(Math.abs(run('bagAngle'))>.01);const energy=run('bagVelocity*bagVelocity+20*(1-Math.cos(bagAngle))');run('for(let i=0;i<1800;i++)updateBagPhysics(1/60)');assert.ok(run('bagVelocity*bagVelocity+20*(1-Math.cos(bagAngle))')<energy*.05);
run("choose('boxing');start();action('left-upper');advance(.15)");assert.ok(run('bagLiftVelocity')<0,'uppercut lifts the bag');
run("choose('archery');start();const r=stageRect();target={x:W*.72,y:r.y+r.h*.44,rad:50};action('fire')");assert.equal(run('roundScore'),100);
run("choose('shooting');start();const rr=stageRect();targets=[{x:W*.72,y:rr.y+rr.h*.44,size:50,safe:false}];action('fire')");assert.equal(run('roundScore'),40);run("elapsed=1;targets=[{x:W*.72,y:rr.y+rr.h*.44,size:50,safe:true}];action('fire')");assert.equal(run('roundScore'),20);
run("choose('bjj');start();action('submit')");assert.equal(run('step'),0);run("elapsed=.3;action('grip')");assert.equal(run('step'),1);run("elapsed=.6;action('sweep')");assert.equal(run('step'),2);run("elapsed=.9;action('submit')");assert.equal(run('taps'),1);const reward=run('roundScore');run('finish();finish()');assert.equal(run('total'),reward);
run("choose('boxing');start();openLetter()");assert.equal(run('play'),'paused');run('closeLetter()');assert.equal(run('play'),'playing');
for(const [w,h]of[[1440,900],[1920,1080],[390,844],[375,667],[844,390],[390,560]]){sandbox.innerWidth=w;sandbox.innerHeight=h;run('resize();home()');for(const mode of ['boxing','bjj','archery']){run(`choose('${mode}');start()`);const bounds=run('buttons.map(b=>[b.id,b.x,b.y,b.w,b.h,W,H])');for(const[id,x,y,bw,bh,cw,ch]of bounds)assert.ok(x>=0&&y>=0&&x+bw<=cw+1&&y+bh<=ch+1,`${w}x${h}: ${id} in viewport`);if(mode==='boxing')assert.equal(run('buttons.filter(b=>attacks[b.id]).length'),6)}}
run("selectLanguage('th');render();scene='locker';render();openLetter();render();letterPage=1;render();closeLetter()");
for(const sport of ['boxing','archery','shooting','bjj'])run(`choose('${sport}');render();start();render();play='paused';layout();render();play='playing';finish();render()`);
run("for(const m of Object.values(modes))for(const k of ['name','sub','intro','keys','homework'])tr(m[k]);for(const p of Object.values(attacks))tr(p.label)");assert.deepEqual(Array.from(run('[...missingTranslations]')),[]);
for(const id of ['left-hook','right-hook','left-upper','right-upper'])assert.ok(existsSync(new URL('assets/'+id+'.png',import.meta.url)));
console.log('PASS: six punches and delayed impacts; no Guard control/action; momentum and uppercut lift; BJJ, archery, shooting; pause/rewards; Thai coverage; six viewport sizes.');
