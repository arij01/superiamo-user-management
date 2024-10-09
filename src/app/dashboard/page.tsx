import { redirect } from "next/navigation";
import { DashboardPage } from "./dashboard";

const Dashboard: React.FC = () => {
    //const isSignedIn = await checkIsSignedIn();
    const isSignedIn = true;
    if (!isSignedIn){
        redirect("/auth/sign-in")
    }
    else{
        return <DashboardPage />;
    }
    
}

export default Dashboard;