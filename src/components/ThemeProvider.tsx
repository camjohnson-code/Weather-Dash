import {
  createContext,
  type ReactElement,
  type ReactNode,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';

type Props = {
  children: ReactNode;
};

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default function ThemeProvider({ children }: Props): ReactElement {
  const [theme, setTheme] = useState<Theme>('dark');
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used in a Theme Provider');

  return context;
}
