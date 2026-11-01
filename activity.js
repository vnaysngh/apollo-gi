'use strict';
// Small, explicit event collector: no SDK, cookies, fingerprinting, or recordings.
(()=>{
 const config=globalThis.EGO_ANALYTICS||{};
 const hosts=new Set(['https://us.i.posthog.com','https://eu.i.posthog.com']);
 const token=typeof config.projectToken==='string'?config.projectToken:'';
 const privateBrowser=navigator.globalPrivacyControl===true||navigator.doNotTrack==='1';
 const local=['localhost','127.0.0.1','::1'].includes(location.hostname);
 const preview=new URLSearchParams(location.search).get('preview')==='1';
 const available=hosts.has(config.host)&&/^phc_[A-Za-z0-9_-]{10,}$/.test(token)&&!privateBrowser&&!local&&!preview&&typeof crypto.randomUUID==='function';
 let consent=null,visitId='';const sent=new Set();
 function event(name,data={}){
  if(!available||consent!==true||!['visit_started','sport_started','apology_opened'].includes(name))return;
  const properties={$process_person_profile:false,$geoip_disable:true,$ip:'0.0.0.0',app:'ego-gym'};
  if(['en','th'].includes(data.language))properties.language=data.language;
  if(name==='sport_started'){
   if(!['boxing','archery','shooting','bjj'].includes(data.sport))return;
   properties.sport=data.sport;
  }
  const key=name+':'+(properties.sport||'');if(sent.has(key))return;sent.add(key);
  const payload={api_key:token,event:name,distinct_id:visitId,properties,timestamp:new Date().toISOString()};
  try{void fetch(config.host+'/i/v0/e/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),credentials:'omit',referrerPolicy:'no-referrer',keepalive:true}).catch(()=>{});}catch{}
 }
 globalThis.EgoStats=Object.freeze({
  get available(){return available},get decided(){return consent!==null},get allowed(){return available&&consent===true},
  allow(language){if(!available)return;consent=true;visitId||=crypto.randomUUID();event('visit_started',{language})},
  decline(){consent=false},event
 });
})();
