import { SignOutButton } from "@/src/components/sign-out-button"

export const DashboardPage: React.FC = () =>{
    return <div className="dashboard-page">
        <h2>Dashboard</h2>
        <div className="dashboard-card">
           <SignOutButton className="signout-button"/> 
        </div>
        
        </div>
}