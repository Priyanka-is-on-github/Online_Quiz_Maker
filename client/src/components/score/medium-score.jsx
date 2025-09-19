import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const MediumScore = ({ Score, Total }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const percentage = (Score / Total) * 100;

  return (
    <Box sx={{ textAlign: 'center' }}>
      <ThumbUpIcon 
        sx={{ 
          fontSize: { xs: 50, sm: 60 },
          color: theme.palette.warning.main,
          mb: 2
        }} 
      />
      <Typography 
        variant="h4" 
        sx={{ 
          color: theme.palette.warning.dark,
          fontWeight: 700,
          mb: 2,
          fontSize: { xs: '1.5rem', sm: '2rem' }
        }}
      >
        Good Job! 👍
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
        You're on the right track! With a little more practice, you'll master this topic.
      </Typography>
    </Box>
  );
};

export default MediumScore;