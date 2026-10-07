// js/event-detail.js
import { events } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const container = document.getElementById('event-detail-container');

    if (!container) return;

    const event = events.find(e => e.id === id);

    if (event) {
        container.innerHTML = `
            <img src="${event.image}" alt="${event.title}" style="max-width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 1.5rem;">
            <h2 style="color: #2c3e50; margin-bottom: 1rem;">${event.title}</h2>
            
            <div class="detail-info" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
                <p style="margin-bottom: 0.5rem;"><strong>📅 Tarih:</strong> ${event.date}</p>
                <p style="margin-bottom: 0.5rem;"><strong>🏷️ Kategori:</strong> ${event.category}</p>
                <p style="margin-bottom: 0;"><strong>📍 Yer:</strong> ${event.location}</p>
            </div>
            
            <p class="description" style="line-height: 1.8; color: #555; margin-bottom: 2.5rem;">${event.description}</p>
            
            <!-- Butonlar Alanı -->
            <div class="action-buttons" style="display: flex; gap: 1rem; border-top: 1px solid #eee; padding-top: 1.5rem;">
                <a href="etkinlikler.html" class="btn" style="background-color: #95a5a6;">⬅ Listeye Geri Dön</a>
                <a href="guncelle.html?id=${event.id}" class="btn" style="background-color: #f39c12;">✏️ Güncelle</a>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="error-msg" style="text-align: center; padding: 2rem;">
                <h3 style="color: #e74c3c; margin-bottom: 1rem;">Geçersiz ID</h3>
                <p style="margin-bottom: 1.5rem;">Böyle bir etkinlik bulunamadı.</p>
                <a href="etkinlikler.html" class="btn" style="background-color: #95a5a6;">Listeye Dön</a>
            </div>
        `;
    }
});