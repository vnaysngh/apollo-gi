'use strict';
// Three anonymous events. No SDK, cookies, persistent IDs, or recordings.
(()=>{
 const config=globalThis.EGO_ANALYTICS||{};
 const hosts=new Set(['https://us.i.posthog.com','https://eu.i.posthog.com']);
 const token=typeof config.projectToken==='string'?config.projectToken:'';
 const preview=['localhost','127.0.0.1','::1'].includes(location.hostname)||new URLSearchParams(location.search).get('preview')==='1';
 const configured=hosts.has(config.host)&&/^phc_[A-Za-z0-9_-]{10,}$/.test(token)&&typeof crypto.randomUUID==='function';
 const available=configured&&!preview;
 let enabled=true,visitId='',blocked=false,observer=()=>{};
 try{enabled=localStorage.getItem('ego-stats-disabled')!=='1'}catch{}
 const sent=new Set(),pending=new Set();
 function event(name,data={}){
  if(!available||!enabled||!['visit_started','sport_started','apology_opened'].includes(name))return;
  const properties={$process_person_profile:false,$geoip_disable:true,$ip:'0.0.0.0',app:'ego-gym'};
  if(['en','th'].includes(data.language))properties.language=data.language;
  if(name==='sport_started'){
   if(!['boxing','archery','shooting','bjj'].includes(data.sport))return;
   properties.sport=data.sport;
  }
  const key=name+':'+(properties.sport||'');if(sent.has(key)||pending.has(key))return;
  visitId||=crypto.randomUUID();pending.add(key);
  const payload={api_key:token,event:name,distinct_id:visitId,properties,timestamp:new Date().toISOString()};
  Promise.resolve().then(()=>fetch(config.host+'/i/v0/e/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),credentials:'omit',referrerPolicy:'no-referrer',keepalive:true})).then(response=>{
   if(!response.ok)throw new Error('Capture unavailable');sent.add(key);blocked=false;
  }).catch(()=>{blocked=true}).finally(()=>{pending.delete(key);observer()});
 }
 function preference(value){enabled=value;try{if(value)localStorage.removeItem('ego-stats-disabled');else localStorage.setItem('ego-stats-disabled','1')}catch{}observer()}
 globalThis.EgoStats=Object.freeze({
  get available(){return available},get decided(){return true},get allowed(){return available&&enabled},
  get state(){return preview?'preview':!configured?'unconfigured':!enabled?'off':blocked?'blocked':'on'},
  onChange(callback){observer=callback},
  allow(language){if(!available)return;preference(true);event('visit_started',{language})},
  decline(){preference(false)},event
 });
 event('visit_started');
})();
