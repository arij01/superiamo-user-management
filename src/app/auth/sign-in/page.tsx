import { redirect } from "next/navigation";
import { SignInPage } from "./signin"

const SignIn: React.FC = () => {
    //const isSignedIn = await checkIsSignedIn();
    const isSignedIn = false;
    if (isSignedIn){
        redirect('/dashboard');
    }
    else{
        return <SignInPage />;
    }
    
}

export default SignIn;