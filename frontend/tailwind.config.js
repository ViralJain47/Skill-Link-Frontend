module.exports = {
    darkMode: ["class"],
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html",
      "*.{js,ts,jsx,tsx,mdx}",
      "app/**/*.{ts,tsx}",
      "components/**/*.{ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "#ffffff",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "#FFA500",
            foreground: "hsl(var(--secondary-foreground))",
          },
          accent: {
            DEFAULT: "#FFCCCC",
            foreground: "hsl(var(--accent-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
          amber: {
            400: '#FBBF24',
            500: '#F59E0B',
            600: '#D97706',
          },
          gray: {
            100: '#F3F4F6',
            200: '#E5E7EB',
            500: '#6B7280',
            600: '#4B5563',
            800: '#1F2937',
          },
          green: {
            200: '#A7F3D0',
            400: '#34D399',
            500: '#10B981',
          },
          blue: {
            200: '#BFDBFE',
            400: '#60A5FA',
          },
          pink: {
            200: '#FBCFE8',
          },
          red: {
            400: '#F87171',
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        animation: {
          "float-up": "floatUp 8s ease-in-out infinite",
          "float-down": "floatDown 8s ease-in-out infinite",
        },
        keyframes: {
          floatUp: {
            "0%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-20px)" },
            "100%": { transform: "translateY(0)" },
          },
          floatDown: {
            "0%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(20px)" },
            "100%": { transform: "translateY(0)" },
          },
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  }