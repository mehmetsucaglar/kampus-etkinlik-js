document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-event-form');
    const messageBox = document.getElementById('form-message');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        messageBox.innerHTML = ''; 
        
        const formData = new FormData(form);
        const eventData = Object.fromEntries(formData.entries());
        
        let errors = [];
        if (!eventData.title.trim()) errors.push('Etkinlik adı boş bırakılamaz.');
        if (!eventData.date) errors.push('Lütfen bir tarih seçin.');
        if (!eventData.category) errors.push('Kategori seçimi zorunludur.');

        if (errors.length > 0) {
            // Hatalı Gönderim
            messageBox.innerHTML = `<div class="error" style="color: red; margin-bottom: 15px;">${errors.join('<br>')}</div>`;
        } else {
            // Başarılı Gönderim
            eventData.id = 'event-' + Date.now(); 
            console.log('Oluşturulan Yeni Etkinlik Nesnesi:', eventData);
            
            messageBox.innerHTML = `<div class="success" style="color: green; margin-bottom: 15px;">Etkinlik başarıyla oluşturuldu! (Nesne konsola yazdırıldı)</div>`;
            form.reset();
        }
    });
});