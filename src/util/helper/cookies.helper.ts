type TCookieData = {
  [key: string]: string | undefined;
};

export function addCookies(data: TCookieData) {
  for (let key in data) {
    document.cookie = `${key}=${data[key]}`;
  }
}

export function getCookies() {
  const keyValue = document.cookie.split(';');
  const cookies: TCookieData = {};

  keyValue.forEach(item => {
    const key = item.trim().split('=')[0];
    const value = item.trim().split('=')[1];

    cookies[key] = value;
  });

  return cookies;
}
