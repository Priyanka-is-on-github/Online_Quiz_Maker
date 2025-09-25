import { Box, useTheme, useMediaQuery } from "@mui/material";
import NavBar from "../components/navbar";

export const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.grey[100]} 100%)`,
          display: "flex",
          flexDirection: "column",
           
        }}
      >
        <NavBar />
        <Box 
          component="main"
          sx={{ 
            width: {
              xs: '90%',
              sm: '85%',
              md: '80%',
              lg: '75%'
            },
            margin: '0 auto', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            flexGrow: 1,
            mt: {
              xs: '60px', // Adjusted for mobile navbar height
              md: '70px'  // Adjusted for desktop navbar height
            },
            pt: 3,
            pb: 6
          }}
        >
          {children}
        </Box>
        
        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            textAlign: 'center',
           
          }}
        >
          <Box sx={{ maxWidth: 'sm', mx: 'auto',  }}>
            <span>© {new Date().getFullYear()} QuizMaster. All rights reserved.</span>
          </Box>
        </Box>
      </Box>
    </>
  );
};