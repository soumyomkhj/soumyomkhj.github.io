// Education cards navigation module
const Education = {
    init() {
        const eduSection = document.querySelector('.edu');
        if (!eduSection) return;

        const cards = eduSection.querySelectorAll('.educard');
        const prevBtn = eduSection.querySelector('.edu-prev');
        const nextBtn = eduSection.querySelector('.edu-next');
        let currentIndex = 0;

        function showCard(index) {
            cards.forEach((card, i) => {
                if (i === index) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
            updateButtons();
        }

        function updateButtons() {
            if (prevBtn) {
                prevBtn.disabled = currentIndex === 0;
            }
            if (nextBtn) {
                nextBtn.disabled = currentIndex === cards.length - 1;
            }
        }

        function nextCard() {
            if (currentIndex < cards.length - 1) {
                currentIndex++;
                showCard(currentIndex);
                eduSection.classList.add('user-controlled');
            }
        }

        function prevCard() {
            if (currentIndex > 0) {
                currentIndex--;
                showCard(currentIndex);
                eduSection.classList.add('user-controlled');
            }
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', prevCard);
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', nextCard);
        }

        if (cards.length > 0) {
            showCard(0);
        }

        let autoPlayInterval = setInterval(() => {
            if (!eduSection.classList.contains('user-controlled')) {
                if (currentIndex < cards.length - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0; // loop back
                }
                showCard(currentIndex);
            }
        }, 10000); // 10 seconds
    }
};
