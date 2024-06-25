/**
 * Plugin de Inclinação 3D para Elementos HTML
 * Criado por Daniel Estevão Martins Mendes
 * 
 * Este plugin adiciona um efeito de inclinação 3D responsivo
 * a um elemento HTML específico quando o mouse se move sobre ele.
 * 
 * @param {HTMLElement} element O elemento HTML alvo onde o efeito será aplicado.
 * @param {number} maxRotate Máxima inclinação em graus (padrão: 50).
 * @param {number} sensitivity Sensibilidade do movimento (padrão: 0.2).
 */
function addTiltEffect(element, maxRotate = 50, sensitivity = 0.2) {
    element.addEventListener('mousemove', e => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const distanceX = mouseX - centerX;
        const distanceY = mouseY - centerY;

        const percentX = distanceX / (rect.width / 2);
        const percentY = distanceY / (rect.height / 2);

        const rotateX = -maxRotate * percentY * sensitivity;
        const rotateY = maxRotate * percentX * sensitivity;

        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
}


const cardContent = document.querySelector('.card-content');
addTiltEffect(cardContent,100);
