import React, { useState } from "react";
import { Layout } from "../../layout";
import { 
  Box, 
  Button, 
  TextField, 
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  Alert,
  CircularProgress
} from "@mui/material";
import toast from "react-hot-toast";
import AddQuestion from "../../components/add_question";

function CreateQuiz() {
  const [quizName, setQuizName] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (event) => {
    setQuizName(event.target.value);
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleQuizName = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!quizName.trim()) {
      setError("Quiz name is required");
      return;
    }
    
    if (quizName.length < 3) {
      setError("Quiz name must be at least 3 characters long");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("http://localhost:2000/api/v1/quizname", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ quizname: quizName }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      if (data === false) {
        setError("Please choose another name, this quiz name already exists");
        toast.error("Quiz name already exists");
      } else {
        setIsCreated(true);
        toast.success("Quiz created successfully!");
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
      setError("Failed to create quiz. Please try again.");
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {isCreated ? (
        <AddQuestion quizName={quizName} />
      ) : (
        <Box
          sx={{
            minHeight: { xs: '60vh', md: '65vh' },
            width: { 
              xs: '90%', 
              sm: '70%', 
              md: '50%', 
              lg: '35%' 
            },
            m: "auto",
            my: { xs: 4, md: 8 },
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Paper
            elevation={8}
            component="form"
            onSubmit={handleQuizName}
            sx={{
              width: '100%',
              p: { xs: 3, sm: 4 },
              textAlign: "center",
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: `linear-gradient(to bottom, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            <Typography 
              variant="h4" 
              sx={{ 
                color: theme.palette.primary.dark,
                fontWeight: 600,
                mb: 1,
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' }
              }}
            >
              Create New Quiz
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                color: theme.palette.text.secondary,
                mb: 3,
                fontSize: { xs: '1rem', sm: '1.1rem' }
              }}
            >
              Give your quiz a unique name
            </Typography>
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="quizName"
              label="Quiz Name"
              name="quizName"
              value={quizName}
              onChange={handleChange}
              error={!!error}
              helperText={error}
              disabled={loading}
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
              autoFocus
            />

            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              variant="contained"
              type="submit"
              disabled={loading || !quizName.trim()}
              fullWidth
              sx={{ 
                p: 1.5,
                fontSize: "1rem",
                mt: 2,
                mb: 2,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: `0 4px 12px ${theme.palette.primary.main}30`,
                '&:hover': {
                  boxShadow: `0 6px 16px ${theme.palette.primary.main}40`,
                  transform: 'translateY(-1px)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Creating...
                </>
              ) : (
                'Create Quiz'
              )}
            </Button>
            
            <Typography 
              variant="caption" 
              sx={{ 
                color: theme.palette.text.secondary,
                mt: 1
              }}
            >
              You'll be able to add questions after creating the quiz
            </Typography>
          </Paper>
        </Box>
      )}
    </Layout>
  );
}

export default CreateQuiz;