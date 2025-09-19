import { Layout } from '../../layout';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  useTheme,
  useMediaQuery,
  Container,
  alpha 
} from '@mui/material';
import { 
  Quiz as QuizIcon, 
  Create as CreateIcon, 
  EmojiEvents as TrophyIcon,
  Group as GroupIcon 
} from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import { Link } from 'react-router-dom';

// Animation for the hero text
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Floating animation for decorative elements
const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const features = [
    {
      icon: <CreateIcon sx={{ fontSize: 40 }} />,
      title: "Create Quizzes",
      description: "Design custom quizzes with multiple question types and settings."
    },
    {
      icon: <QuizIcon sx={{ fontSize: 40 }} />,
      title: "Take Quizzes",
      description: "Test your knowledge with our interactive quiz interface."
    },
    {
      icon: <TrophyIcon sx={{ fontSize: 40 }} />,
      title: "Earn Badges",
      description: "Get recognized for your achievements with our badge system."
    },
    {
      icon: <GroupIcon sx={{ fontSize: 40 }} />,
      title: "Compete with Friends",
      description: "Challenge your friends and see who scores the highest."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <Box 
        sx={{ 
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.dark, 0.1)} 100%)`,
          position: 'relative',
          overflow: 'hidden',
          py: 6
        }}
      >
        {/* Decorative elements */}
        <Box 
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.2)} 0%, ${alpha(theme.palette.secondary.main, 0.2)} 100%)`,
            animation: `${float} 6s ease-in-out infinite`,
            zIndex: 0
          }}
        />
        <Box 
          sx={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
            animation: `${float} 8s ease-in-out infinite`,
            zIndex: 0
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  textAlign: { xs: 'center', md: 'left' },
                  animation: `${fadeIn} 1s ease-out`
                }}
              >
                <Typography 
                  variant="h1" 
                  sx={{
                    color: theme.palette.primary.dark,
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                    fontWeight: 800,
                    mb: 2
                  }}
                >
                  Let's Quiz
                </Typography>
                <Typography 
                  variant="h4" 
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 500,
                    mb: 3,
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
                  }}
                >
                  Engage, Educate, and Entertain with Our Easy-to-Use Quiz Platform
                </Typography>
                <Typography  
                  variant="h6" 
                  sx={{
                    color: theme.palette.text.secondary,
                    mb: 4,
                    fontSize: { xs: '1rem', sm: '1.1rem' }
                  }}
                >
                  Create custom quizzes or test your knowledge with our interactive platform. 
                  Join thousands of users who make learning fun!
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Link to='/attend-quiz'>
                  <Button 
                    variant="contained" 
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                      '&:hover': {
                        boxShadow: `0 6px 24px ${alpha(theme.palette.primary.main, 0.4)}`,
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Start Quiz
                  </Button>
                  </Link>
                  <Link
                                 
                                    to='/create-quiz'
                                    
                                  >
                  <Button 
                    variant="outlined" 
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      borderWidth: 2,
                      '&:hover': {
                        borderWidth: 2,
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Create Quiz
                  </Button>
</Link>

                </Box>
              </Box>
            </Grid>
            {!isMobile && (
              <Grid item xs={12} md={6}>
                <Box 
                  sx={{ 
                    textAlign: 'center',
                    animation: `${float} 6s ease-in-out infinite`,
                  }}
                >
                 
                </Box>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, backgroundColor: '#fff' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            sx={{ 
              textAlign: 'center', 
              mb: 2,
              color: theme.palette.primary.dark,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Why Choose Let's Quiz?
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              textAlign: 'center', 
              mb: 6, 
              maxWidth: 600,
              mx: 'auto',
              color: theme.palette.text.secondary
            }}
          >
            Our platform offers everything you need to create, take, and share engaging quizzes.
          </Typography>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    textAlign: 'center',
                    p: 3,
                    height: '100%',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 12px 30px ${alpha(theme.palette.primary.main, 0.15)}`,
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      display: 'inline-flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      mb: 3
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <CardContent sx={{ p: 0 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box 
        sx={{ 
          py: 8,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of users who are already creating and taking quizzes on our platform.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              backgroundColor: 'white',
              color: theme.palette.primary.main,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              '&:hover': {
                backgroundColor: alpha('#fff', 0.9),
                boxShadow: '0 6px 24px rgba(0, 0, 0, 0.2)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Sign Up Now
          </Button>
        </Container>
      </Box>
    </Layout>
  );
}

export default Home;