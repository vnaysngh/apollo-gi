import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const code=readFileSync(new URL('activity.js',import.meta.url),'utf8');
function setup(overrides={}){
 const requests=[];
 const ctx={EGO_ANALYTICS:{projectToken:'phc_example_for_unit_tests',host:'https://us.i.posthog.com'},navigator:{},location:{hostname:'example.com',search:''},crypto:{randomUUID:()=> 'anonymous-test-uuid'},URLSearchParams,Date,fetch:(url,opts)=>{requests.push({url,...opts,body:JSON.parse(opts.body)});return Promise.resolve({ok:true})},...overrides};
 vm.createContext(ctx);vm.runInContext(code,ctx);return {stats:ctx.EgoStats,requests};
}
const tick=()=>new Promise(r=>setTimeout(r,0));
const {stats,requests}=setup();await tick();assert.equal(requests.length,1,'visit recorded by default');
stats.allow('th');stats.allow('th');await tick();assert.equal(requests.length,1);
for(const sport of ['boxing','archery','shooting','bjj']){stats.event('sport_started',{sport,language:'th'});stats.event('sport_started',{sport})}
stats.event('sport_started',{sport:'invalid'});stats.event('secret_event');
stats.event('apology_opened',{language:'th'});stats.event('apology_opened');await tick();assert.equal(requests.length,6);
for(const r of requests){assert.equal(r.credentials,'omit');assert.equal(r.referrerPolicy,'no-referrer');assert.equal(r.body.properties.$process_person_profile,false);assert.equal(r.body.properties.$geoip_disable,true);assert.equal(r.body.distinct_id,'anonymous-test-uuid');assert.equal(r.body.properties.$current_url,undefined)}
stats.decline();stats.event('apology_opened');await tick();assert.equal(requests.length,6);
for(const overrides of [{location:{hostname:'localhost',search:''}},{location:{hostname:'example.com',search:'?preview=1'}},{EGO_ANALYTICS:{}},{EGO_ANALYTICS:{projectToken:'phc_example_for_unit_tests',host:'https://evil.example'}}]){const t=setup(overrides);t.stats.allow('en');await tick();assert.equal(t.stats.available,false);assert.equal(t.requests.length,0)}
const broken=setup({fetch:()=>Promise.reject(new Error('offline'))});await tick();assert.equal(broken.stats.state,'blocked');
for(const navigator of [{globalPrivacyControl:true},{doNotTrack:'1'}]){const tab=setup({navigator});await tick();assert.equal(tab.stats.state,'on');assert.equal(tab.requests.length,1,'basic anonymous capture does not depend on browser preference flags')}
const optedOut=setup({localStorage:{getItem:()=> '1'}});await tick();assert.equal(optedOut.stats.state,'off');assert.equal(optedOut.requests.length,0);
console.log('PASS: default anonymous visit; saved opt-out; explicit delivery status; exact event allowlist; per-visit dedup; opt-out; browser preference flags; preview exclusion; offline tolerance.');
