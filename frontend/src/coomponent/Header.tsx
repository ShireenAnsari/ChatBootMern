import { AppBar, Toolbar } from '@mui/material';
import Logo from './shared/Logo';
import { useAuth } from '../context/AuthContext';
import NavigationLink from './shared/Navigation';

const Header = () => {
  const auth=useAuth();
  return (
    <AppBar sx={{bgcolor:'transparent',position:'static',boxShadow:'none'}}>
  <Toolbar sx={{display:'flex'}}>
  <Logo/>
  <div>
{auth?.isLoggedIn?<>
<NavigationLink bg='#00fffc' to='/chat' text='Go to Chat' textColor='black'/>
<NavigationLink bg='#51538f' to='/' text='Logout' 
onClick={auth.logout}
 textColor='white'/>
</>:<>
<NavigationLink bg='#00fffc' to='/login' text='Login' textColor='black'/>
<NavigationLink bg='#51538f' to='/Sign-up' text='Signup'
 textColor='white'/>
</>}
  </div>
  </Toolbar>
    </AppBar>
  )
}

export default Header