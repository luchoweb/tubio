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

export const arrayIcons = ["question", "glass", "music", "search", "heart", "star", "user", "check", "remove", "power-off", "gear", "home", "clock", "road", "refresh", "lock", "flag", "headphones", "volume-up", "qrcode", "barcode", "tag", "book", "print", "camera", "list", "video-camera", "image", "pencil", "map-marker", "share-square", "check-square-o", "play", "pause", "chevron-left", "chevron-right", "check-circle", "question-circle", "info-circle", "crosshairs", "ban", "mail-forward", "gift", "eye", "warning", "calendar", "shopping-cart", "camera-retro", "gears", "thumbs-o-up", "sign-out", "linkedin-square", "external-link", "sign-in", "trophy", "phone", "twitter", "facebook",  "github", "bullhorn", "hand-o-right", "globe", "wrench", "briefcase", "users", "link", "cut", "save", "list-ul", "truck", "envelope", "dashboard", "flash", "umbrella", "stethoscope", "coffee", "cutlery", "building-o", "hospital-o", "ambulance", "beer", "desktop", "laptop", "tablet", "gamepad", "code", "microphone", "fire-extinguisher", "rocket", "ticket", "youtube", "instagram", "apple", "windows", "android", "linux", "female", "male", "vk", "wordpress", "bank", "graduation-cap", "google", "language", "fax", "paw", "steam-square", "recycle", "taxi", "spotify", "soundcloud", "support", "send", "share-alt", "futbol-o", "plug", "twitch", "calculator", "paypal", "cc-visa", "cc-mastercard", "cc-discover", "cc-amex", "cc-paypal", "cc-stripe", "trash", "copyright", "at", "paint-brush", "birthday-cake", "area-chart", "pie-chart", "line-chart", "bicycle", "bus", "diamond", "user-secret", "motorcycle", "heartbeat", "venus", "mars", "mercury", "intersex", "transgender-alt", "venus-double", "mars-double", "venus-mars", "mars-stroke", "mars-stroke-v", "mars-stroke-h", "whatsapp", "user-plus", "user-times", "subway", "mouse-pointer", "balance-scale", "hourglass", "trademark", "registered", "creative-commons", "tripadvisor", "safari", "chrome", "firefox", "opera", "internet-explorer", "amazon", "industry", "map-signs", "commenting", "reddit-alien", "credit-card", "fort-awesome", "usb", "shopping-bag", "shopping-basket", "percent", "gitlab", "envira", "wheelchair-alt", "blind", "volume-control-phone", "snapchat", "fa", "address-book", "vcard", "user-circle", "shower", "bath", "snowflake"];

export const epaycoStatusColor = (response) => {
  const status = {
    "Aceptada": "success",
    "Pendiente": "warning",
    "Rechazada": "danger",
    "Cancelada": "danger",
    "Abandonada": "secondary"
  }

  return status[response];
}
