// Gestion des onglets
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons et contenus
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Ajouter la classe active au bouton cliqué et au contenu correspondant
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Bouton Home
document.getElementById('homeIcon').addEventListener('click', function() {
    // Retirer la classe active de tous les boutons et contenus
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Activer l'accueil
    document.getElementById('accueil').classList.add('active');
});

// Bouton d'infos
document.getElementById('infoBtn').addEventListener('click', function() {
    alert('Pour plus d\'aide, contactez-nous à admin@exemple.com ou visitez notre section FAQ.');
});