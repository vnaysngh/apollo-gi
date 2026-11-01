# Ego Gym — six-punch edition

Run `npm run dev` with Node.js 18+ and open http://127.0.0.1:4173. This remains a local game; sending it to another phone requires publishing `dist/` to an HTTPS static host.

Full-screen pixel arcade with no scrolling, Thai/English selection, portrait and landscape support, touch controls, optional sound, BJJ, archery, carnival shooting and boxing. The apology remains available without a score requirement. No analytics, replies, accounts or forgiveness tracking.

## Boxing

Six punches, with eight new preparation/impact sprites for hooks and uppercuts:
- A / left arrow: jab
- D / right arrow: cross
- Q: left hook
- E: right hook
- Z: left uppercut
- C: right uppercut

Phone controls use two columns and three rows. Score and bag impulses occur at each punch's contact frame. Hooks have compact bent-arm poses and stronger lateral impulses. Uppercuts rise from the waist and add a small vertical lift to the bag. Alternating hands quickly builds combos and angular momentum. The damped pendulum continues moving after punches stop. The portrait camera makes room for strong swings. Wait for the bag to return if it moves out of range. There is no defensive control or blocking penalty.

## Other controls

BJJ: A/S/D or left/down/right for grip, sweep, submit. Correct moves always progress; gold timing gives bonuses.

Ranges: tap the board/cardboard to aim and fire, or arrows + Space. On-screen direction and fire controls support phones. Gold respect ducks are not targets.

Escape pauses/resumes. Reading the apology pauses play. Tab changes pause automatically. All eight character sheets must load before starting; Thai font is bundled locally.

## Validation and build

`npm run check` checks syntax. `node game-check.mjs` verifies all six punches, contact timing, momentum, uppercut lift, other modes, translations, rewards and layout bounds at six viewport sizes. `npm run build` prepares the static site in `dist/`.

Art uses face references, sport-specific clothing and straight side-parted hair. Source photos are not served. Character sprites and generated target portrait are in `assets/`.
