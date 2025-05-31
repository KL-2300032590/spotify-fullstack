const PremiumRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;
  if (user.role !== 'premium') return <Navigate to="/premium" />;

  return children;
};
