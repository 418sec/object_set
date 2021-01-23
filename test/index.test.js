import assert from 'assert';

import set from '../src/index';

describe('object_set', () => {
  it('simple', () => {
    let srcObj = {a: 'a', b: 'b'};
    let estObj = {a: 'a', b: 'B', c: 'c'};
    set(srcObj, ['c'], 'c');
    set(srcObj, ['b'], 'B');
    assert.equal(JSON.stringify(srcObj), JSON.stringify(estObj));
  });
  it('nested', () => {
    let srcObj = {a: 'a', b: {a: 'a', b: {a: 'a'}}};
    let estObj = {a: 'a', b: {a: 'a', b: {a: 'a', c: 'C'}}};
    set(srcObj, ['b', 'b', 'c'], 'C');
    assert.equal(JSON.stringify(srcObj), JSON.stringify(estObj));
  });
  it('create', () => {
    let srcObj = {};
    let estObj = {b: {b: {a: 'a'}}};
    set(srcObj, ['b', 'b', 'a'], 'a');
    assert.equal(JSON.stringify(srcObj), JSON.stringify(estObj));
  });
  it('create returnvalue check', () => {
    let estObj = {b: {b: {a: 'a'}}};
    let srcObj = set({}, ['b', 'b', 'a'], 'a');
    assert.equal(JSON.stringify(srcObj), JSON.stringify(estObj));
  });
  it('prototype pollution check', () => {
    let srcObj = {};
    set(srcObj, ['__proto__', 'polluted'], true);
    assert.equal({}.polluted, undefined);
  });
});
