document.getElementById('psyCzyKoty').addEventListener('submit', function(event) {
    event.preventDefault();
    const wybierz = document.querySelector('input[name="wybierz"]:checked').value;
    const divWynik = document.getElementById('wynik');
    const divZdjecie = document.getElementById('zdjecie');
    const divPrzyciski = document.getElementById('przyciski');
    divZdjecie.innerHTML = '';
    divPrzyciski.innerHTML = ''; 

    let zdjecia = [];
    let aktualneZdjecie = 0;

    function pokazZdjecie(i) {
        divZdjecie.innerHTML = `<img src="${zdjecia[i]}" alt="Zdjęcie">`;
    }

    function ustawPrzyciski() {
        divPrzyciski.innerHTML = `
            <button id="wstecz" ${aktualneZdjecie === 0 ? 'disabled' : ''}><</button>
            <button id="nastepny" ${aktualneZdjecie === zdjecia.length - 1 ? 'disabled' : ''}> > </button>
        `;

        document.getElementById('wstecz').addEventListener('click', function() {
            if (aktualneZdjecie > 0) {
                aktualneZdjecie--;
                pokazZdjecie(aktualneZdjecie);
                ustawPrzyciski();
            }
        });

        document.getElementById('nastepny').addEventListener('click', function() {
            if (aktualneZdjecie < zdjecia.length - 1) {
                aktualneZdjecie++;
                pokazZdjecie(aktualneZdjecie);
                ustawPrzyciski();
            }
        });
    }

    if (wybierz === 'koty') {
        divWynik.innerHTML = '<p>Kliknj w przyciski aby zobaczyć inne zdjęcia!</p>';
        fetch('https://api.thecatapi.com/v1/images/search?limit=10')
            .then(res => res.json())
            .then(data => {
                zdjecia = data.map(item => item.url);
                if (zdjecia.length > 0) {
                    pokazZdjecie(aktualneZdjecie);
                    ustawPrzyciski();
                }
            });
    } else if (wybierz === 'psy') {
        divWynik.innerHTML = '<p>Kliknj w przyciski aby zobaczyć inne zdjęcia!</p>';
        const fetchDogImages = () => {
            return fetch('https://dog.ceo/api/breeds/image/random')
                .then(res => res.json())
                .then(data => data.message);
        };
        const promises = [];
        for (let i = 0; i < 10; i++) {
            promises.push(fetchDogImages());
        }
        Promise.all(promises)
            .then(urls => {
                zdjecia = urls;
                if (zdjecia.length > 0) {
                    pokazZdjecie(aktualneZdjecie);
                    ustawPrzyciski();
                }
            });
    }
});