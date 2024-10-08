import { redirect } from "next/navigation";
import { SignInPage } from "./signin"

const SignIn: React.FC = () => {
    //const SignedIn = await checkIsSignedIn();
    const SignedIn = false;
    if (SignedIn){
        redirect('/dashboard');
    }
    else{
        return <SignInPage />;
    }
    
}

export default SignIn;