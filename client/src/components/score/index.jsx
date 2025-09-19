
import React from "react";
import { Layout } from "../../layout";
import { 
  Box, 
  Typography, 
  Container,
  useTheme,
  useMediaQuery,
  Paper,
  Button
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import HighestScore from "./highest-score";
import LowestScore from "./lowest-score";
import MediumScore from "./medium-score";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HomeIcon from '@mui/icons-material/Home';
import ReplayIcon from '@mui/icons-material/Replay';

function Score() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { score, total, quizName } = location.state || {};
  
  // Handle case where user navigates directly without taking quiz
  if (!location.state) {
    return (
      <Layout>
        <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error" sx={{ mb: 3 }}>
            No quiz results found
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate("/attend-quiz")}
            startIcon={<HomeIcon />}
          >
            Back to Quizzes
          </Button>
        </Container>
      </Layout>
    );
  }

  const percentage = (score / total) * 100;
  let ScoreComponent;
  
  if (score === total) {
    ScoreComponent = HighestScore;
  } else if (score >= total / 2) {
    ScoreComponent = MediumScore;
  } else {
    ScoreComponent = LowestScore;
  }

  return (
    <Layout>
      <Container maxWidth="md" sx={{ py: { xs: 3, sm: 4 } }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <EmojiEventsIcon 
            sx={{ 
              fontSize: { xs: 50, sm: 60 },
              color: theme.palette.primary.main,
              mb: 2
            }} 
          />
          <Typography 
            variant="h3" 
            sx={{ 
              color: theme.palette.primary.dark,
              fontWeight: 700,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              mb: 1
            }}
          >
            Quiz Results
          </Typography>
          {quizName && (
            <Typography 
              variant="h6" 
              sx={{ 
                color: theme.palette.text.secondary,
                mb: 2
              }}
            >
              {quizName}
            </Typography>
          )}
        </Box>

        {/* Score Card */}
        <Paper 
          elevation={8}
          sx={{ 
            borderRadius: 3,
            overflow: 'hidden',
            mb: 4,
            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`
          }}
        >
          <Box 
            sx={{ 
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              color: 'white',
              py: 3,
              textAlign: 'center'
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Your Score
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, mt: 1 }}>
              {score}/{total}
            </Typography>
            <Typography variant="h6" sx={{ mt: 1, opacity: 0.9 }}>
              {percentage.toFixed(0)}% Correct
            </Typography>
          </Box>

          {/* Score Component */}
          <Box sx={{ p: { xs: 3, sm: 4 } }}>
            <ScoreComponent Score={score} Total={total} />
          </Box>
        </Paper>

        {/* Action Buttons */}
        <Box 
          sx={{ 
            display: 'flex', 
            gap: 2, 
            justifyContent: 'center',
            flexDirection: { xs: 'column', sm: 'row' }
          }}
        >
          <Button
            variant="outlined"
            size="large"
            startIcon={<HomeIcon />}
            onClick={() => navigate("/attend-quiz")}
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: 600
            }}
          >
            Back to Quizzes
          </Button>
          <Button
            variant="contained"
            size="large"
            startIcon={<ReplayIcon />}
            onClick={() => navigate(`/attend-quiz/${quizName || ''}`)}
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: 600
            }}
          >
            Try Again
          </Button>
        </Box>
      </Container>
    </Layout>
  );
}

export default Score;