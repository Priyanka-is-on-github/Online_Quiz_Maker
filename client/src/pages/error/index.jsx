import { useRouteError, isRouteErrorResponse } from "react-router";
import { 
  Box, 
  Typography, 
  Button, 
  Container,
  Paper,
  useTheme,
  useMediaQuery 
} from "@mui/material";
import { Home as HomeIcon, Refresh as RefreshIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleRefresh = () => {
    window.location.reload();
  };

  if (isRouteErrorResponse(error)) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.grey[100]} 100%)`,
          p: 2
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={8}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              borderRadius: 3,
              background: `linear-gradient(to bottom, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`
            }}
          >
            <Typography 
              variant="h1" 
              component="div"
              sx={{
                fontSize: isMobile ? '4rem' : '6rem',
                fontWeight: 700,
                color: theme.palette.primary.main,
                mb: 1
              }}
            >
              {error.status}
            </Typography>
            
            <Typography 
              variant="h4" 
              component="h2"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                mb: 2
              }}
            >
              Oops! Something went wrong
            </Typography>
            
            <Typography 
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                mb: 3
              }}
            >
              {error.statusText || "We encountered an unexpected error"}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, flexDirection: isMobile ? 'column' : 'row' }}>
              <Button
                variant="contained"
                startIcon={<HomeIcon />}
                component={Link}
                to="/"
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1
                }}
              >
                Go Home
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={handleRefresh}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1
                }}
              >
                Refresh Page
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.grey[100]} 100%)`,
        p: 2
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            borderRadius: 3,
            background: `linear-gradient(to bottom, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`
          }}
        >
          <Typography 
            variant="h1" 
            component="div"
            sx={{
              fontSize: isMobile ? '4rem' : '6rem',
              fontWeight: 700,
              color: theme.palette.error.main,
              mb: 1
            }}
          >
            !
          </Typography>
          
          <Typography 
            variant="h4" 
            component="h2"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              mb: 2
            }}
          >
            Unexpected Error
          </Typography>
          
          <Typography 
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              mb: 3,
              fontFamily: 'monospace',
              backgroundColor: theme.palette.grey[100],
              p: 1,
              borderRadius: 1
            }}
          >
            {error.message || "Unknown Error"}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexDirection: isMobile ? 'column' : 'row' }}>
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              component={Link}
              to="/"
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1
              }}
            >
              Go Home
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1
              }}
            >
              Refresh Page
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Error;