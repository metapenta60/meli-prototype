import { describe, it, expect } from 'vitest';
import { Link, LinkSecondary, LinkSmall, ItemLinkContainer } from './Link.styled';

describe('Link Components', () => {
  describe('Link', () => {
    it('exports Link component', () => {
      expect(Link).toBeDefined();
      expect(typeof Link).toBe('object');
    });

    it('Link has correct display name', () => {
      expect(Link.displayName || 'Link').toBe('styled.a');
    });

    it('Link is a styled component', () => {
      expect(Link).toHaveProperty('styledComponentId');
    });

    it('Link is not null or undefined', () => {
      expect(Link).not.toBeNull();
      expect(Link).not.toBeUndefined();
    });
  });

  describe('LinkSecondary', () => {
    it('exports LinkSecondary component', () => {
      expect(LinkSecondary).toBeDefined();
      expect(typeof LinkSecondary).toBe('object');
    });

    it('LinkSecondary has correct display name', () => {
      expect(LinkSecondary.displayName || 'LinkSecondary').toBe('styled.a');
    });

    it('LinkSecondary is a styled component', () => {
      expect(LinkSecondary).toHaveProperty('styledComponentId');
    });

    it('LinkSecondary is not null or undefined', () => {
      expect(LinkSecondary).not.toBeNull();
      expect(LinkSecondary).not.toBeUndefined();
    });
  });

  describe('LinkSmall', () => {
    it('exports LinkSmall component', () => {
      expect(LinkSmall).toBeDefined();
      expect(typeof LinkSmall).toBe('object');
    });

    it('LinkSmall has correct display name', () => {
      expect(LinkSmall.displayName || 'LinkSmall').toBe('styled.a');
    });

    it('LinkSmall is a styled component', () => {
      expect(LinkSmall).toHaveProperty('styledComponentId');
    });

    it('LinkSmall is not null or undefined', () => {
      expect(LinkSmall).not.toBeNull();
      expect(LinkSmall).not.toBeUndefined();
    });
  });

  describe('ItemLinkContainer', () => {
    it('exports ItemLinkContainer component', () => {
      expect(ItemLinkContainer).toBeDefined();
      expect(typeof ItemLinkContainer).toBe('object');
    });

    it('ItemLinkContainer has correct display name', () => {
      expect(ItemLinkContainer.displayName || 'ItemLinkContainer').toBe('styled.div');
    });

    it('ItemLinkContainer is a styled component', () => {
      expect(ItemLinkContainer).toHaveProperty('styledComponentId');
    });

    it('ItemLinkContainer is not null or undefined', () => {
      expect(ItemLinkContainer).not.toBeNull();
      expect(ItemLinkContainer).not.toBeUndefined();
    });
  });

  describe('Component Structure', () => {
    it('all components are exported', () => {
      expect(Link).toBeDefined();
      expect(LinkSecondary).toBeDefined();
      expect(LinkSmall).toBeDefined();
      expect(ItemLinkContainer).toBeDefined();
    });

    it('components are different from each other', () => {
      expect(Link).not.toBe(LinkSecondary);
      expect(Link).not.toBe(LinkSmall);
      expect(Link).not.toBe(ItemLinkContainer);
      expect(LinkSecondary).not.toBe(LinkSmall);
      expect(LinkSecondary).not.toBe(ItemLinkContainer);
      expect(LinkSmall).not.toBe(ItemLinkContainer);
    });

    it('all components are styled components', () => {
      expect(Link).toHaveProperty('styledComponentId');
      expect(LinkSecondary).toHaveProperty('styledComponentId');
      expect(LinkSmall).toHaveProperty('styledComponentId');
      expect(ItemLinkContainer).toHaveProperty('styledComponentId');
    });
  });

  describe('Component Types', () => {
    it('Link components render as anchor elements', () => {
      expect(Link.displayName).toBe('styled.a');
      expect(LinkSecondary.displayName).toBe('styled.a');
      expect(LinkSmall.displayName).toBe('styled.a');
    });

    it('ItemLinkContainer renders as div element', () => {
      expect(ItemLinkContainer.displayName).toBe('styled.div');
    });

    it('all components are objects', () => {
      expect(typeof Link).toBe('object');
      expect(typeof LinkSecondary).toBe('object');
      expect(typeof LinkSmall).toBe('object');
      expect(typeof ItemLinkContainer).toBe('object');
    });
  });

  describe('Styled Component Properties', () => {
    it('all components have styledComponentId', () => {
      expect(Link.styledComponentId).toBeDefined();
      expect(LinkSecondary.styledComponentId).toBeDefined();
      expect(LinkSmall.styledComponentId).toBeDefined();
      expect(ItemLinkContainer.styledComponentId).toBeDefined();
      
      expect(typeof Link.styledComponentId).toBe('string');
      expect(typeof LinkSecondary.styledComponentId).toBe('string');
      expect(typeof LinkSmall.styledComponentId).toBe('string');
      expect(typeof ItemLinkContainer.styledComponentId).toBe('string');
    });

    it('all components have displayName', () => {
      expect(Link.displayName).toBeDefined();
      expect(LinkSecondary.displayName).toBeDefined();
      expect(LinkSmall.displayName).toBeDefined();
      expect(ItemLinkContainer.displayName).toBeDefined();
    });

    it('all components have toString method', () => {
      expect(typeof Link.toString).toBe('function');
      expect(typeof LinkSecondary.toString).toBe('function');
      expect(typeof LinkSmall.toString).toBe('function');
      expect(typeof ItemLinkContainer.toString).toBe('function');
    });
  });

  describe('Import/Export', () => {
    it('components are exported as named exports', () => {
      expect(Link).toBeDefined();
      expect(LinkSecondary).toBeDefined();
      expect(LinkSmall).toBeDefined();
      expect(ItemLinkContainer).toBeDefined();
    });

    it('components are not null or undefined', () => {
      expect(Link).not.toBeNull();
      expect(LinkSecondary).not.toBeNull();
      expect(LinkSmall).not.toBeNull();
      expect(ItemLinkContainer).not.toBeNull();
      
      expect(Link).not.toBeUndefined();
      expect(LinkSecondary).not.toBeUndefined();
      expect(LinkSmall).not.toBeUndefined();
      expect(ItemLinkContainer).not.toBeUndefined();
    });
  });
});
