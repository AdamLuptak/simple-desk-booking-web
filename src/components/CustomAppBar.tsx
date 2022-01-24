import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import useAuth from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Paper } from '@mui/material';

const pages = ['Overview', 'Desk-booking'];
const settings = ['Account', 'Logout'];


const CustomAppBar = () => {

    const auth = useAuth();
    const navigate = useNavigate();
    const [selected, setSelected] = useState<string | null>('Overview');

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleNavMenu = (setting: string) => {
        setAnchorElNav(null);
        setAnchorElUser(null)
        setSelected(setting)
        navigate(`/${setting.toLocaleLowerCase()}`);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>

            {auth?.user &&
            <AppBar position="static">
              <Container maxWidth="xl">
                <Toolbar disableGutters>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ mr: 2, display: { xs: 'none', md: 'flex', lg: 'flex' } }}
                  >
                    <Paper variant="elevation">
                      <img src="favicon.ico"  width="50" height="50" />
                    </Paper>
                  </Typography>

                  <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleOpenNavMenu}
                      color="inherit"
                    >
                      <MenuIcon/>
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorElNav}
                      anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                      }}
                      keepMounted
                      transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                      }}
                      open={Boolean(anchorElNav)}
                      onClose={handleCloseNavMenu}
                      sx={{
                          display: { xs: 'block', md: 'none' },
                      }}
                    >
                        {pages.map((page) => (
                            <MenuItem
                                selected={page === selected}
                                key={page} onClick={() => handleNavMenu(page)}>
                                <Typography textAlign="center">{page}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                  </Box>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                  >
                    <Paper variant="elevation">
                      <img src="favicon.ico"  width="50" height="50" />
                    </Paper>
                  </Typography>
                  <Box sx={{
                      flexGrow: 1, display: { xs: 'none', md: 'flex' }, "&& .Mui-selected": {
                          backgroundColor: "rgba(0, 0, 0, 0.04)"
                      }
                  }}>
                      {pages.map((page, index) => (
                          <MenuItem selected={page === selected} onClick={() => handleNavMenu(page)}>
                              <Typography sx={{ my: 2, color: 'white', display: 'block', }}
                                          textAlign="center">{page}</Typography>
                          </MenuItem>
                      ))}
                  </Box>

                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp">
                          <ManageAccountsIcon/>
                          </Avatar>
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem selected={setting === selected} key={setting}
                                      onClick={() => handleNavMenu(setting)}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                  </Box>
                </Toolbar>
              </Container>
            </AppBar>}
        </>
    );
};
export default CustomAppBar;


