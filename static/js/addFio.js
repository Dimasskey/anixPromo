document.addEventListener('DOMContentLoaded', () => {
    const addFioWrapper = document.querySelector('.add-fio-wrapper');
    const closeAddFioElem = document.querySelector('.add-fio-head-cross');

    const openAddFio = () => {
        addFioWrapper.style.display = 'flex';
    }

    const closeAddFio = () => {
        addFioWrapper.style.display = 'none';
    }

    // Используем делегирование событий, чтобы избежать проблемы с отсутствием элемента
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('profile-avatar-add-fio')) {
            openAddFio();
        }
    });

    closeAddFioElem.addEventListener('click', closeAddFio);
});


const addFioFetch = async (event) => {
    event.preventDefault();

    try {
        const addFioValue = document.getElementById('addFio').value;
        console.log(addFioValue)

        const response = await fetch(`https://promo.tdanix.ru/api/users/me/fio?fio=${addFioValue}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': `${GetCookie("token")}`
            }
        });

        const result = await response.json()
        if (response.ok) {
            alert("ВСЕ КРУТО КЛАСС");
            window.location.reload();
        } else {
            document.querySelector(".add-fio-response").textContent = result.message;
        }
    } catch (error) {
        console.error("Ошибка:", error);
    }
};
