import { redirect } from "next/navigation";
import { DashboardPage } from "@/src/app/dashboard/dashboard";
import { checkIsSignedIn } from "@/src/lib/auth/checkIsSignedIn";

const Dashboard: React.FC = async () => {
    const isSignedIn = await checkIsSignedIn();
    
    if (!isSignedIn){
        redirect("/auth/signin")
    }
    else{
        return <DashboardPage />;
    }
    
}

export default Dashboard;