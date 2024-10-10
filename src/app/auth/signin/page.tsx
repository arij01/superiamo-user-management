import { redirect } from "next/navigation";
import { SignInPage } from "@/src/app/auth/signin/signin"
import { checkIsSignedIn } from "@/src/lib/auth/checkIsSignedIn";

const SignIn: React.FC = async () => {
    const isSignedIn = await checkIsSignedIn();
    
    if (isSignedIn){
        redirect('/dashboard');
    }
    else{
        return <SignInPage />;
    }
    
}

export default SignIn;