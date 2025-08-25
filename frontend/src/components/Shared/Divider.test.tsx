import { describe, it, expect } from 'vitest';
import { Divider, DividerVertical, DividerSpaced } from './Divider.styled';

describe('Divider Components', () => {
  describe('Divider', () => {
    it('exports Divider component', () => {
      expect(Divider).toBeDefined();
      expect(typeof Divider).toBe('object');
    });

    it('Divider has correct display name', () => {
      expect(Divider.displayName || 'Divider').toBe('styled.hr');
    });
  });

  describe('DividerVertical', () => {
    it('exports DividerVertical component', () => {
      expect(DividerVertical).toBeDefined();
      expect(typeof DividerVertical).toBe('object');
    });

    it('DividerVertical has correct display name', () => {
      expect(DividerVertical.displayName || 'DividerVertical').toBe('styled.div');
    });
  });

  describe('DividerSpaced', () => {
    it('exports DividerSpaced component', () => {
      expect(DividerSpaced).toBeDefined();
      expect(typeof DividerSpaced).toBe('object');
    });

    it('DividerSpaced has correct display name', () => {
      expect(DividerSpaced.displayName || 'DividerSpaced').toBe('styled.hr');
    });
  });

  describe('Component Structure', () => {
    it('all components are exported', () => {
      expect(Divider).toBeDefined();
      expect(DividerVertical).toBeDefined();
      expect(DividerSpaced).toBeDefined();
    });

    it('components are different from each other', () => {
      expect(Divider).not.toBe(DividerVertical);
      expect(Divider).not.toBe(DividerSpaced);
      expect(DividerVertical).not.toBe(DividerSpaced);
    });

    it('components are styled components', () => {
      // Styled components typically have these properties
      expect(Divider).toHaveProperty('styledComponentId');
      expect(DividerVertical).toHaveProperty('styledComponentId');
      expect(DividerSpaced).toHaveProperty('styledComponentId');
    });
  });

  describe('Import/Export', () => {
    it('components are not null or undefined', () => {
      expect(Divider).not.toBeNull();
      expect(DividerVertical).not.toBeNull();
      expect(DividerSpaced).not.toBeNull();
      
      expect(Divider).not.toBeUndefined();
      expect(DividerVertical).not.toBeUndefined();
      expect(DividerSpaced).not.toBeUndefined();
    });
  });
});

