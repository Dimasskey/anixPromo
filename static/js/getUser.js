function GetCookie(name) {
    const cookieArray = document.cookie.split('; ');
    for (const cookie of cookieArray) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return cookieValue;
        }
    }
    return null;
}

async function getCurrentUser () {
    let cookie = GetCookie("token");
    try {
        const response = await fetch('https://promo.tdanix.ru/api/users/me', {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'token': cookie,
            },
        });
        if (response.ok) {
            let user = await response.json();
            user = user.data
            console.log(user)
            return user
        } else {
            window.location.href = "/login";
        }
    } catch (error) {
        console.error("Произошла ошибка:", error);
    }
}