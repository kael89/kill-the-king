import { isHashObject, prettifyJson } from './generic';

describe('generic utilities', () => {
  describe('isHashObject', () => {
    it('should return true for a hash object', () => {
      expect(isHashObject({ a: 1 })).toBe(true);
    });

    it('should return false for an array', () => {
      expect(isHashObject([0, 1])).toBe(false);
    });

    it('should return false for a string', () => {
      expect(isHashObject('alpha')).toBe(false);
    });

    it('should return false for a number', () => {
      expect(isHashObject(1)).toBe(false);
    });

    it('should return false for a boolean', () => {
      expect(isHashObject(true)).toBe(false);
    });

    it('should return false for null', () => {
      expect(isHashObject(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isHashObject(undefined)).toBe(false);
    });

    it('should return false for a function', () => {
      expect(isHashObject(() => 1)).toBe(false);
    });
  });

  describe('prettifyJson()', () => {
    it('should prettify a hash object input with a single key', () => {
      expect(prettifyJson({ a: 0 })).toEqual(`{
  "a": 0
}`);
    });

    it('should prettify a hash object input with multiple keys', () => {
      expect(prettifyJson({ b: 1, a: 0 })).toEqual(`{
  "a": 0,
  "b": 1
}`);
    });

    it('should prettify an array input', () => {
      expect(prettifyJson([0, 1])).toBe(`[
  0,
  1
]`);
    });

    it('should prettify a string input', () => {
      expect(prettifyJson('alpha')).toBe('"alpha"');
    });

    it('should prettify a number input', () => {
      expect(prettifyJson(1)).toBe('1');
    });

    it('should prettify a boolean input', () => {
      expect(prettifyJson(true)).toBe('true');
    });

    it('should prettify a null input', () => {
      expect(prettifyJson(null)).toBe('null');
    });

    it('should prettify an undefined input', () => {
      expect(prettifyJson(undefined)).toBe(undefined);
    });
  });
});
