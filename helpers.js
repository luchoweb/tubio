export const translateFirebaseErrors = (error) => {
  const firebaseErrors = {
    'auth/wrong-password' : 'Contraseña incorrecta',
    'auth/user-not-found' : 'El e-mail ingresado no ha sido registrado',
    'auth/too-many-requests' : 'Limite de intentos fallidos. La cuenta ha sido bloqueada temporalmente, por favor intente en unos minutos',
    'auth/email-already-in-use' : 'El e-mail ingresado ya ha sido registrado',
    'auth/account-exists-with-different-credential' : 'Ya existe una cuenta con el e-mail asociado'
  }

  const errMsg = {
    message: firebaseErrors[error.code]
  };

  return errMsg;
}

export const arrayIcons = ["twitter", "facebook", "youtube", "instagram", "tiktok", "whatsapp", "spotify", "linkedin-square", "apple", "windows", "android", "snapchat", "google", "twitch", "github", "gitlab", "code", "glass", "music", "wifi", "search", "heart", "star", "user", "check", "remove", "thumbs-down", "thumbs-up", "power-off", "gear", "home", "clock", "road", "refresh", "lock", "flag", "headphones", "volume-up", "qrcode", "barcode", "tag", "book", "print", "camera", "list", "video-camera", "stack-overflow", "image", "pencil", "map-marker", "share-square", "check-square-o", "play", "pause", "chevron-left", "chevron-right", "check-circle", "question-circle", "info-circle", "crosshairs", "ban", "mail-forward", "gift", "eye", "warning", "calendar", "shopping-cart", "camera-retro", "gears", "thumbs-o-up", "sign-out", "external-link", "sign-in", "trophy", "phone", "bullhorn", "hand-o-right", "globe", "wrench", "briefcase", "users", "link", "cut", "save", "list-ul", "truck", "envelope", "dashboard", "flash", "umbrella", "stethoscope", "coffee", "cutlery", "building-o", "hospital-o", "ambulance", "beer", "desktop", "laptop", "tablet", "gamepad", "question", "microphone", "fire-extinguisher", "rocket", "ticket", "linux", "female", "male", "vk", "wordpress", "bank", "graduation-cap", "language", "fax", "paw", "steam-square", "recycle", "taxi", "soundcloud", "support", "send", "share-alt", "futbol-o", "plug", "twitch", "calculator", "paypal", "cc-visa", "cc-mastercard", "cc-discover", "cc-amex", "cc-paypal", "cc-stripe", "cc-diners-club", "trash", "copyright", "at", "paint-brush", "birthday-cake", "area-chart", "pie-chart", "line-chart", "bicycle", "bus", "diamond", "user-secret", "motorcycle", "heartbeat", "venus", "mars", "mercury", "intersex", "transgender-alt", "venus-double", "mars-double", "venus-mars", "mars-stroke", "mars-stroke-v", "mars-stroke-h", "user-plus", "user-times", "subway", "mouse-pointer", "balance-scale", "hourglass", "trademark", "registered", "creative-commons", "tripadvisor", "safari", "chrome", "firefox", "opera", "internet-explorer", "amazon", "industry", "map-signs", "commenting", "reddit-alien", "credit-card", "fort-awesome", "usb", "shopping-bag", "shopping-basket", "percent", "envira", "wheelchair-alt", "blind", "volume-control-phone", "fa", "address-book", "vcard", "user-circle", "shower", "bath", "snowflake"];

export const epaycoStatusColor = (response) => {
  const status = {
    "Aceptada": "success",
    "Pendiente": "warning",
    "Rechazada": "danger",
    "Cancelada": "danger",
    "Fallida": "danger",
    "Abandonada": "secondary"
  }

  return status[response];
}

export const faqs = [
  {
    question: '¿Qué es una cuenta y qué es un perfil?',
    answer: 'La cuenta es la que creas cuando te registras en la plataforma, sea usando un correo o Facebook, esta información es privada. El perfil es el que creas después de haberte registrado y contiene la información pública de tu negocio o marca.'
  },
  {
    question: '¿Cuántos enlaces puedo agregar a un perfil?',
    answer: 'Hay un límite de 10 enlaces tanto para perfiles gratis como pagos. Hicimos pruebas de diseño y experiencia de usuario y más de 10 enlaces no soluciuona el problema que queremos eliminar con TuBio.'
  },
  {
    question: '¿Puedo crear más de 1 perfil con una misma cuenta?',
    answer: 'Por el momento no es posible, esperamos implementar perfiles adicionales pagos muy pronto. Relax, será un precio muy bajito.'
  },
  {
    question: '¿Está segura mi información?',
    answer: 'Claro que si. En TuBio la única información sensible que almacenamos es el correo y contraseña con el cual creas tu cuenta. Esa información reposa en servidores seguros de Google y no es pública. Recuerda que la información que si almacenamos es la de tus perfiles, la cual es 100% pública.'
  },
  {
    question: '¿En que paises funcionan?',
    answer: 'De momento no tenemos restricción en ningún lugar del mundo, así que podrás crear tu cuenta desde donde estés.'
  },
  {
    question: '¿Puedo eliminar mi cuenta?',
    answer: 'Si, pero no tenemos una forma automática por seguridad. Cuando desees irte totalmente de TuBio (que esperamos que no), por favor envía un correo a tubio.link@gmail.com solicitando la eliminación total de tu información y en máximo 24 horas hábiles será eliminada.'
  }
];
