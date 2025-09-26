import React, { useEffect, useState } from "react";
import { Layout } from "../../layout";
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Modal,
  Card,
  CardContent,
  IconButton,
  useTheme,
  useMediaQuery,
  Container,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function AddQuestion({ quizName }) {
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const [formData, setFormData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenDeleteDialog = (question) => {
    setQuestionToDelete(question);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setQuestionToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleQuiz = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch(
        "${import.meta.env.VITE_SERVER_URL}/api/v1/submit-question",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ ...formData, quizname: quizName }),
        }
      );

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const questionCreated = await response.json();
      if (questionCreated === false) {
        setError("Question already exists. Please provide a different question.");
      } else {
        setFormData({
          question: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          answer: "",
        });
        toast.success("Question added successfully!");
        // Refresh the questions list
        fetchQuestions();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to add question. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!questionToDelete) return;
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/question-delete?id=${questionToDelete.id}&quizname=${quizName}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const remainingQuestions = await response.json();
      setAllQuestions(remainingQuestions);
      toast.success("Question deleted successfully!");
    } catch (error) {
      console.error("Error deleting question:", error);
      toast.error("Failed to delete question.");
    } finally {
      handleCloseDeleteDialog();
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/questions/${quizName}`
      );

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const questions = await response.json();
      setAllQuestions(questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [quizName]);

  return (
 
      <Container maxWidth="lg" sx={{ py: 3 , }}>
        {/* Header Section */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          mb: 4,
          
        }}>
          <Box>
            <Typography 
              variant="h3" 
              sx={{ 
                color: theme.palette.primary.dark, 
                textAlign: { xs: 'center', sm: 'left' },
                fontWeight: 700,
                fontSize: { xs: '2rem', sm: '2.5rem' }
              }}
            >
              Add Questions to {quizName}
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: theme.palette.text.secondary,
                textAlign: { xs: 'center', sm: 'left' }
              }}
            >
              Create engaging questions for your quiz
            </Typography>
          </Box>
          
          <Button
            variant="outlined"
            onClick={() => navigate("/attend-quiz")}
            startIcon={<ArrowBackIcon />}
            color="primary"
            size={isMobile ? "small" : "medium"}
          >
            Back to Quiz
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {/* Question Form */}
        <Paper 
          elevation={3}
          sx={{ 
            p: { xs: 3, sm: 4 },
            mb: 4,
            borderRadius: 3
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Add New Question
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Question"
              name="question"
              value={formData.question}
              onChange={handleQuiz}
              required
              multiline
              rows={2}
              sx={{ mb: 3 }}
              placeholder="Enter your question here..."
            />
            
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
              gap: 3,
              mb: 3 
            }}>
              <TextField
                fullWidth
                label="Option 1"
                name="option1"
                value={formData.option1}
                onChange={handleQuiz}
                required
                sx={{ mb: { xs: 2, sm: 0 } }}
              />
              <TextField
                fullWidth
                label="Option 2"
                name="option2"
                value={formData.option2}
                onChange={handleQuiz}
                required
              />
              <TextField
                fullWidth
                label="Option 3"
                name="option3"
                value={formData.option3}
                onChange={handleQuiz}
                required
                sx={{ mb: { xs: 2, sm: 0 } }}
              />
              <TextField
                fullWidth
                label="Option 4"
                name="option4"
                value={formData.option4}
                onChange={handleQuiz}
                required
              />
            </Box>
            
            <TextField
              fullWidth
              label="Correct Answer"
              name="answer"
              value={formData.answer}
              onChange={handleQuiz}
              required
              sx={{ mb: 3 }}
              placeholder="Enter the correct answer exactly as written in one of the options"
            />
            
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between'
            }}>
              <Button
                variant="contained"
                type="submit"
                disabled={loading}
                size="large"
                sx={{ 
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  minWidth: { xs: '100%', sm: 'auto' }
                }}
              >
                {loading ? 'Adding Question...' : 'Add Question'}
              </Button>
              
              <Button
                variant="outlined"
                onClick={handleOpen}
                startIcon={<VisibilityIcon />}
                size="large"
                sx={{ 
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  minWidth: { xs: '100%', sm: 'auto' }
                }}
              >
                Preview Questions ({allQuestions.length})
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Preview Modal */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="preview-questions-modal"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: '80%', md: '70%' },
            maxHeight: '80vh',
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            p: { xs: 2, sm: 4 },
            overflow: 'auto'
          }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 3
            }}>
              <Typography variant="h5" component="h2">
                Questions Preview ({allQuestions.length})
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            
            {allQuestions.length === 0 ? (
              <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
                No questions added yet. Start adding questions to see them here.
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {allQuestions.map((question, index) => (
                  <Card key={question.id} sx={{ borderRadius: 2 }}>
                    <CardContent>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-start',
                        mb: 2,
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 2
                      }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                          {index + 1}. {question.question}
                        </Typography>
                        <Box sx={{ 
                          display: 'flex', 
                          gap: 1,
                          width: { xs: '100%', sm: 'auto' }
                        }}>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<EditIcon />}
                            disabled
                            sx={{ 
                              borderRadius: 1,
                              fontSize: { xs: '0.75rem', sm: '0.875rem' }
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleOpenDeleteDialog(question)}
                            sx={{ 
                              borderRadius: 1,
                              fontSize: { xs: '0.75rem', sm: '0.875rem' }
                            }}
                          >
                            Delete
                          </Button>
                        </Box>
                      </Box>
                      
                      <Box sx={{ 
                        display: 'grid', 
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
                        gap: 2,
                        mt: 2
                      }}>
                        {[question.option1, question.option2, question.option3, question.option4].map((option, i) => (
                          <Box 
                            key={i} 
                            sx={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              p: 1.5,
                              borderRadius: 1,
                              backgroundColor: option === question.answer 
                                ? theme.palette.success.light 
                                : theme.palette.grey[100],
                              border: `1px solid ${option === question.answer 
                                ? theme.palette.success.main 
                                : theme.palette.grey[300]}`
                            }}
                          >
                            <Typography variant="body2">
                              {String.fromCharCode(65 + i)}. {option}
                              {option === question.answer && (
                                <Chip 
                                  label="Correct" 
                                  size="small" 
                                  color="success" 
                                  sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} 
                                />
                              )}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        </Modal>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            Confirm Delete
          </DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this question? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
            <Button onClick={handleDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
   
  );
}

export default AddQuestion;