async function handleRegistration(event) {
    event.preventDefault();

    const fio = document.getElementById('fio').value;
    const number = document.getElementById('regNumber').value;

    console.log(fio, number);

    const response = await fetch('https://promo.tdanix.ru/api/signup', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fio: fio,
            phone_number: number
        }),
    });
    const result = await response.json();
    if (response.ok) {
        document.cookie = `token=${result.data.token}; max-age=7257600;`;
        window.location.href = "/";
    }
}

async function handleLogin(event) {
    event.preventDefault();

    const number = document.getElementById('logNumber').value;

    const response = await fetch('https://promo.tdanix.ru/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phone_number: number
        }),
    });

    const result = await response.json();
    if (response.ok) {
        document.cookie = `token=${result.data.token}; max-age=7257600;`;
        window.location.href = "/";
    }
    console.log(result)
}

[].forEach.call( document.querySelectorAll('.tel'), function(input) {
    let keyCode;

    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        const pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        let matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function (a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i !== -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        let reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function (a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

});