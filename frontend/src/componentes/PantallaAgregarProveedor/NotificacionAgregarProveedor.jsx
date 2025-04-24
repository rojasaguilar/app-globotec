import React, { useEffect, useState } from 'react';
import { Stack, Alert } from '@mui/material';

function NotificacionAgregarProveedor({ showSuccess, showError, onCloseSuccess, onCloseError }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let timeoutFade, timeoutClose;

    if (showSuccess || showError) {
      setFadeOut(false);
      timeoutFade = setTimeout(() => {
        setFadeOut(true);
      }, 5000); // empieza a desaparecer 5 seg

      timeoutClose = setTimeout(() => {
        if (showSuccess && onCloseSuccess) onCloseSuccess();
        if (showError && onCloseError) onCloseError();
      }, 6500); // desaparece 6.5 seg
    }

    return () => {
      clearTimeout(timeoutFade);
      clearTimeout(timeoutClose);
    };
  }, [showSuccess, showError, onCloseSuccess, onCloseError]);

  const alertStyle = {
    transition: 'opacity 1s ease-in-out',
    opacity: fadeOut ? 0 : 1,
  };

  return (
    <Stack spacing={2}>
      {showSuccess && (
        <Alert style={alertStyle} variant="filled" severity="success">
          Proveedor agregado exitosamente.
        </Alert>
      )}
      {showError && (
        <Alert style={alertStyle} variant="filled" severity="error">
          Ocurrió un error al agregar el proveedor.
        </Alert>
      )}
    </Stack>
  );
}

export default NotificacionAgregarProveedor;
