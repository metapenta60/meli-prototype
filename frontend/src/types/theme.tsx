// Tipos para el tema
export interface ThemeColors {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
    textInverse: string;
    backgroundPrimary: string;
    backgroundSecondary: string;
    backgroundTertiary: string;
    borderPrimary: string;
    borderSecondary: string;
    hover: string;
    active: string;
    disabled: string;
    meliYellow: string;
    meliBlue: string;
    meliGreen: string;
    meliOrange: string;
    meliRed: string;
    meliGray: string;
    
    // Heatmap colors for seller ratings
    heatmap: {
        excellent: string;    // Verde para ratings 4.5+
        veryGood: string;    // Verde claro para ratings 4.0+
        good: string;        // Amarillo para ratings 3.5+
        fair: string;        // Naranja para ratings 3.0+
        poor: string;        // Rosa para ratings 2.5+
        veryPoor: string;    // Gris para ratings bajos
    };
}

export interface ThemeFonts {
    primary: string;
    secondary: string;
    mono: string;
    system: string;
}

export interface ThemeFontWeights {
    light: number;
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold: number;
}

export interface ThemeFontSizes {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    "4xl": string;
    "5xl": string;
}

export interface ThemeSpacing {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
}

export interface ThemeBorderRadius {
    none: string;
    sm: string;
    base: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
}

export interface ThemeShadows {
    sm: string;
    base: string;
    md: string;
    lg: string;
    xl: string;
}

export interface ThemeBreakpoints {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
}

export interface ThemeTransitions {
    fast: string;
    base: string;
    slow: string;
}

export interface Theme {
    colors: ThemeColors;
    fonts: ThemeFonts;
    fontWeights: ThemeFontWeights;
    fontSizes: ThemeFontSizes;
    spacing: ThemeSpacing;
    borderRadius: ThemeBorderRadius;
    shadows: ThemeShadows;
    breakpoints: ThemeBreakpoints;
    transitions: ThemeTransitions;
}

// Tema con los colores principales de Mercado Libre
export const theme: Theme = {
    colors: {
        // Colores principales de Mercado Libre
        primary: "#FFE600",        // Amarillo principal
        secondary: "#3483FA",      // Azul principal
        success: "#00A650",        // Verde de éxito
        warning: "#FF6B35",        // Naranja de advertencia
        error: "#E74C3C",          // Rojo de error
        
        // Colores de texto
        textPrimary: "#333333",    // Texto principal
        textSecondary: "#666666",  // Texto secundario
        textTertiary: "#999999",  // Texto terciario
        textInverse: "#FFFFFF",   // Texto sobre fondos oscuros
        
        // Colores de fondo
        backgroundPrimary: "#FFFFFF",   // Fondo principal
        backgroundSecondary: "#F5F5F5", // Fondo secundario
        backgroundTertiary: "#EEEEEE",  // Fondo terciario
        
        // Colores de borde
        borderPrimary: "#DDDDDD",       // Borde principal
        borderSecondary: "#CCCCCC",     // Borde secundario
        
        // Colores de estado
        hover: "#FFF2CC",               // Hover sobre amarillo
        active: "#E6CF00",              // Amarillo activo
        disabled: "#CCCCCC",            // Estado deshabilitado
        
        // Colores específicos de Mercado Libre
        meliYellow: "#FFE600",          // Amarillo ML
        meliBlue: "#3483FA",            // Azul ML
        meliGreen: "#00A650",           // Verde ML
        meliOrange: "#FF6B35",          // Naranja ML
        meliRed: "#E74C3C",             // Rojo ML
        meliGray: "#F5F5F5",            // Gris ML
        
        // Heatmap colors for seller ratings
        heatmap: {
            excellent: "#00A650",    // Verde para ratings 4.5+
            veryGood: "#00C650",    // Verde claro para ratings 4.0+
            good: "#FFE600",        // Amarillo para ratings 3.5+
            fair: "#FF6B35",        // Naranja para ratings 3.0+
            poor: "#E74C3C",        // Rosa para ratings 2.5+
            veryPoor: "#F5F5F5",    // Gris para ratings bajos
        },
    },
    fonts: {
        // Fuentes principales de Mercado Libre
        primary: "'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        secondary: "'Proxima Nova Condensed', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        mono: "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
        
        // Fallbacks para diferentes sistemas operativos
        system: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    },
    fontWeights: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
    },
    fontSizes: {
        xs: "0.75rem",      // 12px
        sm: "0.875rem",     // 14px
        base: "1rem",       // 16px
        lg: "1.125rem",     // 18px
        xl: "1.25rem",      // 20px
        "2xl": "1.5rem",    // 24px
        "3xl": "1.875rem",  // 30px
        "4xl": "2.25rem",   // 36px
        "5xl": "3rem",      // 48px
    },
    spacing: {
        xs: "0.25rem",      // 4px
        sm: "0.5rem",       // 8px
        md: "1rem",         // 16px
        lg: "1.5rem",       // 24px
        xl: "2rem",         // 32px
        "2xl": "3rem",      // 48px
        "3xl": "4rem",      // 64px
    },
    borderRadius: {
        none: "0",
        sm: "0.125rem",     // 2px
        base: "0.25rem",    // 4px
        md: "0.375rem",     // 6px
        lg: "0.5rem",       // 8px
        xl: "0.75rem",      // 12px
        full: "9999px",
    },
    shadows: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    },
    breakpoints: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
    },
    transitions: {
        fast: "150ms ease-in-out",
        base: "250ms ease-in-out",
        slow: "350ms ease-in-out",
    },
};