import React, { useEffect, useState } from "react";
import { Layout } from "../../layout";
import { 
  Box, 
  Typography, 
  Button, 
  Card,
  CardContent,
  CardActions,
  Grid,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert,
  Chip
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import QuizIcon from '@mui/icons-material/Quiz';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

function AttendQuiz() {
  const [allQuizNames, setAllQuizNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchQuizNames();
  }, []);

  const fetchQuizNames = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/quizname`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch quizzes: ${response.status}`);
      }
      
      const allQuiz = await response.json();
      setAllQuizNames(allQuiz);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      setError("Failed to load quizzes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress size={60} />
        </Box>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Box sx={{ mt: 4, mx: 2 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Button 
            variant="contained" 
            onClick={fetchQuizNames}
            sx={{ borderRadius: 2 }}
          >
            Retry
          </Button>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ px: { xs: 2, sm: 3 }, py: 4 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            color: theme.palette.primary.dark, 
            textAlign: "center",
            fontWeight: 700,
            mb: 1,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          Available Quizzes
        </Typography>
        
        <Typography 
          variant="h6" 
          sx={{ 
            color: theme.palette.text.secondary, 
            textAlign: "center",
            mb: 4,
            maxWidth: 600,
            mx: 'auto',
            fontSize: { xs: '1rem', sm: '1.1rem' }
          }}
        >
          Test your knowledge with these exciting quizzes
        </Typography>

        {allQuizNames.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <QuizIcon sx={{ fontSize: 60, color: theme.palette.grey[400], mb: 2 }} />
            <Typography variant="h6" color="textSecondary">
              No quizzes available yet
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Check back later or create your own quiz!
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {allQuizNames.map((quiz, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
                <Card 
                  sx={{ 
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <QuizIcon 
                        sx={{ 
                          color: theme.palette.primary.main, 
                          mr: 1.5,
                          fontSize: '1.8rem'
                        }} 
                      />
                      <Typography 
                        variant="h5" 
                        component="h2"
                        sx={{ 
                          fontWeight: 600,
                          color: theme.palette.primary.dark,
                          lineHeight: 1.2
                        }}
                      >
                        {quiz.quizName}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <Chip
                        icon={<EmojiEventsIcon />}
                        label={`${quiz.count} Question${quiz.count !== 1 ? 's' : ''}`}
                        size="small"
                        color={quiz.count > 0 ? "primary" : "default"}
                        variant={quiz.count > 0 ? "filled" : "outlined"}
                        sx={{ borderRadius: 1 }}
                      />
                    </Box>
                  </CardContent>
                  
                  <CardActions sx={{ p: 3, pt: 0 }}>
                    {quiz.count === "0" ? (
                      <Button
                        fullWidth
                        variant="outlined"
                        disabled
                        sx={{ 
                          borderRadius: 2,
                          py: 1.2,
                          fontWeight: 600
                        }}
                      >
                        No Questions Available
                      </Button>
                    ) : (
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => navigate(`/attend-quiz/${quiz.quizName}`)}
                        sx={{ 
                          borderRadius: 2,
                          py: 1.2,
                          fontWeight: 600,
                          boxShadow: `0 4px 12px ${theme.palette.primary.main}30`,
                          '&:hover': {
                            boxShadow: `0 6px 16px ${theme.palette.primary.main}40`,
                          }
                        }}
                      >
                        Start Quiz
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Layout>
  );
}

export default AttendQuiz;