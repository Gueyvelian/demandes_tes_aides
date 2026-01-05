// Gestion des onglets
let currentTab = 'accueil';
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.style.display = 'none');
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).style.display = 'block';
        currentTab = tabId;
    });
});

// Bouton Home
document.getElementById('homeIcon').addEventListener('click', function() {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.style.display = 'none');
    document.getElementById('accueil').style.display = 'block';
    currentTab = 'accueil';
});

// Gestion des sous-catégories
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('sub-button')) {
        const text = e.target.getAttribute('data-text');
        const title = e.target.textContent.trim();
        const subContent = document.querySelector('#sub-page .sub-content');
        subContent.innerHTML = '<p>' + text + '</p>';
        document.getElementById('sub-title').textContent = title;
        tabContents.forEach(content => content.style.display = 'none');
        document.getElementById('sub-page').style.display = 'block';
    }
});

// Bouton Retour
document.getElementById('backBtn').addEventListener('click', () => {
    document.getElementById('sub-page').style.display = 'none';
    document.getElementById(currentTab).style.display = 'block';
});

// Initial display
document.getElementById('accueil').style.display = 'block';

// Bouton d'infos
document.getElementById('infoBtn').addEventListener('click', function() {
    alert('Pour plus d\'aide, contactez-nous à admin@exemple.com ou visitez notre section FAQ.');
});