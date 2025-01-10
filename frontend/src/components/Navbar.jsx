import useUserAuthStore from '../store/userAuthStore';

const Navbar = () => {
  const { authUser } = useUserAuthStore();
  return <nav>Navbar</nav>;
};

export default Navbar;