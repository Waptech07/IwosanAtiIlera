"use client";

import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";

export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      storageKey="iwosan-theme"
    >
      {children}
    </NextThemesProvider>
  );
}