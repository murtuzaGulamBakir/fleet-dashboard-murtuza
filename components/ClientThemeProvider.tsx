"use client";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#1976d2", // Blue
        },
        secondary: {
            main: "#ff9800", // Orange
        },
    },
    typography: {
        fontFamily: "var(--font-geist-sans), Arial, sans-serif",
    },
});

export default function ClientThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
