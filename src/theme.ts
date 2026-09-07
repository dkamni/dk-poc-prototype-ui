import { createTheme } from '@mui/material/styles';
import { palette, typography, radius, spacing } from './tokens.ts';

const theme = createTheme({
  palette: {
    primary: {
      main:          palette.accent,
      dark:          palette.accentHover,
      contrastText:  palette.white,
    },
    text: {
      primary: palette.text,
    },
    background: {
      default: palette.white,
      paper:   palette.surfaceMuted,
    },
    divider: palette.border,
  },
  typography: {
    fontFamily: typography.fontFamily,
    h1:    { fontSize: typography.sizeH1, fontWeight: typography.weightHeading },
    h2:    { fontSize: typography.sizeH2, fontWeight: typography.weightHeading },
    body1: { fontSize: typography.sizeBody },
    body2: { fontSize: typography.sizeSmall },
  },
  shape: {
    borderRadius: radius.sm,
  },
  // 4 px base: spacing(1)=4, spacing(2)=8, spacing(3)=12, spacing(4)=16, spacing(6)=24
  spacing: spacing.xs,
});

export default theme;
