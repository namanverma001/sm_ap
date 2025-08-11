import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// CMS Theme Colors
				'cms-background': 'hsl(var(--cms-background))',
				'cms-surface': 'hsl(var(--cms-surface))',
				'cms-surface-elevated': 'hsl(var(--cms-surface-elevated))',
				'cms-border': 'hsl(var(--cms-border))',
				'cms-primary': 'hsl(var(--cms-primary))',
				'cms-primary-dark': 'hsl(var(--cms-primary-dark))',
				'cms-primary-foreground': 'hsl(var(--cms-primary-foreground))',
				'cms-text-primary': 'hsl(var(--cms-text-primary))',
				'cms-text-secondary': 'hsl(var(--cms-text-secondary))',
				'cms-text-muted': 'hsl(var(--cms-text-muted))',
				'cms-hover': 'hsl(var(--cms-hover))',
				'cms-active': 'hsl(var(--cms-active))',
				'cms-success': 'hsl(var(--cms-success))',
				'cms-warning': 'hsl(var(--cms-warning))',
				'cms-error': 'hsl(var(--cms-error))',
				'cms-input-bg': 'hsl(var(--cms-input-bg))',
				'cms-input-border': 'hsl(var(--cms-input-border))',
				'cms-input-focus': 'hsl(var(--cms-input-focus))',
				'cms-sidebar-bg': 'hsl(var(--cms-sidebar-bg))',
				'cms-sidebar-hover': 'hsl(var(--cms-sidebar-hover))',
				'cms-sidebar-active': 'hsl(var(--cms-sidebar-active))',
				'cms-shadow': 'hsl(var(--cms-shadow))',
				'cms-glow': 'hsl(var(--cms-glow))',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
