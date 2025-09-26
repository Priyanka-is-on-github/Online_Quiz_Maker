import React, { useEffect, useState } from "react";
import { Layout } from "../../layout";
import { 
  Box, 
  Typography, 
  Button, 
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Card,
  CardContent,
  LinearProgress,
  useTheme,
  useMediaQuery,
  Container,
  Alert,
  IconButton
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function QuizQuestions() {
  const { id } = useParams();
  const [allQuestions, setAllQuestions] = useState([]);
  const [selectedOption, setSelectedOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOptionChange = (questionId, option) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [questionId]: option
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(selectedOption).length === 0) {
      alert('Please attempt at least one question before submitting');
      return;
    }

    let newScore = 0;
    allQuestions.forEach((question) => {
      if (question.answer === selectedOption[question.id]) {
        newScore++;
      }
    });

    navigate(`/attend-quiz/${id}/score`, { 
      state: { 
        score: newScore, 
        total: allQuestions.length,
        quizName: id
      } 
    });
  };

  const handleNext = () => {
    if (currentQuestion < allQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleQuit = () => {
    if (window.confirm('Are you sure you want to quit? Your progress will be lost.')) {
      navigate("/attend-quiz");
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/questions/${id}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch questions: ${response.status}`);
        }

        const allQuestion = await response.json();
        setAllQuestions(allQuestion);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Failed to load quiz questions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <Typography variant="h6">Loading questions...</Typography>
        </Box>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Button 
            variant="contained" 
            onClick={() => navigate("/attend-quiz")}
            startIcon={<ArrowBackIcon />}
          >
            Back to Quizzes
          </Button>
        </Container>
      </Layout>
    );
  }

  if (allQuestions.length === 0) {
    return (
      <Layout>
        <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            No questions available for this quiz
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate("/attend-quiz")}
            startIcon={<ArrowBackIcon />}
          >
            Back to Quizzes
          </Button>
        </Container>
      </Layout>
    );
  }

  const progress = ((currentQuestion + 1) / allQuestions.length) * 100;
  const answeredQuestions = Object.keys(selectedOption).length;

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 3, px: { xs: 2, sm: 3 } }}>
        {/* Header Section */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', sm: 'center' },
          mb: 3,
          gap: 2
        }}>
          <Box>
            <Typography 
              variant="h4" 
              sx={{ 
                color: theme.palette.primary.dark, 
                fontWeight: 700,
                fontSize: { xs: '1.75rem', sm: '2.125rem' }
              }}
            >
              {id}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mt: 0.5 }}>
              Question {currentQuestion + 1} of {allQuestions.length}
            </Typography>
          </Box>
          
          <Button 
            variant="outlined" 
            onClick={handleQuit}
            startIcon={<ExitToAppIcon />}
            color="error"
            size={isMobile ? "small" : "medium"}
          >
            Quit Quiz
          </Button>
        </Box>

        {/* Progress Bar */}
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ 
            height: 8, 
            borderRadius: 4, 
            mb: 3,
            backgroundColor: theme.palette.grey[200],
            '& .MuiLinearProgress-bar': {
              borderRadius: 4,
              backgroundColor: theme.palette.primary.main
            }
          }} 
        />

        {/* Question Navigation for mobile */}
        {isMobile && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Button 
              variant="outlined" 
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              size="small"
            >
              Previous
            </Button>
            <Button 
              variant="outlined" 
              onClick={handleNext}
              disabled={currentQuestion === allQuestions.length - 1}
              size="small"
            >
              Next
            </Button>
          </Box>
        )}

        {/* Question Card */}
        <Card sx={{ 
          mb: 3, 
          borderRadius: 3,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
        }}>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: theme.palette.primary.main,
                fontWeight: 600,
                mb: 3,
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              {currentQuestion + 1}. {allQuestions[currentQuestion].question}
            </Typography>

            <FormControl component="fieldset" sx={{ width: '100%' }}>
              <RadioGroup
                value={selectedOption[allQuestions[currentQuestion].id] || ''}
                onChange={(e) => handleOptionChange(allQuestions[currentQuestion].id, e.target.value)}
              >
                {[
                  allQuestions[currentQuestion].option1,
                  allQuestions[currentQuestion].option2,
                  allQuestions[currentQuestion].option3,
                  allQuestions[currentQuestion].option4
                ].map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={
                      <Radio 
                        sx={{ 
                          color: theme.palette.primary.main,
                          '&.Mui-checked': {
                            color: theme.palette.primary.main,
                          }
                        }} 
                      />
                    }
                    label={
                      <Typography sx={{ 
                        fontSize: { xs: '0.95rem', sm: '1rem' },
                        color: 'text.primary'
                      }}>
                        {option}
                      </Typography>
                    }
                    sx={{
                      borderRadius: 2,
                      p: 1.5,
                      mb: 1,
                      backgroundColor: selectedOption[allQuestions[currentQuestion].id] === option 
                        ? alpha(theme.palette.primary.main, 0.08) 
                        : 'transparent',
                      border: `1px solid ${theme.palette.grey[200]}`,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.04),
                      }
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>

        {/* Navigation and Submit */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2
        }}>
          {!isMobile && (
            <Box>
              <Button 
                variant="outlined" 
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                sx={{ mr: 2 }}
              >
                Previous
              </Button>
              <Button 
                variant="outlined" 
                onClick={handleNext}
                disabled={currentQuestion === allQuestions.length - 1}
              >
                Next
              </Button>
            </Box>
          )}

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {answeredQuestions} of {allQuestions.length} questions answered
          </Typography>

          <Button 
            variant="contained" 
            onClick={handleSubmit}
            size="large"
            sx={{ 
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              minWidth: { xs: '100%', sm: 'auto' }
            }}
          >
            Submit Quiz
          </Button>
        </Box>
      </Container>
    </Layout>
  );
}

export default QuizQuestions;

// Helper function for transparency
function alpha(color, value) {
  return color + Math.round(value * 255).toString(16).padStart(2, '0');
}