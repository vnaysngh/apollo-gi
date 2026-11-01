'use strict';
let language='en';
const TH={
"BASIC STATS":"สถิติพื้นฐาน","BASIC STATS: ON":"สถิติพื้นฐาน: เปิด","BASIC STATS: OFF":"สถิติพื้นฐาน: ปิด","STATS: BROWSER PRIVACY":"สถิติ: ปิดตามการตั้งค่าเบราว์เซอร์","STATS: PREVIEW OFF":"สถิติ: ปิดในโหมดทดลอง","STATS: UNAVAILABLE":"สถิติ: ใช้งานไม่ได้","TURN STATS OFF":"ปิดการส่งสถิติ","TURN STATS ON":"เปิดการส่งสถิติ","Your browser requests no tracking. No activity is sent.":"เบราว์เซอร์ของคุณตั้งค่าไม่ให้ติดตาม จึงไม่มีการส่งสถิติการเล่น","Stats are off for this preview.":"ไม่มีการส่งสถิติในโหมดทดลองนี้","Stats could not reach PostHog. A browser blocker or connection may be stopping them.":"ส่งสถิติไปยัง PostHog ไม่ได้ อาจถูกเบราว์เซอร์บล็อกหรือมีปัญหาการเชื่อมต่อ","Stats are not configured on this copy of the game.":"เกมเวอร์ชันนี้ยังไม่ได้ตั้งค่าการส่งสถิติ","Basic anonymous stats are on by default: visits, sports started, and apology openings are shared with the creator through PostHog. No names or recordings. You can turn stats off here.":"เกมจะส่งสถิติพื้นฐานแบบไม่ระบุตัวตนให้ผู้สร้างผ่าน PostHog โดยอัตโนมัติ ได้แก่ การเข้าชม กีฬาที่เริ่มเล่น และการเปิดคำขอโทษ ไม่มีชื่อหรือการบันทึกหน้าจอ คุณปิดการส่งสถิติได้ที่นี่",
'OPTIONAL STATS':'สถิติการเล่น (ไม่บังคับ)','YOUR CHOICE':'คุณเลือกได้','ALLOW BASIC STATS':'อนุญาตสถิติพื้นฐาน','PLAY WITHOUT STATS':'เล่นโดยไม่ส่งสถิติ','STATS ON / TURN OFF':'ส่งสถิติอยู่ / ปิด','STATS OFF / OPTIONS':'ปิดสถิติอยู่ / ตัวเลือก','Share anonymous activity with the creator through PostHog: visits, sports started, and apology openings. No names or recordings. Playing without stats works the same.':'แชร์สถิติการเล่นแบบไม่ระบุตัวตนกับผู้สร้างผ่าน PostHog ได้แก่ การเข้าชม กีฬาที่เริ่มเล่น และการเปิดคำขอโทษ ไม่มีชื่อหรือการบันทึกหน้าจอ เลือกไม่ส่งสถิติก็เล่นได้เหมือนกัน',

'Character artwork could not load. Please refresh.':'โหลดภาพตัวละครไม่สำเร็จ กรุณารีเฟรชหน้าเว็บ',
'BOXING':'มวยสากล','ARCHERY':'ยิงธนู','SHOOTING':'ยิงเป้า','BJJ':'ยิวยิตสู',
'HANDS UP. EGO DOWN.':'ยกการ์ดขึ้น ลดอีโก้ลง','YOU MAKE AN EXCELLENT POINT.':'เข้าเป้า ทั้งลูกธนูและคำพูด','THE CARNIVAL OF BAD TAKES.':'ซุ้มยิงความคิดที่ควรเก็บไว้','TECHNIQUE OVER EGO.':'ฝีมือเหนืออีโก้',
'Throw jabs, crosses, left and right hooks, and left and right uppercuts. Alternate hands for combos. Quick combinations build bag momentum; gold timing earns bonus points. Let the bag return if it swings out of reach.':'ชกแย็บ หมัดตรง ฮุกซ้าย ฮุกขวา เสยซ้าย และเสยขวา สลับมือเพื่อทำคอมโบ ชกต่อเนื่องให้กระสอบเหวี่ยงแรงขึ้น กดตรงช่องสีทองเพื่อรับแต้มเพิ่ม ถ้ากระสอบเหวี่ยงไกลเกินไป ให้รอเหวี่ยงกลับมา',
'Move the crosshair with your pointer or arrow keys. Tap the target or press RELEASE. The target moves, and your aim gently sways.':'เล็งด้วยการแตะหน้าจอหรือปุ่มลูกศร แตะเป้าหรือกดปล่อยลูกธนู เป้าจะเคลื่อนที่ จับจังหวะให้ดี',
'Pop the cardboard versions of me before they duck away. Leave the gold RESPECT ducks alone. It is a toy cork gallery.':'ยิงป้ายกระดาษรูปผมก่อนที่ป้ายจะหายไป อย่ายิงเป็ดสีทองที่เขียนว่าให้เกียรติกัน นี่คือปืนจุกก๊อกของเล่นในซุ้มงานวัด',
'Tap GRIP, SWEEP, then SUBMIT. Each correct move advances. Gold timing earns bonus points.':'กดจับ ตามด้วยปัดล้ม แล้วปิดเกม กดท่าที่ถูกต้องเพื่อไปขั้นต่อไป ถ้ากดตรงช่องสีทองจะได้แต้มเพิ่ม',
'A: JAB  D: CROSS  Q/E: HOOKS  Z/C: UPPERCUTS':'A: แย็บ  D: หมัดตรง  Q/E: ฮุก  Z/C: หมัดเสย',
'POINTER / ARROWS: AIM   SPACE: RELEASE':'แตะ / ลูกศร: เล็ง   เว้นวรรค: ปล่อยลูกธนู',
'TAP CARDBOARD   ARROWS: AIM   SPACE: POP':'แตะป้ายเพื่อยิง   ลูกศร: เล็ง   เว้นวรรค: ยิง',
'A / LEFT: GRIP   S / DOWN: SWEEP   D / RIGHT: SUBMIT':'A / ซ้าย: จับ   S / ลง: ปัดล้ม   D / ขวา: ปิดเกม',
'LISTEN WITHOUT INTERRUPTING.':'ฟังให้จบ โดยไม่พูดแทรก','ASK INSTEAD OF ASSUMING.':'ถามให้เข้าใจ แทนที่จะคิดไปเอง','RETIRE "JUST JOKING" AS A DEFENSE.':'เลิกใช้คำว่าแค่ล้อเล่นเป็นข้อแก้ตัว','RESPECT BOUNDARIES. EVERY TIME.':'เคารพขอบเขตของอีกฝ่ายทุกครั้ง',
'EGO GYM / HUMBLE ME EDITION':'EGO GYM / ฉบับลดอีโก้','NO REPLY REQUIRED.':'ไม่จำเป็นต้องตอบกลับ',
'SFX ON':'เปิดเสียง','SFX OFF':'ปิดเสียง','LOW FX':'ลดเอฟเฟกต์','FULL FX':'เอฟเฟกต์เต็ม',
'THE APOLOGY':'คำขอโทษ','THE PART WITHOUT THE JOKES':'ช่วงที่ผมขอพูดจริงจัง','LOCKER':'ห้องแต่งตัว','HUMILITY LOCKER':'ห้องแต่งตัวลดอีโก้','GYM':'เมนู','II':'พัก',
'END ROUND':'จบรอบ','APOLOGY':'คำขอโทษ',"LET'S PLAY":'เริ่มเล่น','SKIP MY NONSENSE':'ข้ามมาฟังคำขอโทษ','KEEP PLAYING':'เล่นต่อ','ANOTHER ROUND':'เล่นอีกรอบ','CHOOSE ANOTHER SPORT':'เลือกกีฬาอื่น','A MOMENT WITHOUT THE JOKES':'ขอพูดจริงจังสักนิด','BACK':'กลับ','NEXT PAGE':'หน้าถัดไป','LEAVE IT HERE':'พอแค่นี้ก่อน','BACK TO GYM':'กลับเมนู','OWNED':'มีแล้ว',
'LEFT HOOK [Q]':'ฮุกซ้าย [Q]','RIGHT HOOK [E]':'ฮุกขวา [E]','LEFT UPPER [Z]':'เสยซ้าย [Z]','RIGHT UPPER [C]':'เสยขวา [C]','JAB [A]':'แย็บ [A]','CROSS [D]':'หมัดตรง [D]','GRIP [A]':'จับ [A]','SWEEP [S]':'ปัดล้ม [S]','SUBMIT [D]':'ปิดเกม [D]','RELEASE':'ปล่อยธนู','POP!':'ยิง!',
'MOMENTUM':'แรงเหวี่ยง','BAG OUT OF REACH. LET IT RETURN.':'ไกลเกินไป รอให้กระสอบเหวี่ยงกลับ','READY WHEN YOU ARE.':'พร้อมเมื่อคุณพร้อม','YOUR MOVE, CHAMP.':'ถึงตาคุณแล้ว แชมป์','I HAVE BEEN ADVISED TO WORK ON MYSELF.':'มีคนแนะนำให้ผมปรับปรุงตัว','HIM: I HAVE BEEN ADVISED TO WORK ON MYSELF.':'ผม: มีคนแนะนำให้ผมปรับปรุงตัว',
'AN EXCELLENTLY UNNECESSARY CHOICE.':'ชุดนี้ไม่จำเป็น แต่จำเป็นต้องใส่',
'HIM: I WOULD LIKE TO RETRACT THAT SENTENCE.':'ผม: ขอถอนคำพูดเมื่อกี้ครับ','HER: GREAT. NOW TRY LISTENING.':'คุณ: ดี ทีนี้ลองฟังบ้าง',
'A PRACTICE ARROW.':'ลูกซ้อม ไม่นับ!','BULLSEYE. EXCELLENT POINT.':'เข้าเป้ากลาง! เถียงไม่ออกเลย','POINT TAKEN. LITERALLY.':'เข้าเป้าแล้ว ผมรับทราบครับ','EVEN THE TREES ARE LISTENING.':'แม้แต่ต้นไม้ก็ยังตั้งใจฟัง','HIM: YOUR POINT WAS VERY HARD TO MISS.':'ผม: ประเด็นนี้ชัดจนผมหลบไม่ทัน','HER: THAT ONE WAS FOR THE SCENERY.':'คุณ: ลูกนั้นแค่ทักทายต้นไม้',
'KEEP THE RESPECT.':'เก็บความให้เกียรติไว้','GOLD DUCKS ARE FRIENDS. -20':'เป็ดทองเป็นเพื่อนนะ -20','POP! +40':'ป๊อบ! +40','BOSS MODE: DISCONTINUED.':'ปิดโหมดเจ้ากี้เจ้าการแล้ว','HIM: THE CARDBOARD HAS MORE SELF-AWARENESS.':'ผม: ป้ายกระดาษยังรู้ตัวมากกว่าผม','HER: AT LEAST IT KNOWS WHEN TO DISAPPEAR.':'คุณ: อย่างน้อยป้ายก็รู้ว่าเมื่อไรควรหลบ','A VERY POLITE MISS.':'พลาดอย่างสุภาพ','THE CARDBOARD WINS THIS ONE.':'รอบนี้ป้ายกระดาษชนะ',
'FINISH THE MOVE, THEN TRY AGAIN.':'รอให้จบท่าก่อน แล้วค่อยกดต่อ','HE TAPPED. THE EGO DID TOO.':'ผมยอมแล้ว อีโก้ก็ยอมด้วย','HIM: I HAVE NO COUNTERARGUMENT.':'ผม: ไม่มีข้อโต้แย้งครับ','HER: CHANGING THE SUBJECT IS NOT AN ESCAPE.':'คุณ: เปลี่ยนเรื่องไม่นับว่าแก้ท่าได้','CATCH THE GOLD ZONE.':'จับจังหวะในช่องสีทอง','SAME MOVE. BETTER TIMING.':'ท่าเดิม ลองจับจังหวะใหม่',
'GRIP':'จับ','SWEEP':'ปัดล้ม','SUBMIT':'ปิดเกม',
'NO BOSS MODE BEYOND THIS POINT':'เขตปลอดคนชอบสั่ง','THE RANGE OF UNNECESSARY OPINIONS':'สนามฝึกเก็บความเห็นที่ไม่ได้มีใครถาม','POP THE EGO. KEEP THE RESPECT.':'ยิงอีโก้ เก็บความให้เกียรติไว้','TECHNIQUE > EGO':'ฝีมือเหนืออีโก้','EGO':'อีโก้','RESPECT':'ให้เกียรติกัน','TAP TAP. NO NOTES.':'ยอมแล้ว ไม่เถียงแล้ว','1. GRIP':'1. จับ','2. SWEEP':'2. ปัดล้ม','3. SUBMIT':'3. ปิดเกม',
'GOLD ZONE = COMBO BONUS':'ช่องสีทอง = โบนัสคอมโบ','TIMING EARNS BONUS POINTS':'จับจังหวะเพื่อรับแต้มเพิ่ม','AIM / TAP / RELEASE':'เล็ง / แตะ / ปล่อย','HUMILITY':'แต้มลดอีโก้','TIME':'เวลา',
'YOU VS. MY UNNECESSARY EGO':'คุณ ปะทะ อีโก้ที่เกินจำเป็นของผม','30 SECONDS. NO SCORE TO BEAT.':'30 วินาที เล่นให้สนุกก็พอ','WATER BREAK.':'พักดื่มน้ำก่อน','EVEN EGOS NEED A MINUTE.':'อีโก้ก็ต้องพักเหมือนกัน','A HUMBLING EXPERIENCE.':'อีโก้ลดลงอย่างเห็นได้ชัด','HIS HOMEWORK:':'การบ้านของผม:',
'EGO GYM':'EGO GYM','FOUR SPORTS. ONE VERY UNNECESSARY EGO.':'สี่กีฬา กับหนึ่งอีโก้ที่เกินจำเป็น','HUMBLE ME EDITION':'ฉบับลดอีโก้','CHOOSE YOUR DISCIPLINE':'เลือกกีฬา','YOU BRING THE SKILLS. I BRING THE EGO.':'คุณมีฝีมือ ส่วนผมมีอีโก้','YOU GET THE MEDALS.':'คุณได้เหรียญรางวัล','I GET THE CHARACTER DEVELOPMENT.':'ส่วนผมได้ปรับปรุงตัว',
'OKAY. GLOVES OFF.':'ขอถอดนวม แล้วพูดจากใจ',
"I'm sorry for being bossy and for the way I spoke to you. My jokes were disrespectful, and I understand why that hurt.":'ผมขอโทษที่ทำตัวเจ้ากี้เจ้าการและพูดกับคุณแบบนั้น มุกของผมไม่ให้เกียรติคุณ และผมเข้าใจว่าทำไมคุณถึงรู้สึกเจ็บ',
'Calling it "messing around" doesn\'t make it okay. You deserved to feel respected and heard. I\'m responsible for my words and my tone.':'การบอกว่าแค่ล้อเล่น ไม่ได้ทำให้สิ่งที่ผมทำกลายเป็นเรื่องที่โอเค คุณควรได้รับความเคารพและมีคนตั้งใจฟัง ผมต้องรับผิดชอบต่อคำพูดและน้ำเสียงของตัวเอง',
'LESS EGO. MORE CARE.':'ลดอีโก้ ใส่ใจให้มากขึ้น',
"I want to listen without interrupting, stop making jokes at your expense, and speak to you with care, even when we disagree. A game can't prove that I'll change. My actions have to do that.":'ผมอยากฟังคุณให้จบโดยไม่พูดแทรก เลิกเอาคุณมาเป็นเรื่องล้อเล่น และพูดกับคุณอย่างใส่ใจ แม้เราจะเห็นต่างกัน เกมนี้พิสูจน์ไม่ได้ว่าผมจะเปลี่ยน ผมต้องพิสูจน์ด้วยการกระทำ',
"You don't owe me a reply, forgiveness, or another chance. Take whatever space you need. I'll respect it.":'คุณไม่จำเป็นต้องตอบกลับ ให้อภัย หรือให้โอกาสผมอีก ถ้าคุณอยากมีเวลาและพื้นที่ของตัวเองมากแค่ไหน ผมจะเคารพการตัดสินใจของคุณ',
'A REAL APOLOGY':'คำขอโทษจากใจ','NO SCORE REQUIRED TO READ THIS.':'ไม่ต้องมีแต้ม ก็อ่านคำขอโทษนี้ได้','FROM ME, WITH MORE CARE.':'จากผม ด้วยความใส่ใจที่มากขึ้น','THE HUMILITY LOCKER':'ห้องแต่งตัวลดอีโก้','POINTS BUY NONSENSE. NEVER FORGIVENESS.':'แต้มแลกของขำ ๆ ได้ แต่แลกการให้อภัยไม่ได้',
'BOSS MODE':'ชอบสั่ง','BAD TAKES':'คิดไปเอง','EGO INC.':'อีโก้ล้วน ๆ','EXCUSES':'ข้อแก้ตัว','NORMAL':'ธรรมดา','SHADES':'แว่นเท่','CROWN':'มงกุฎ','CLOWN':'ตัวตลก',
'CONTINUE':'ไปต่อ','CHOOSE YOUR LANGUAGE':'เลือกภาษา / CHOOSE YOUR LANGUAGE','TH / EN':'ไทย / EN','EN / TH':'EN / ไทย','ENGLISH':'ENGLISH','ภาษาไทย':'ภาษาไทย','LANGUAGE':'ภาษา','GETTING THE GYM READY...':'กำลังเตรียมสนาม...','CHECK YOUR CONNECTION AND REFRESH.':'ตรวจสอบอินเทอร์เน็ตแล้วรีเฟรชอีกครั้ง','PORTRAIT OR LANDSCAPE. YOUR CALL.':'เล่นแนวตั้งหรือแนวนอนก็ได้','TAP TO CHOOSE. CHANGE ANYTIME.':'แตะเพื่อเลือก เปลี่ยนภาษาได้ทุกเมื่อ',
};
const thaiWordSegmenter=typeof Intl.Segmenter==='function'?new Intl.Segmenter('th',{granularity:'word'}):null;
const missingTranslations=new Set();
function tr(value){const s=String(value);if(language!=='th'||/[ก-๙]/.test(s))return s;if(Object.hasOwn(TH,s))return TH[s];let m;
 if((m=s.match(/^PLAY (BOXING|ARCHERY|SHOOTING|BJJ) >$/)))return 'เล่น'+tr(m[1])+' >';
 if((m=s.match(/^(\d+) HUMILITY POINTS$/)))return m[1]+' แต้มลดอีโก้';
 if((m=s.match(/^\+(\d+) HUMILITY POINTS$/)))return '+'+m[1]+' แต้มลดอีโก้';
 if((m=s.match(/^ROUND COMPLETE\. (\d+) HUMILITY POINTS\.$/)))return 'จบรอบ ได้ '+m[1]+' แต้มลดอีโก้';
 if((m=s.match(/^(\d+)X COMBO \/ EGO REDUCED$/)))return 'คอมโบ '+m[1]+' ครั้ง / อีโก้ลดลง';
 if((m=s.match(/^POW! \+(\d+)$/)))return 'ป้าบ! +'+m[1];
 if((m=s.match(/^POINT TAKEN! \+(\d+)$/)))return 'เข้าเป้า! +'+m[1];
 if((m=s.match(/^CLEAN TECHNIQUE! \+(\d+)$/)))return 'ท่าสวย! +'+m[1];
 if((m=s.match(/^GOOD MOVE! \+(\d+)$/)))return 'ทำได้ดี! +'+m[1];
 if((m=s.match(/^TAP TAP! \+(\d+)$/)))return 'ยอมแล้ว! +'+m[1];
 if((m=s.match(/^FIRST (GRIP|SWEEP|SUBMIT)\. THEN THE DRAMA\.$/)))return 'ต้อง'+tr(m[1])+'ก่อน ค่อยว่ากัน';
 if((m=s.match(/^NEXT: (GRIP|SWEEP|SUBMIT)$/)))return 'ท่าต่อไป: '+tr(m[1]);
 if((m=s.match(/^(\d+) GOOD MOVES \/ (\d+) ATTEMPTS$/)))return 'สำเร็จ '+m[1]+' ท่า / ลอง '+m[2]+' ครั้ง';
 if((m=s.match(/^(\d+) MORE POINTS FOR THIS UNNECESSARY OUTFIT\.$/)))return 'อีก '+m[1]+' แต้ม ก็ได้ชุดขำ ๆ นี้แล้ว';
 if((m=s.match(/^(\* )?(NORMAL|SHADES|CROWN|CLOWN) \/ (OWNED|\d+ HP)$/)))return (m[1]||'')+tr(m[2])+' / '+(m[3]==='OWNED'?'มีแล้ว':m[3].replace(' HP',' แต้ม'));
 if(/[A-Za-z]{2,}/.test(s)){missingTranslations.add(s);return '…'}return s;
}
