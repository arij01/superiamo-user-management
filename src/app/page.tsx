import { SignInButton } from "../components/sign-in-button";


const Home: React.FC = () => {
  return (
    <div className="home-page">
      
        <h2>Home</h2>
        <div>
            <SignInButton className="signin-button"/>
        </div>
    
    </div>
  );
};

export default Home;