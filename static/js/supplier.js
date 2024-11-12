// const reviewsContainer = document.querySelector('.reviews-container');
// document.addEventListener('DOMContentLoaded', async function() {
//     const suppliers = document.querySelectorAll('.suppliers__image');
//
//     suppliers.forEach(supplier => {
//         supplier.addEventListener('click', function() {
//             const supplierId = this.getAttribute('supplier-id');
//             window.location.href = `/suppliers/?id=${supplierId}`;
//         });
//     });
//
//     const urlParams = new URLSearchParams(window.location.search);
//     const supplierId = urlParams.get('id');
//     console.log("supplierId", supplierId);
//     const supplierDescription = document.querySelector('.reviews-description__text');
//
//     if (supplierId) {
//         supplierDescription.textContent = await getSupplier(supplierId);
//         await loadReviews(supplierId);
//     }
//
//     // Скрываем индикатор загрузки после завершения загрузки всех отзывов
//     document.getElementById('onload').style.display = 'none';
// });
//
// // Функция для получения описания поставщика
// async function getSupplier(supplierId) {
//     const response = await fetch(`https://promo.tdanix.ru/api/suppliers/${supplierId}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     });
//     const data = await response.json();
//     console.log("data", data)
//     return data.data.about;
// }
//
// // Функция для загрузки отзывов
// async function loadReviews(supplierId) {
//     const response = await fetch(`https://promo.tdanix.ru/api/comments?supplier_id=${supplierId}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     });
//     const data = await response.json();
//
//     if (data.data.length > 0) {
//         const reviewPromises = data.data.map(async (review) => {
//             const response = await fetch('https://media.tdanix.ru/api/attachments/06731fa6-ba63-7323-8000-45a817590ccd', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             });
//
//             const reviewContainer = document.createElement('div');
//             reviewContainer.className = 'review-container';
//
//             const reviewProfileName = document.createElement('div');
//             reviewProfileName.className = 'review-profile-name';
//
//             const reviewProfileText = document.createElement('span');
//             reviewProfileText.className = 'review-profile-name__text';
//             reviewProfileText.textContent = review.user_fio;
//
//             const reviewTextContainer = document.createElement('div');
//             reviewTextContainer.className = 'review-text-container';
//
//             const reviewText = document.createElement('span');
//             reviewText.className = 'review-text';
//             reviewText.textContent = review.comment_text;
//
//             const reviewImageContainer = document.createElement('div');
//             reviewImageContainer.className = 'review-image-container';
//
//             const reviewImage = document.createElement('img');
//             reviewImage.className = 'review-image';
//             reviewImage.src = `${response.url}`;
//
//             // Добавляем элементы в контейнер отзыва
//             reviewProfileName.appendChild(reviewProfileText);
//             reviewTextContainer.appendChild(reviewText);
//             reviewContainer.appendChild(reviewProfileName);
//             reviewContainer.appendChild(reviewTextContainer);
//             reviewContainer.appendChild(reviewImageContainer);
//             reviewImageContainer.appendChild(reviewImage);
//
//             reviewsContainer.appendChild(reviewContainer);
//         });
//
//         // Ждем, пока все отзывы будут загружены и отрисованы
//         await Promise.all(reviewPromises);
//     } else {
//         const emptyReviews = document.createElement("div");
//         emptyReviews.className = "empty-review";
//         emptyReviews.textContent = "Отзывов еще нет...";
//         document.querySelector(".review-add-container").style.marginTop = "1vw";
//         reviewsContainer.appendChild(emptyReviews);
//     }
// }
//
// // Обработчик для добавления отзыва
// async function handleAddReview(event) {
//     event.preventDefault();
//
//     const reviewText = document.querySelector('.review-add-textarea').value;
//
//     const response = await fetch('https://promo.tdanix.ru/api/comments', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'token': GetCookie('token')
//         },
//         body: JSON.stringify({
//             supplier_id: supplierId,
//             comment_text: reviewText,
//             attachment_id: null,
//         }),
//     });
//
//     if (response.ok) {
//         alert("Отзыв успешно добавлен!");
//         window.location.reload();
//     } else {
//         console.error('Ошибка при добавлении отзыва:', await response.json());
//     }
// }
//
//
//
// // Загрузка текущего пользователя при загрузке страницы
// window.onload = async () => {
//     await getCurrentUser ();
//     document.getElementById('onload').style.display = 'none';
// };
//

const reviewsContainer = document.querySelector('.reviews-container');
const urlParams = new URLSearchParams(window.location.search);
const supplierId = urlParams.get('id');
document.addEventListener('DOMContentLoaded', async function() {
    const suppliers = document.querySelectorAll('.suppliers__image');
    const fileInputContainer = document.querySelector('.review-add-attachment');
    const fileInput = document.querySelector('.review-add-attachment-label__input');
    const previewContainer = document.querySelector('.review-add-attachment-preview');
    const previewImage = document.querySelector('.review-add-attachment-preview__image');
    const clearInput = document.querySelector('.review-add-attachment-preview__delete');


    suppliers.forEach(supplier => {
        supplier.addEventListener('click', function() {
            const supplierId = this.getAttribute('supplier-id');
            window.location.href = `/suppliers/?id=${supplierId}`;
        });
    });


    console.log("supplierId", supplierId);
    const supplierDescription = document.querySelector('.reviews-description__text');

    if (supplierId) {
        supplierDescription.textContent = await getSupplier(supplierId);
        await loadReviews(supplierId);
    }

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewContainer.style.display = 'flex';
                fileInputContainer.style.display = 'none'
            }
            reader.readAsDataURL(file);
        } else {
            previewContainer.style.display = 'none';
        }
    });

    clearInput.addEventListener('click', function(event) {
        fileInput.value = ""

        previewContainer.style.display = 'none'
        fileInputContainer.style.display = 'flex'
    })

    const reviewImages = document.querySelectorAll('.review-image');


    reviewImages.forEach(reviewImage => {
        reviewImage.addEventListener('click', function() {
            const reviewImageFullScreenWrapper = document.createElement('div');
            reviewImageFullScreenWrapper.className = 'review-image-full-screen-wrapper';
            const reviewImageFullScreenContainer = document.createElement('div');
            reviewImageFullScreenContainer.className = 'review-image-full-screen-container';
            const reviewImageFullScreen = document.createElement('img');
            reviewImageFullScreen.className = 'review-image-full-screen';
            reviewImageFullScreen.src = reviewImage.src

            reviewImageFullScreenWrapper.appendChild(reviewImageFullScreenContainer);
            reviewImageFullScreenContainer.appendChild(reviewImageFullScreen);

            document.body.appendChild(reviewImageFullScreenWrapper);

            reviewImageFullScreenWrapper.addEventListener('click', function(event) {
                if (event.target === reviewImageFullScreenWrapper) {
                    document.body.removeChild(reviewImageFullScreenWrapper);
                }
            });
        });
    });
    document.getElementById('onload').style.display = 'none';
});


async function getSupplier(supplierId) {
    const response = await fetch(`https://promo.tdanix.ru/api/suppliers/${supplierId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    console.log("data", data)
    return data.data.about;
}


async function loadReviews(supplierId) {
    const response = await fetch(`https://promo.tdanix.ru/api/comments?supplier_id=${supplierId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    console.log(data.data)

    if (data.data.length > 0) {
        const reviewPromises = data.data.map(async (review) => {
            console.log("review", review)
            const response = await fetch(`https://media.tdanix.ru/api/attachments/${review.attachment_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const reviewContainer = document.createElement('div');
            reviewContainer.className = 'review-container';

            const reviewProfileName = document.createElement('div');
            reviewProfileName.className = 'review-profile-name';

            const reviewProfileText = document.createElement('span');
            reviewProfileText.className = 'review-profile-name__text';
            reviewProfileText.textContent = review.user_fio;

            const reviewTextContainer = document.createElement('div');
            reviewTextContainer.className = 'review-text-container';

            const reviewText = document.createElement('span');
            reviewText.className = 'review-text';
            reviewText.textContent = review.comment_text;

            const reviewImageContainer = document.createElement('div');
            reviewImageContainer.className = 'review-image-container';

            const reviewImage = document.createElement('img');
            reviewImage.className = 'review-image';
            reviewImage.src = `${response.url}`;
            reviewImage.loading = "lazy"

            reviewProfileName.appendChild(reviewProfileText);
            reviewTextContainer.appendChild(reviewText);
            reviewContainer.appendChild(reviewProfileName);
            reviewContainer.appendChild(reviewTextContainer);
            reviewContainer.appendChild(reviewImageContainer);
            reviewImageContainer.appendChild(reviewImage);

            reviewsContainer.appendChild(reviewContainer);

        });


        await Promise.all(reviewPromises);
    } else {
        const emptyReviews = document.createElement("div");
        emptyReviews.className = "empty-review";
        emptyReviews.textContent = "Отзывов еще нет...";
        document.querySelector(".review-add-container").style.marginTop = "1vw";
        reviewsContainer.appendChild(emptyReviews);
    }
}



let imageId = null;

async function handleAddReview(event) {
    event.preventDefault();

    if (imageId === null) {
        imageId = "00000000-0000-0000-0000-000000000000";
    }
    const reviewText = document.querySelector('.review-add-textarea').value;

    const response = await fetch('https://promo.tdanix.ru/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': GetCookie('token')
        },
        body: JSON.stringify({
            supplier_id: supplierId,
            comment_text: reviewText,
            attachment_id: imageId,
        }),
    });

    if (response.ok) {
        alert("Отзыв успешно добавлен!");
        window.location.reload();
    } else {
        console.error('Ошибка при добавлении отзыва:', await response.json());
    }
}

const uploadImage = async (e) => {
    const submitButton = document.querySelector(".review-add-submit__button")
    let file = e.target.files[0];
    console.log(file);

    const formData = new FormData();
    formData.append('file', file);
    console.log("formData", formData);

    const response = await fetch('https://media.tdanix.ru/api/attachments', {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data);
        imageId = data.data.id;
    } else {
        console.error('Ошибка при загрузке изображения:', await response.json());
    }
}

document.querySelector('.review-add-attachment-label__input').addEventListener('change', async (event) => {
    await uploadImage(event);
});



