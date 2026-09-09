import assert from 'node:assert/strict';
import { test } from 'node:test';
import { calculateNumerology } from '../lib/calculations/numerology';
import { birthSchema } from '../lib/domain/birth';
import { requireActor } from '../lib/auth/port';
test('birth date arithmetic and independent target periods',()=>{
  const n=calculateNumerology('1990-05-17','2026-09-09');
  assert.equal(n.lifePath.value,5); assert.equal(n.personalYear.value,5); assert.equal(n.personalMonth.value,5);
  assert.throws(()=>calculateNumerology('2025-02-29','2026-09-09'));
  assert.doesNotThrow(()=>calculateNumerology('2000-02-29','2026-09-09'));
});
test('unknown birth hour cannot silently become a known time',()=>{
  const input={date:'1990-05-17',time:null,timeAccuracy:'unknown',placeLabel:'Lyon',latitude:null,longitude:null,timeZone:null};
  assert.equal(birthSchema.safeParse(input).success,true);
  assert.equal(birthSchema.safeParse({...input,time:'12:00'}).success,false);
  assert.equal(birthSchema.safeParse({...input,timeZone:'not/a-zone'}).success,false);
});
test('unconfigured authentication refuses even spoofed identity headers',async()=>{
  await assert.rejects(()=>requireActor(new Request('https://test.local',{headers:{'oai-authenticated-user-id':'someone-else'}})),e=>e instanceof Response&&e.status===401);
});
