import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ItemDescription from './ItemDescription';

// Mock the styled components
vi.mock('./ItemDescription.styled.tsx', () => ({
  DescriptionContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="description-container">{children}</div>
  ),
  DescriptionText: ({ children }: { children: React.ReactNode }) => (
    <p data-testid="description-text">{children}</p>
  ),
  DescriptionTextBlurred: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="description-text-blurred">{children}</span>
  ),
}));

// Mock the Shared components
vi.mock('../Shared', () => ({
  ItemLinkContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="item-link-container">{children}</div>
  ),
  Link: ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <button data-testid="link" onClick={onClick}>{children}</button>
  ),
}));

describe('ItemDescription', () => {
  const shortDescription = 'Esta es una descripción corta que no necesita truncamiento.';
  const longDescription = 'Esta es una descripción muy larga que excede el límite máximo de caracteres permitidos y por lo tanto debería ser truncada y mostrar el efecto de blur al final, además de mostrar el botón "Ver más" para permitir al usuario expandir la descripción completa y leer todo el contenido sin restricciones.';

  describe('Short descriptions', () => {
    it('renders short description without truncation', () => {
      render(<ItemDescription description={shortDescription} />);
      
      const container = screen.getByTestId('description-container');
      const text = screen.getByTestId('description-text');
      
      expect(container).toBeInTheDocument();
      expect(text).toBeInTheDocument();
      expect(text).toHaveTextContent(shortDescription);
    });

    it('renders short description without "Ver más" link', () => {
      render(<ItemDescription description={shortDescription} />);
      
      const linkContainer = screen.queryByTestId('item-link-container');
      const link = screen.queryByTestId('link');
      
      expect(linkContainer).not.toBeInTheDocument();
      expect(link).not.toBeInTheDocument();
    });

    it('renders short description with custom maxLength', () => {
      render(<ItemDescription description={shortDescription} maxLength={50} />);
      
      const text = screen.getByTestId('description-text');
      expect(text).toHaveTextContent(shortDescription);
      
      // With short description (67 chars) and maxLength=50, it should be considered long
      const linkContainer = screen.getByTestId('item-link-container');
      const link = screen.getByTestId('link');
      expect(linkContainer).toBeInTheDocument();
      expect(link).toBeInTheDocument();
    });
  });

  describe('Long descriptions', () => {
    it('renders long description with truncation', () => {
      render(<ItemDescription description={longDescription} maxLength={100} />);
      
      const container = screen.getByTestId('description-container');
      const text = screen.getByTestId('description-text');
      
      expect(container).toBeInTheDocument();
      expect(text).toBeInTheDocument();
      
      // Should show truncated text
      const visibleText = longDescription.substring(0, 100);
      expect(text).toHaveTextContent(visibleText);
    });

    it('renders long description with blur effect', () => {
      render(<ItemDescription description={longDescription} maxLength={100} />);
      
      const blurredText = screen.getByTestId('description-text-blurred');
      expect(blurredText).toBeInTheDocument();
      
      // Should show next 10 characters with blur effect
      const blurredContent = longDescription.substring(100, 110);
      expect(blurredText.textContent).toBe(blurredContent);
    });

    it('renders "Ver más" link for long descriptions', () => {
      render(<ItemDescription description={longDescription} maxLength={100} />);
      
      const linkContainer = screen.getByTestId('item-link-container');
      const link = screen.getByTestId('link');
      
      expect(linkContainer).toBeInTheDocument();
      expect(link).toBeInTheDocument();
      expect(link).toHaveTextContent('Ver más');
    });

    it('shows full description when "Ver más" is clicked', () => {
      render(<ItemDescription description={longDescription} maxLength={100} />);
      
      const link = screen.getByTestId('link');
      
      // Initially should show truncated text
      const text = screen.getByTestId('description-text');
      const visibleText = longDescription.substring(0, 100);
      expect(text).toHaveTextContent(visibleText);
      
      // Click "Ver más"
      fireEvent.click(link);
      
      // Should now show full description
      expect(text).toHaveTextContent(longDescription);
    });

    it('hides "Ver más" link after expanding description', () => {
      render(<ItemDescription description={longDescription} maxLength={100} />);
      
      const link = screen.getByTestId('link');
      fireEvent.click(link);
      
      // Link container should be hidden
      const linkContainer = screen.queryByTestId('item-link-container');
      expect(linkContainer).not.toBeInTheDocument();
    });

    it('maintains full description state after expanding', () => {
      const { rerender } = render(<ItemDescription description={longDescription} maxLength={100} />);
      
      const link = screen.getByTestId('link');
      fireEvent.click(link);
      
      // Should now show full description
      let text = screen.getByTestId('description-text');
      expect(text).toHaveTextContent(longDescription);
      
      // Link container should be hidden
      let linkContainer = screen.queryByTestId('item-link-container');
      expect(linkContainer).not.toBeInTheDocument();
      
      // Re-render with same props should maintain expanded state
      rerender(<ItemDescription description={longDescription} maxLength={100} />);
      
      text = screen.getByTestId('description-text');
      expect(text).toHaveTextContent(longDescription);
      
      linkContainer = screen.queryByTestId('item-link-container');
      expect(linkContainer).not.toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('handles description exactly at maxLength', () => {
      const exactLengthDescription = 'A'.repeat(100);
      render(<ItemDescription description={exactLengthDescription} maxLength={100} />);
      
      const text = screen.getByTestId('description-text');
      expect(text).toHaveTextContent(exactLengthDescription);
      
      const linkContainer = screen.queryByTestId('item-link-container');
      expect(linkContainer).not.toBeInTheDocument();
    });

    it('handles description one character over maxLength', () => {
      const overLengthDescription = 'A'.repeat(101);
      render(<ItemDescription description={overLengthDescription} maxLength={100} />);
      
      const text = screen.getByTestId('description-text');
      const visibleText = 'A'.repeat(100);
      expect(text).toHaveTextContent(visibleText);
      
      const blurredText = screen.getByTestId('description-text-blurred');
      expect(blurredText).toHaveTextContent('A');
      
      const link = screen.getByTestId('link');
      expect(link).toBeInTheDocument();
    });

    it('handles empty description', () => {
      render(<ItemDescription description="" />);
      
      const text = screen.getByTestId('description-text');
      expect(text).toHaveTextContent('');
      
      const linkContainer = screen.queryByTestId('item-link-container');
      expect(linkContainer).not.toBeInTheDocument();
    });

    it('handles description with only spaces', () => {
      const spaceDescription = '   ';
      render(<ItemDescription description={spaceDescription} />);
      
      const text = screen.getByTestId('description-text');
      expect(text.textContent).toBe(spaceDescription);
      
      const linkContainer = screen.queryByTestId('item-link-container');
      expect(linkContainer).not.toBeInTheDocument();
    });

    it('handles very long description with small maxLength', () => {
      const veryLongDescription = 'A'.repeat(1000);
      render(<ItemDescription description={veryLongDescription} maxLength={50} />);
      
      const text = screen.getByTestId('description-text');
      const visibleText = 'A'.repeat(50);
      expect(text).toHaveTextContent(visibleText);
      
      const blurredText = screen.getByTestId('description-text-blurred');
      const blurredContent = 'A'.repeat(10);
      expect(blurredText).toHaveTextContent(blurredContent);
      
      const link = screen.getByTestId('link');
      expect(link).toBeInTheDocument();
    });

    it('handles description with special characters', () => {
      const specialDescription = 'Descripción con símbolos: !@#$%^&*() y acentos: áéíóú ñ';
      render(<ItemDescription description={specialDescription} maxLength={30} />);
      
      const text = screen.getByTestId('description-text');
      const visibleText = specialDescription.substring(0, 30);
      expect(text).toHaveTextContent(visibleText);
      
      const blurredText = screen.getByTestId('description-text-blurred');
      const blurredContent = specialDescription.substring(30, 40);
      expect(blurredText).toHaveTextContent(blurredContent);
    });

    it('handles description with emojis', () => {
      const emojiDescription = 'Descripción con emojis 😀🎉🚀 y más texto para probar el truncamiento';
      render(<ItemDescription description={emojiDescription} maxLength={40} />);
      
      const text = screen.getByTestId('description-text');
      const visibleText = emojiDescription.substring(0, 40);
      expect(text).toHaveTextContent(visibleText);
      
      const blurredText = screen.getByTestId('description-text-blurred');
      const blurredContent = emojiDescription.substring(40, 50);
      expect(blurredText).toHaveTextContent(blurredContent);
    });

    it('handles description with HTML-like content', () => {
      const htmlDescription = 'Descripción con <tags> y &entities; para probar el comportamiento';
      render(<ItemDescription description={htmlDescription} maxLength={35} />);
      
      const text = screen.getByTestId('description-text');
      const visibleText = htmlDescription.substring(0, 35);
      expect(text).toHaveTextContent(visibleText);
      
      const blurredText = screen.getByTestId('description-text-blurred');
      const blurredContent = htmlDescription.substring(35, 45);
      expect(blurredText.textContent).toBe(blurredContent);
    });
  });

  describe('Props updates', () => {
    it('updates when description prop changes', () => {
      const { rerender } = render(<ItemDescription description={shortDescription} />);
      
      let text = screen.getByTestId('description-text');
      expect(text).toHaveTextContent(shortDescription);
      
      rerender(<ItemDescription description={longDescription} maxLength={100} />);
      
      text = screen.getByTestId('description-text');
      const visibleText = longDescription.substring(0, 100);
      expect(text).toHaveTextContent(visibleText);
      
      const link = screen.getByTestId('link');
      expect(link).toBeInTheDocument();
    });

    it('updates when maxLength prop changes', () => {
      const { rerender } = render(<ItemDescription description={longDescription} maxLength={50} />);
      
      let text = screen.getByTestId('description-text');
      let visibleText = longDescription.substring(0, 50);
      expect(text).toHaveTextContent(visibleText);
      
      rerender(<ItemDescription description={longDescription} maxLength={150} />);
      
      text = screen.getByTestId('description-text');
      visibleText = longDescription.substring(0, 150);
      expect(text).toHaveTextContent(visibleText);
      
      // Should still show link since description is still longer than 150
      const link = screen.getByTestId('link');
      expect(link).toBeInTheDocument();
    });

    it('resets state when description changes', () => {
      const { rerender } = render(<ItemDescription description={longDescription} maxLength={100} />);
      
      const link = screen.getByTestId('link');
      fireEvent.click(link);
      
      // Should be expanded
      let text = screen.getByTestId('description-text');
      expect(text).toHaveTextContent(longDescription);
      
      // Change to short description
      rerender(<ItemDescription description={shortDescription} />);
      
      text = screen.getByTestId('description-text');
      expect(text).toHaveTextContent(shortDescription);
      
      const linkContainer = screen.queryByTestId('item-link-container');
      expect(linkContainer).not.toBeInTheDocument();
    });
  });

  describe('Default maxLength', () => {
    it('uses default maxLength of 300 when not provided', () => {
      const description300 = 'A'.repeat(300);
      const description301 = 'A'.repeat(301);
      
      // Exactly 300 characters - should not truncate
      const { rerender } = render(<ItemDescription description={description300} />);
      
      let text = screen.getByTestId('description-text');
      expect(text).toHaveTextContent(description300);
      
      let linkContainer = screen.queryByTestId('item-link-container');
      expect(linkContainer).not.toBeInTheDocument();
      
      // 301 characters - should truncate
      rerender(<ItemDescription description={description301} />);
      
      text = screen.getByTestId('description-text');
      const visibleText = 'A'.repeat(300);
      expect(text).toHaveTextContent(visibleText);
      
      const blurredText = screen.getByTestId('description-text-blurred');
      expect(blurredText).toHaveTextContent('A');
      
      const link = screen.getByTestId('link');
      expect(link).toBeInTheDocument();
    });
  });

  describe('Component structure', () => {
    it('renders with correct structure for short description', () => {
      render(<ItemDescription description={shortDescription} />);
      
      const container = screen.getByTestId('description-container');
      const text = screen.getByTestId('description-text');
      
      expect(container).toContainElement(text);
      expect(container.children).toHaveLength(1);
    });

    it('renders with correct structure for long description', () => {
      render(<ItemDescription description={longDescription} maxLength={100} />);
      
      const container = screen.getByTestId('description-container');
      const text = screen.getByTestId('description-text');
      const linkContainer = screen.getByTestId('item-link-container');
      const link = screen.getByTestId('link');
      
      expect(container).toContainElement(text);
      expect(linkContainer).toContainElement(link);
    });

    it('maintains structure after state changes', () => {
      render(<ItemDescription description={longDescription} maxLength={100} />);
      
      const link = screen.getByTestId('link');
      fireEvent.click(link);
      
      const container = screen.getByTestId('description-container');
      const text = screen.getByTestId('description-text');
      
      expect(container).toContainElement(text);
      expect(container.children).toHaveLength(1);
    });
  });
});
