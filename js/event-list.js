import { events } from './data.js';

export function renderEvents(containerId, limit = null, searchTerm = '', category = '') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ''; // HTML'i boşalt (Adım 3)
    
    let filteredEvents = events.filter(event => {
        const matchSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCategory = category ? event.category === category : true;
        return matchSearch && matchCategory;
    });

    if (limit) {
        filteredEvents = filteredEvents.slice(0, limit);
    }

    if(filteredEvents.length === 0) {
         container.innerHTML = '<p>Aradığınız kritere uygun etkinlik bulunamadı.</p>';
         return;
    }

    filteredEvents.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <div class="card-content">
                <h3>${event.title}</h3>
                <p>📅 ${event.date} | 🏷️ ${event.category}</p>
                <a href="detay.html?id=${event.id}" class="btn">Detayları Gör</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// Sayfa yüklendiğinde çalışacak olaylar
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    
    // Ana sayfadaysak sadece 2 etkinlik göster (Adım 5)
    if (path.includes('index.html') || path === '/' || path.endsWith('/')) {
        renderEvents('upcoming-events-container', 2);
    } 
    // Tüm etkinlikler sayfasındaysak filtreleri çalıştır
    else if (path.includes('etkinlikler.html')) {
        renderEvents('all-events-container');
        
        const searchInput = document.getElementById('searchInput');
        const categorySelect = document.getElementById('categorySelect');
        
        const filterEvents = () => {
            renderEvents('all-events-container', null, searchInput.value, categorySelect.value);
        };

        if(searchInput) searchInput.addEventListener('input', filterEvents);
        if(categorySelect) categorySelect.addEventListener('change', filterEvents);
    }
});