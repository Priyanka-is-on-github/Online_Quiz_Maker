import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';

const LowestScore = ({ Score, Total }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const percentage = (Score / Total) * 100;

  return (
    <Box sx={{ textAlign: 'center' }}>
      <SchoolIcon 
        sx={{ 
          fontSize: { xs: 50, sm: 60 },
          color: theme.palette.info.main,
          mb: 2
        }} 
      />
      <Typography 
        variant="h4" 
        sx={{ 
          color: theme.palette.info.dark,
          fontWeight: 700,
          mb: 2,
          fontSize: { xs: '1.5rem', sm: '2rem' }
        }}
      >
        Keep Learning! 📚
      </Typography>
      <Typography 
        variant="h6" 
        sx={{ 
          color: theme.palette.text.secondary,
          mb: 2
        }}
      >
        You got {Score} out of {Total} questions correct ({percentage.toFixed(0)}%).
      </Typography>
      <Typography variant="body1">
        Don't worry! Everyone starts somewhere. Review the material and try again - you'll do better next time!
      </Typography>
    </Box>
  );
};

export default LowestScore;