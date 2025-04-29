import React, { useEffect, useState } from 'react';
import { Stack, Alert } from '@mui/material';

function NotificacionAgregarCliente({showError, onCloseError }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let timeoutFade, timeoutClose;

    if (showError) {
      setFadeOut(false);
      timeoutFade = setTimeout(() => {
        setFadeOut(true);
      }, 5000); // empieza a desaparecer 5 seg

      timeoutClose = setTimeout(() => {
        if (showError && onCloseError) onCloseError();
      }, 6500); // desaparece 6.5 seg
    }

    return () => {
      clearTimeout(timeoutFade);
      clearTimeout(timeoutClose);
    };
  }, [showError, onCloseError]);

  const alertStyle = {
    transition: 'opacity 1s ease-in-out',
    opacity: fadeOut ? 0 : 1,
  };

  return (
    <Stack spacing={2}>
      {showError && (
        <Alert style={alertStyle} variant="filled" severity="error">
          Ocurrió un error al agregar el cliente.
        </Alert>
      )}
    </Stack>
  );
}

export default NotificacionAgregarCliente;