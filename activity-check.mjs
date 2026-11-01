import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const code=readFileSync(new URL('activity.js',import.meta.url),'utf8');
function setup(overrides={}){
 const requests=[];
 const ctx={EGO_ANALYTICS:{projectToken:'phc_example_for_unit_tests',host:'https://us.i.posthog.com'},navigator:{},location:{hostname:'example.com',search:''},crypto:{randomUUID:()=> 'anonymous-test-uuid'},URLSearchParams,Date,fetch:(url,opts)=>{requests.push({url,...opts,body:JSON.parse(opts.body)});return Promise.resolve({ok:true})},...overrides};
 vm.createContext(ctx);vm.runInContext(code,ctx);return {stats:ctx.EgoStats,requests};
}
const {stats,requests}=setup();
stats.event('sport_started',{sport:'boxing'});assert.equal(requests.length,0);
stats.allow('th');stats.allow('th');assert.equal(requests.length,1);
for(const sport of ['boxing','archery','shooting','bjj']){stats.event('sport_started',{sport,language:'th'});stats.event('sport_started',{sport})}
stats.event('sport_started',{sport:'invalid'});stats.event('secret_event');
stats.event('apology_opened',{language:'th'});stats.event('apology_opened');assert.equal(requests.length,6);
for(const r of requests){assert.equal(r.credentials,'omit');assert.equal(r.referrerPolicy,'no-referrer');assert.equal(r.body.properties.$process_person_profile,false);assert.equal(r.body.properties.$geoip_disable,true);assert.equal(r.body.distinct_id,'anonymous-test-uuid');assert.equal(r.body.properties.$current_url,undefined)}
stats.decline();stats.event('apology_opened');assert.equal(requests.length,6);
for(const overrides of [{navigator:{globalPrivacyControl:true}},{navigator:{doNotTrack:'1'}},{location:{hostname:'localhost',search:''}},{location:{hostname:'example.com',search:'?preview=1'}},{EGO_ANALYTICS:{}},{EGO_ANALYTICS:{projectToken:'phc_example_for_unit_tests',host:'https://evil.example'}}]){const t=setup(overrides);t.stats.allow('en');assert.equal(t.stats.available,false);assert.equal(t.requests.length,0)}
const broken=setup({fetch:()=>Promise.reject(new Error('offline'))});broken.stats.allow('en');await new Promise(r=>setTimeout(r,0));
console.log('PASS: no events before opt-in; exact event allowlist; per-visit dedup; opt-out; privacy signals; preview exclusion; offline tolerance.');
