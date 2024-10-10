export const AdminPage: React.FC = () => {
    return (
      <div className="admin-page">
        <h2>Page Admin </h2>
        <p>Cette page est accessible uniquement aux utilisateurs ayant le rôle ADMIN.</p>
        <a href="/dashboard">retour à Dashboard</a>
      </div>
    );
  };