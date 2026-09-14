/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: {
          950: '#02040a',
          900: '#030712',
          850: '#050b18',
          800: '#071426',
          700: '#0c1e38',
          600: '#142c4e',
        },
        cyan: {
          glow: '#00e5ff',
          neon: '#00f0ff',
          dim: '#0099aa',
        },
        violet: {
          glow: '#8b5cf6',
          neon: '#7c3aed',
          dim: '#5b21b6',
        },
        telemetry: {
          green: '#10b981',
          amber: '#f59e0b',
          blue: '#38bdf8',
          cyan: '#22d3ee',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        display: ['"Space Grotesk"', '"Rajdhani"', 'sans-serif'],
        hud: ['"Orbitron"', '"Rajdhani"', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 20px -3px rgba(0, 229, 255, 0.45)',
        'neon-cyan-lg': '0 0 35px -2px rgba(0, 229, 255, 0.65)',
        'neon-purple': '0 0 20px -3px rgba(124, 58, 237, 0.45)',
        'neon-purple-lg': '0 0 35px -2px rgba(124, 58, 237, 0.65)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'orbit-slow': 'spin 30s linear infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 10px rgba(0, 229, 255, 0.7))' },
          '50%': { opacity: '0.6', filter: 'drop-shadow(0 0 3px rgba(0, 229, 255, 0.3))' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
