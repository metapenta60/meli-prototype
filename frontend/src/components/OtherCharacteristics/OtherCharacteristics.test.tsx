import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import OtherCharacteristics from './OtherCharacteristics';

// Mock the styled components
vi.mock('./OtherCharacteristics.styled.tsx', () => ({
  CharacteristicsContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="characteristics-container">{children}</div>
  ),
  LeftColumn: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="left-column">{children}</div>
  ),
  RightColumn: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="right-column">{children}</div>
  ),
  CharacteristicGroup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="characteristic-group">{children}</div>
  ),
  GroupTitle: ({ children }: { children: React.ReactNode }) => (
    <h4 data-testid="group-title">{children}</h4>
  ),
  CharacteristicRow: ({ children, isEven }: { children: React.ReactNode; isEven: boolean }) => (
    <div data-testid="characteristic-row" data-even={isEven}>{children}</div>
  ),
  CharacteristicLabel: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="characteristic-label">{children}</span>
  ),
  CharacteristicValue: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="characteristic-value">{children}</span>
  ),
}));

describe('OtherCharacteristics', () => {
  const defaultCharacteristicGroups = [
    {
      title: 'Conectividad',
      characteristics: [
        { title: 'WiFi', value: '802.11ac' },
        { title: 'Bluetooth', value: '5.0' },
        { title: 'NFC', value: 'Sí' },
      ],
    },
    {
      title: 'Batería',
      characteristics: [
        { title: 'Capacidad', value: '4000mAh' },
        { title: 'Carga rápida', value: '25W' },
        { title: 'Carga inalámbrica', value: '15W' },
      ],
    },
    {
      title: 'Audio',
      characteristics: [
        { title: 'Altavoces', value: 'Estéreo' },
        { title: 'Jack 3.5mm', value: 'No' },
        { title: 'Codec', value: 'AAC' },
      ],
    },
  ];

  it('renders the characteristics container', () => {
    render(<OtherCharacteristics characteristicGroups={defaultCharacteristicGroups} />);
    
    const container = screen.getByTestId('characteristics-container');
    expect(container).toBeInTheDocument();
  });

  it('renders the left column', () => {
    render(<OtherCharacteristics characteristicGroups={defaultCharacteristicGroups} />);
    
    const leftColumn = screen.getByTestId('left-column');
    expect(leftColumn).toBeInTheDocument();
  });

  it('renders the right column', () => {
    render(<OtherCharacteristics characteristicGroups={defaultCharacteristicGroups} />);
    
    const rightColumn = screen.getByTestId('right-column');
    expect(rightColumn).toBeInTheDocument();
  });

  it('distributes characteristic groups evenly between columns', () => {
    render(<OtherCharacteristics characteristicGroups={defaultCharacteristicGroups} />);
    
    const leftColumn = screen.getByTestId('left-column');
    const rightColumn = screen.getByTestId('right-column');
    
    // With 3 groups, should have 2 in left (Math.ceil(3/2) = 2), 1 in right
    const leftGroups = leftColumn.querySelectorAll('[data-testid="characteristic-group"]');
    const rightGroups = rightColumn.querySelectorAll('[data-testid="characteristic-group"]');
    
    expect(leftGroups).toHaveLength(2);
    expect(rightGroups).toHaveLength(1);
  });

  it('renders characteristic groups with correct titles', () => {
    render(<OtherCharacteristics characteristicGroups={defaultCharacteristicGroups} />);
    
    const groupTitles = screen.getAllByTestId('group-title');
    expect(groupTitles).toHaveLength(3);
    
    expect(groupTitles[0]).toHaveTextContent('Conectividad');
    expect(groupTitles[1]).toHaveTextContent('Batería');
    expect(groupTitles[2]).toHaveTextContent('Audio');
  });

  it('renders characteristic rows with correct structure', () => {
    render(<OtherCharacteristics characteristicGroups={defaultCharacteristicGroups} />);
    
    const characteristicRows = screen.getAllByTestId('characteristic-row');
    expect(characteristicRows).toHaveLength(9); // 3 groups × 3 characteristics each
    
    // Check first row structure
    const firstRow = characteristicRows[0];
    expect(firstRow.querySelector('[data-testid="characteristic-label"]')).toBeInTheDocument();
    expect(firstRow.querySelector('[data-testid="characteristic-value"]')).toBeInTheDocument();
  });

  it('renders characteristic labels and values correctly', () => {
    render(<OtherCharacteristics characteristicGroups={defaultCharacteristicGroups} />);
    
    const labels = screen.getAllByTestId('characteristic-label');
    const values = screen.getAllByTestId('characteristic-value');
    
    expect(labels[0]).toHaveTextContent('WiFi:');
    expect(values[0]).toHaveTextContent('802.11ac');
    expect(labels[1]).toHaveTextContent('Bluetooth:');
    expect(values[1]).toHaveTextContent('5.0');
  });

  it('applies correct isEven prop to rows', () => {
    render(<OtherCharacteristics characteristicGroups={defaultCharacteristicGroups} />);
    
    const characteristicRows = screen.getAllByTestId('characteristic-row');
    
    expect(characteristicRows[0]).toHaveAttribute('data-even', 'true');
    expect(characteristicRows[1]).toHaveAttribute('data-even', 'false');
    expect(characteristicRows[2]).toHaveAttribute('data-even', 'true');
  });

  it('handles single characteristic group', () => {
    const singleGroup = [
      {
        title: 'Solo grupo',
        characteristics: [
          { title: 'Característica', value: 'Valor' },
        ],
      },
    ];
    
    render(<OtherCharacteristics characteristicGroups={singleGroup} />);
    
    const leftColumn = screen.getByTestId('left-column');
    const rightColumn = screen.getByTestId('right-column');
    
    // With 1 group, should have 1 in left (Math.ceil(1/2) = 1), 0 in right
    const leftGroups = leftColumn.querySelectorAll('[data-testid="characteristic-group"]');
    const rightGroups = rightColumn.querySelectorAll('[data-testid="characteristic-group"]');
    
    expect(leftGroups).toHaveLength(1);
    expect(rightGroups).toHaveLength(0);
  });

  it('handles empty characteristic groups array', () => {
    render(<OtherCharacteristics characteristicGroups={[]} />);
    
    const leftColumn = screen.getByTestId('left-column');
    const rightColumn = screen.getByTestId('right-column');
    
    const leftGroups = leftColumn.querySelectorAll('[data-testid="characteristic-group"]');
    const rightGroups = rightColumn.querySelectorAll('[data-testid="characteristic-group"]');
    
    expect(leftGroups).toHaveLength(0);
    expect(rightGroups).toHaveLength(0);
  });

  it('handles characteristic groups with empty characteristics array', () => {
    const groupsWithEmptyCharacteristics = [
      {
        title: 'Grupo vacío',
        characteristics: [],
      },
      {
        title: 'Grupo con características',
        characteristics: [
          { title: 'Característica', value: 'Valor' },
        ],
      },
    ];
    
    render(<OtherCharacteristics characteristicGroups={groupsWithEmptyCharacteristics} />);
    
    const groupTitles = screen.getAllByTestId('group-title');
    expect(groupTitles).toHaveLength(2);
    
    // Should render both groups even if one has no characteristics
    expect(groupTitles[0]).toHaveTextContent('Grupo vacío');
    expect(groupTitles[1]).toHaveTextContent('Grupo con características');
  });

  it('handles many characteristic groups', () => {
    const manyGroups = Array.from({ length: 10 }, (_, i) => ({
      title: `Grupo ${i + 1}`,
      characteristics: [
        { title: `Característica ${i + 1}`, value: `Valor ${i + 1}` },
      ],
    }));
    
    render(<OtherCharacteristics characteristicGroups={manyGroups} />);
    
    const leftColumn = screen.getByTestId('left-column');
    const rightColumn = screen.getByTestId('right-column');
    
    const leftGroups = leftColumn.querySelectorAll('[data-testid="characteristic-group"]');
    const rightGroups = rightColumn.querySelectorAll('[data-testid="characteristic-group"]');
    
    expect(leftGroups).toHaveLength(5);
    expect(rightGroups).toHaveLength(5);
  });

  it('handles characteristic groups with many characteristics', () => {
    const groupsWithManyCharacteristics = [
      {
        title: 'Grupo grande',
        characteristics: Array.from({ length: 20 }, (_, i) => ({
          title: `Característica ${i + 1}`,
          value: `Valor ${i + 1}`,
        })),
      },
    ];
    
    render(<OtherCharacteristics characteristicGroups={groupsWithManyCharacteristics} />);
    
    const characteristicRows = screen.getAllByTestId('characteristic-row');
    expect(characteristicRows).toHaveLength(20);
    
    expect(characteristicRows[0]).toHaveAttribute('data-even', 'true');
    expect(characteristicRows[1]).toHaveAttribute('data-even', 'false');
  });

  it('handles special characters in titles and values', () => {
    const groupsWithSpecialChars = [
      {
        title: 'Grupo con símbolos: !@#$%^&*()',
        characteristics: [
          { title: 'Característica con acentos: áéíóú ñ', value: 'Valor con símbolos: €£¥¢§¶†‡' },
        ],
      },
    ];
    
    render(<OtherCharacteristics characteristicGroups={groupsWithSpecialChars} />);
    
    const groupTitle = screen.getByTestId('group-title');
    const characteristicLabel = screen.getByTestId('characteristic-label');
    const characteristicValue = screen.getByTestId('characteristic-value');
    
    expect(groupTitle).toHaveTextContent('Grupo con símbolos: !@#$%^&*()');
    expect(characteristicLabel).toHaveTextContent('Característica con acentos: áéíóú ñ:');
    expect(characteristicValue).toHaveTextContent('Valor con símbolos: €£¥¢§¶†‡');
  });

  it('handles very long titles and values', () => {
    const groupsWithLongText = [
      {
        title: 'Este es un título muy largo que excede el ancho normal del componente y puede causar problemas de layout o text overflow',
        characteristics: [
          { 
            title: 'Esta es una característica con un título muy largo que también puede causar problemas de layout',
            value: 'Este es un valor muy largo que también puede causar problemas de layout y text overflow en el componente',
          },
        ],
      },
    ];
    
    render(<OtherCharacteristics characteristicGroups={groupsWithLongText} />);
    
    const groupTitle = screen.getByTestId('group-title');
    const characteristicLabel = screen.getByTestId('characteristic-label');
    const characteristicValue = screen.getByTestId('characteristic-value');
    
    expect(groupTitle).toHaveTextContent('Este es un título muy largo que excede el ancho normal del componente y puede causar problemas de layout o text overflow');
    expect(characteristicLabel).toHaveTextContent('Esta es una característica con un título muy largo que también puede causar problemas de layout:');
    expect(characteristicValue).toHaveTextContent('Este es un valor muy largo que también puede causar problemas de layout y text overflow en el componente');
  });

  it('renders with different props values', () => {
    const { rerender } = render(<OtherCharacteristics characteristicGroups={defaultCharacteristicGroups} />);
    
    let groupTitles = screen.getAllByTestId('group-title');
    expect(groupTitles).toHaveLength(3);
    
    const newGroups = [
      {
        title: 'Nuevo grupo',
        characteristics: [
          { title: 'Nueva característica', value: 'Nuevo valor' },
        ],
      },
    ];
    
    rerender(<OtherCharacteristics characteristicGroups={newGroups} />);
    
    groupTitles = screen.getAllByTestId('group-title');
    expect(groupTitles).toHaveLength(1);
    expect(groupTitles[0]).toHaveTextContent('Nuevo grupo');
  });

  it('maintains structure with all props', () => {
    render(<OtherCharacteristics characteristicGroups={defaultCharacteristicGroups} />);
    
    // Check that all main sections are present
    expect(screen.getByTestId('characteristics-container')).toBeInTheDocument();
    expect(screen.getByTestId('left-column')).toBeInTheDocument();
    expect(screen.getByTestId('right-column')).toBeInTheDocument();
    
    // Check that groups have correct structure
    const characteristicGroups = screen.getAllByTestId('characteristic-group');
    expect(characteristicGroups).toHaveLength(3);
    
    characteristicGroups.forEach(group => {
      expect(group.querySelector('[data-testid="group-title"]')).toBeInTheDocument();
      expect(group.querySelectorAll('[data-testid="characteristic-row"]').length).toBeGreaterThan(0);
    });
  });
});
