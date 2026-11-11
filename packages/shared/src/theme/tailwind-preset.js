/**
 * @notice Tailwind CSS Preset for Parcelo Logistics Platform
 * @dev Reused across Customer and Ops applications for 100% design system alignment.
 */
module.exports = {
  darkMode: 'class',
  theme: {
    screens: {
      phone: '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        parcelo: {
          bg: '#0F172A',
          surface: '#1E293B',
          'surface-elevated': '#243047',
          border: '#334155',
          'border-hover': '#475569',
          text: '#F1F5F9',
          muted: '#94A3B8',
          subtle: '#64748B',
          teal: '#14B8A6',
          'teal-hover': '#2DD4BF',
          'teal-pressed': '#0D9488',
        },
        status: {
          pending: '#F59E0B',
          inTransit: '#3B82F6',
          outForDelivery: '#8B5CF6',
          delivered: '#22C55E',
          failed: '#EF4444',
          cancelled: '#64748B',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['IBM Plex Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        card: '12px',
        control: '8px',
        pill: '9999px',
      },
      height: {
        control: '44px',
      },
      boxShadow: {
        none: 'none',
      },
      ringColor: {
        parcelo: '#2DD4BF',
      },
      ringOffsetColor: {
        parcelo: '#0F172A',
      },
    },
  },
  plugins: [],
};

