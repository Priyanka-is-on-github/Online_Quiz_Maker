import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import CelebrationIcon from '@mui/icons-material/Celebration';

const HighestScore = ({ Score, Total }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ textAlign: 'center' }}>
      <CelebrationIcon 
        sx={{ 
          fontSize: { xs: 50, sm: 60 },
          color: theme.palette.success.main,
          mb: 2
        }} 
      />
      <Typography 
        variant="h4" 
        sx={{ 
          color: theme.palette.success.dark,
          fontWeight: 700,
          mb: 2,
          fontSize: { xs: '1.5rem', sm: '2rem' }
        }}
      >
        Perfect Score! 🎉
      </Typography>
      <Typography 
        variant="h6" 
        sx={{ 
          color: theme.palette.text.secondary,
          mb: 2
        }}
      >
        You got all {Total} questions correct!
      </Typography>
      <Typography variant="body1">
        You're a quiz master! Your knowledge is impressive.
      </Typography>
    </Box>
  );
};

export default HighestScore;