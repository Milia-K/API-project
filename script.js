const category=document.querySelector('#category')
const input=document.querySelector('#quantity')
const btn=document.querySelector('#btn')
const result=document.querySelector('#result')
const result_error=document.querySelector('#result_error')
const btn_delete=document.querySelector('#btn_delete')

category.addEventListener('change', function () {
    const value = category.value;
    const quantity=input.value;
    if (value) {
        Find(value, quantity);
    } else {
    result.innerHTML = '';
    }
});


function Find(categoryValue, quantity) {
    if (!quantity || parseInt(quantity) === 0) {
        result_error.innerHTML = 'Ошибка: Количество должно быть больше 0';
        result.innerHTML = '';
        return;
    }

    fetch(`https://swapi.dev/api/${categoryValue}/`)
    .then((response) => response.json())
    .then((data) => {
        const results = data.results.slice(0, parseInt(quantity));
        let output = '';

        try {
            results.forEach((item) => {
                if (categoryValue === 'films') {
                    output += `<p>${item.title}</p>`;
                } else {
                    output += `<p>${item.name || item.title}</p>`;
                }
            });
            result.innerHTML = output;
            result_error.innerHTML = '';
        } catch (error) {
            console.error('Ошибка:', error);
            result_error.innerHTML = `Ошибка: ${error}`;
            result.innerHTML = '';
        }
    })

    .catch((error) => {
        console.error('Ошибка:', error);
        result_error.innerHTML = `Ошибка: ${error}`;
        result.innerHTML = '';
    });
}

btn.addEventListener("click", () => {
    const value = category.value;
    const quantity=input.value || 0;
    Find(value, quantity);
});

btn_delete.addEventListener("click", () => {
    resetData();
});

function resetData() {
    input.value = '';
    category.value = '';
    result.innerHTML = '';
    result_error.innerHTML = '';
}