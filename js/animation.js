document.addEventListener("DOMContentLoaded", () => {
    const title = document.querySelector('.animated-title');
    const text = title.textContent;
    title.textContent = '';

    const spans = [...text].map((char) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        span.style.opacity = 0;
        span.style.transform = 'translateY(20px)';
        title.appendChild(span);
        return span;
    });

    const animate = () => {
        // Reset animáció először
        spans.forEach(span => {
            span.style.opacity = 0;
            span.style.transform = 'translateY(20px)';
            span.style.animation = 'none';
        });

        // Kényszerített újrafestés (újraindításhoz)
        void title.offsetWidth;

        // 1. Első betű fixen
        spans[0].style.animation = 'fadeInUp 0.5s forwards';
        spans[0].style.animationDelay = '0s';

        // 2. A többi betű indexeit összekeverjük
        const otherIndexes = spans.map((_, i) => i).slice(1).sort(() => Math.random() - 0.5);

        // 3. Animáció random sorrendben, de fix lépésekben
        otherIndexes.forEach((i, order) => {
            spans[i].style.animation = 'fadeInUp 0.5s forwards';
            spans[i].style.animationDelay = `${(order + 1) * 0.1}s`; // +1 hogy ne kezdjen 0-val
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(title);
});