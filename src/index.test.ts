import { beforeAll, describe, expect, it, jest } from '@jest/globals';

import { compare, generate, isValid, parse } from './index';

describe('friendly-id', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  describe('generation', () => {
    it('can generate an id', () => {
      expect(typeof generate('team')).toBe('string');
    });

    it('generates valid ids', () => {
      expect(isValid(generate('team'))).toBe(true);
    });
  });

  describe('comparison', () => {
    it('can compare ids', () => {
      const older = generate('team');
      jest.advanceTimersByTime(5_000);
      const newer = generate('team');

      expect(compare(older, newer)).toBe(-1);
      expect(compare(newer, older)).toBe(1);
    });

    it('does not order non-friendly id values', () => {
      expect(compare('foo', generate('inv'))).toBe(0);
      expect(compare(generate('tea'), 'bar')).toBe(0);
    });
  });

  describe('parsing', () => {
    it('can parse ids', () => {
      const result = parse('sub_2PugZBcDwBgnmoGOHMka0sXQfH0');
      expect(result).toEqual({
        prefix: 'sub',
        ksuid: '2PugZBcDwBgnmoGOHMka0sXQfH0',
      });
    });

    it('throws when given invalid id', () => {
      expect(() => parse('foo')).toThrowError(TypeError);
    });
  });

  describe('validation', () => {
    it('does not validate id with multiple underscores', () => {
      expect(isValid('msg_2PugoOAqbwOZ_ObfVVGSn7Acj7g')).toBe(false);
    });

    it('does not validate id with invalid ksuid', () => {
      expect(isValid('tea_2Pugt7iaXHKX3E4mbGwXpIZ0Y')).toBe(false);
    });
  });
});
