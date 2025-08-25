# Testing Setup

Este proyecto está configurado con Vitest y Testing Library para testing de componentes React.

## 🚀 Scripts Disponibles

### Ejecutar Tests
```bash
# Ejecutar tests en modo watch (desarrollo)
npm run test

# Ejecutar tests una vez
npm run test:run

# Ejecutar tests con UI visual
npm run test:ui

# Ejecutar tests con coverage
npm run test:coverage

# Ejecutar tests en modo watch
npm run test:watch
```

## 🧪 Tecnologías Utilizadas

- **Vitest** - Framework de testing rápido
- **Testing Library** - Utilidades para testing de componentes React
- **jsdom** - Entorno DOM para testing
- **@testing-library/jest-dom** - Matchers adicionales para DOM

## 📁 Estructura de Testing

```
src/
├── test/
│   └── setup.ts          # Configuración global de testing
├── components/
│   ├── HomePage/
│   │   └── HomePage.test.tsx
│   └── Dropdown/
│       └── Dropdown.test.tsx
```

## 🔧 Configuración

### Vitest Config
- **Environment**: jsdom para simular DOM del navegador
- **Setup Files**: `src/test/setup.ts` para configuración global
- **Coverage**: Configurado con V8 provider

### TypeScript
- **tsconfig.test.json** - Configuración específica para testing
- **Types**: Incluye tipos de Vitest y Testing Library

## 📝 Escribir Tests

### Ejemplo Básico
```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from 'styled-components';
import Component from './Component';
import theme from '../theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Component', () => {
  it('renders correctly', () => {
    renderWithTheme(<Component />);
    expect(screen.getByText('Text')).toBeInTheDocument();
  });
});
```

### Testing con Styled Components
- Usar `renderWithTheme` wrapper para componentes que usan el tema
- Importar el tema desde `src/styled/theme`

### Testing de Eventos
```tsx
import { fireEvent } from '@testing-library/react';

fireEvent.click(button);
fireEvent.change(input, { target: { value: 'text' } });
```

## 🎯 Mejores Prácticas

1. **Testear comportamiento, no implementación**
2. **Usar queries accesibles** (getByRole, getByLabelText)
3. **Mockear dependencias externas** cuando sea necesario
4. **Mantener tests simples** y enfocados
5. **Usar nombres descriptivos** para tests

## 📊 Coverage

Para ver el reporte de coverage:
```bash
npm run test:coverage
```

Esto generará un reporte HTML en la carpeta `coverage/`.

## 🐛 Debugging

Para debugging de tests:
```bash
# Ejecutar tests con logs detallados
npm run test:run -- --reporter=verbose

# Ejecutar un test específico
npm run test:run -- HomePage.test.tsx
```

