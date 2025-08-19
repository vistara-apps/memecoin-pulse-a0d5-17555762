module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(210, 70%, 50%)',
        accent: 'hsl(140, 60%, 45%)',
        bg: 'hsl(200, 25%, 85%)',
        surface: 'hsl(200, 25%, 95%)',
        text: 'hsl(210, 25%, 15%)',
        success: 'hsl(140, 60%, 45%)',
        warning: 'hsl(30, 70%, 50%)',
        muted: 'hsl(210, 15%, 60%)',
      },
      spacing: {
        xs: '4px',
        sm: '8px', 
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px', 
        lg: '12px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(210, 25%, 15%, 0.08)',
        modal: '0 16px 48px hsla(210, 25%, 15%, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionDuration: {
        fast: '150ms',
        base: '300ms',
        slow: '600ms',
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
