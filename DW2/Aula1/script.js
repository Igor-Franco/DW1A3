function Pi(raioInicial) {
    let raio = raioInicial; // Valor inicial do raio

    Object.defineProperties(this, {
        pi1: {
            value: 3.14,
            enumerable: true,
            writable: false,
            configurable: false
        },
        pi2: {
            value: 3.14159,
            enumerable: true,
            writable: false,
            configurable: false
        },
        pi3: {
            value: 3.1415926536,
            enumerable: true,
            writable: false,
            configurable: false
        },
        raio: {
            enumerable: true,
            configurable: true,
            get: function() {
                return raio;
            },
            set: function(value) {
                if (Number.isInteger(value) && value > 0) {
                    raio = value;
                } else {
                    console.log("Valor inválido");
                }
            },
        }
    });
}

Pi.prototype.calculateAreas = function() {
    return {
        areaPi1: this.pi1 * (this.raio * this.raio),
        areaPi2: this.pi2 * (this.raio * this.raio),
        areaPi3: this.pi3 * (this.raio * this.raio),
    };
}

Pi.prototype.calculatePerimetro = function() {
    return {
        perimetroPi1: this.pi1 * this.raio * 2,
        perimetroPi2: this.pi2 * this.raio * 2,
        perimetroPi3: this.pi3 * this.raio * 2,
    };
}

const PIXELS_PER_CM = 10;
let pii = new Pi(5);

const circle = document.getElementById('circle');
const raioValue = document.getElementById('raioValue');

const updateResults = () => {
    const areas = pii.calculateAreas();
    const perimetros = pii.calculatePerimetro();

    document.getElementById('areaPi1').innerText = areas.areaPi1.toFixed(10);
    document.getElementById('areaPi2').innerText = areas.areaPi2.toFixed(10);
    document.getElementById('areaPi3').innerText = areas.areaPi3.toFixed(10);
    document.getElementById('perimetroPi1').innerText = perimetros.perimetroPi1.toFixed(10);
    document.getElementById('perimetroPi2').innerText = perimetros.perimetroPi2.toFixed(10);
    document.getElementById('perimetroPi3').innerText = perimetros.perimetroPi3.toFixed(10);
}

let isDragging = false;
let initialY = 0;
let initialRadius = 50;

circle.addEventListener('mousedown', (event) => {
    isDragging = true;
    initialY = event.clientY;
    initialRadius = circle.getBoundingClientRect().height / 2;
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

window.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const deltaY = event.clientY - initialY;
        const newRadiusInPixels = initialRadius + deltaY;
        let newRadiusInCm = newRadiusInPixels / PIXELS_PER_CM;

        // Estabelecendo o valor mínimo do raio como 1 cm
        newRadiusInCm = Math.max(newRadiusInCm, 1);

        circle.style.width = `${newRadiusInCm * PIXELS_PER_CM * 2}px`;
        circle.style.height = `${newRadiusInCm * PIXELS_PER_CM * 2}px`;
        
        raioValue.innerText = newRadiusInCm.toFixed();

        pii.raio = newRadiusInCm;

        updateResults();
    }
});

// Inicialização
updateResults();
