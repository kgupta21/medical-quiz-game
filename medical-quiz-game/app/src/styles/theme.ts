export const theme = {
  colors: {
    primary: '#1a237e',
    secondary: '#0d47a1',
    correct: '#2e7d32',
    incorrect: '#c62828',
    background: '#000033',
    text: '#ffffff',
    highlight: '#ffd700'
  },
  fonts: {
    main: 'Roboto, sans-serif',
    display: 'Montserrat, sans-serif'
  },
  animations: {
    questionFade: '0.3s ease-in',
    optionHover: '0.2s ease-out',
    resultReveal: '0.5s cubic-bezier(0.4, 0, 0.2, 1)'
  }
};

export type Theme = typeof theme;
