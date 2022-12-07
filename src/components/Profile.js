import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Stack, Typography } from "@mui/material";

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 2, md: 4 }}>
          <div>
            <img src={user.picture} alt={user.name} style={{ width: 80, height: 80 }} />
          </div>
          <div>
            <Typography variant="h4" className="fw-bold text-white">
              Bienvenido {user.nickname}
            </Typography>
            <Typography variant="h6" className="text-white">
              Bienvenido al sistema de toxicología de la Universidad de Concepción
            </Typography>
            <Typography variant="h7" className="text-black">
              Correo: {user.email}
            </Typography>
          </div>
        </Stack>
      </div>
    )
  );
};
