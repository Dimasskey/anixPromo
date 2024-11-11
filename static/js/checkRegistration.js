const checkRegWrapper = document.querySelector('.registration-check-wrapper')
const closeCheckRegElem = document.querySelector('.registration-check-head-cross')
const openCheckRegElem = document.querySelector('.check-registration-button')

const openCheckReg = () => {
    checkRegWrapper.style.display = 'flex'
}

const closeCheckReg = async () => {
    checkRegWrapper.style.display = 'none'
    const user = await getCurrentUser();
    updateDOM(user)
}

openCheckRegElem.addEventListener('click', openCheckReg)
closeCheckRegElem.addEventListener('click', closeCheckReg)


const handleRegCheck = async (event) => {
    event.preventDefault();

    try {
        const user = await getCurrentUser ();
        const userPhone = user.phone_number;

        if (!userPhone) {
            console.error("Номер телефона не найден");
            return;
        }

        const checkNumber = document.getElementById('numberCheck').value;
        console.log(userPhone);

        const response = await fetch('https://promo.tdanix.ru/api/add_code_web', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                checks: [
                    {
                        code: `${checkNumber}`,
                        scode: null,
                        sname: null,
                        phone: `${userPhone}`
                    }
                ],
                sender_type: "web"
            }),
        });

        if (response.ok) {
            alert("ВСЕ КРУТО КЛАСС");
            console.log(await response.json());
        } else {
            console.error("Ошибка при отправке данных:", response.statusText);
        }
    } catch (error) {
        console.error("Ошибка:", error);
    }
};