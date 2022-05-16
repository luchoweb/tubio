export const translateFirebaseErrors = (error) => {
  const firebaseErrors = {
    'auth/wrong-password' : 'Contraseña incorrecta',
    'auth/user-not-found' : 'El e-mail ingreso no ha sido registrado',
    'auth/too-many-requests' : 'Limite de intentos fallidos. La cuenta ha sido bloqueada temporalmente, por favor intente en unos minutos',
    'auth/email-already-in-use' : 'El e-mail ingresado ya ha sido registrado'
  }
  console.log(error);

  const errMsg = {
    message: firebaseErrors[error.code]
  };

  return errMsg;
}