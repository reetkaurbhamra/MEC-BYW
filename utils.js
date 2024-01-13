function setCookie(name, value, expires = "Fri, 31 Dec 9999 23:59:59 GMT") {
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function removeCookie(name) {
  document.cookie = `${name}=; Max-Age=0; path=/`;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) return parts.pop().split(";").shift();
}
