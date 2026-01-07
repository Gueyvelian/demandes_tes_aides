// Gestion des onglets
let currentTab = 'accueil';
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

function initializeTabs() {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => switchTab(button));
    });
}

function switchTab(button) {
    if (button.classList.contains('premium-only') && button.classList.contains('disabled')) {
        alert('Cette section est réservée aux utilisateurs Premium. Abonnez-vous pour y accéder.');
        return;
    }
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.style.display = 'none');
    button.classList.add('active');
    const tabId = button.getAttribute('data-tab');
    document.getElementById(tabId).style.display = 'block';
    currentTab = tabId;
}

initializeTabs();

// Bouton Home
document.getElementById('homeIcon').addEventListener('click', goHome);

function goHome() {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.style.display = 'none');
    document.getElementById('accueil').style.display = 'block';
    currentTab = 'accueil';
}

// Gestion des sous-catégories
document.addEventListener('click', handleSubButtonClick);

function handleSubButtonClick(e) {
    if (e.target.classList.contains('sub-button')) {
        showSubPage(e.target);
    }
}

function showSubPage(button) {
    const text = button.getAttribute('data-text');
    const title = button.textContent.trim();
    const subContent = document.querySelector('#sub-page .sub-content');
    subContent.innerHTML = '<p>' + text + '</p>';
    document.getElementById('sub-title').textContent = title;
    tabContents.forEach(content => content.style.display = 'none');
    document.getElementById('sub-page').style.display = 'block';
}

// Bouton Retour
document.getElementById('backBtn').addEventListener('click', goBack);

function goBack() {
    document.getElementById('sub-page').style.display = 'none';
    document.getElementById(currentTab).style.display = 'block';
}

// Initial display
document.getElementById('accueil').style.display = 'block';

// Initialiser les onglets premium comme désactivés
const premiumTabs = document.querySelectorAll('.premium-only');
premiumTabs.forEach(tab => tab.classList.add('disabled'));

// Bouton d'infos
document.getElementById('infoBtn').addEventListener('click', showInfo);

function showInfo() {
    alert('Pour plus d\'aide, contactez-nous à admin@exemple.com ou visitez notre section FAQ.');
}

// Gestion de la fonctionnalité "Poser une question"
let currentUser = null;

function showAuthSection() {
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('question-section').style.display = 'none';
}

function showQuestionSection(user) {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('question-section').style.display = 'block';
    document.getElementById('user-display').textContent = currentUser;
    updatePremiumStatus(user);
}

function updatePremiumStatus(user) {
    const premiumActive = isPremiumActive(user);
    const premiumStatus = document.getElementById('premium-status');
    const monthlyBtn = document.getElementById('premium-monthly-btn');
    const annualBtn = document.getElementById('premium-annual-btn');
    const questionForm = document.getElementById('question-form');
    const paymentPrompt = document.getElementById('payment-prompt');

    // Mettre à jour les onglets premium
    const premiumTabs = document.querySelectorAll('.premium-only');
    premiumTabs.forEach(tab => {
        if (premiumActive) {
            tab.classList.remove('disabled');
        } else {
            tab.classList.add('disabled');
        }
    });

    // Gérer les pubs
    const ads = document.querySelectorAll('.ad-left, .ad-right');
    const premiumAd = document.getElementById('premium-ad');
    if (premiumActive) {
        ads.forEach(ad => ad.style.display = 'none');
        premiumAd.style.display = 'none';
    } else {
        ads.forEach(ad => ad.style.display = 'block');
        premiumAd.style.display = 'block';
    }

    if (premiumActive) {
        premiumStatus.textContent = `Vous êtes Premium ${user.premium_type} (actif jusqu'au ${new Date(user.premium_expiry).toLocaleDateString()}).`;
        monthlyBtn.style.display = 'none';
        annualBtn.style.display = 'none';
        questionForm.style.display = 'block';
        paymentPrompt.style.display = 'none';
    } else {
        if (user.premium) {
            premiumStatus.textContent = 'Votre Premium a expiré. Renouvelez-le.';
        } else {
            premiumStatus.textContent = 'Vous n\'êtes pas Premium.';
        }
        monthlyBtn.style.display = 'inline-block';
        annualBtn.style.display = 'inline-block';
        if (user.questions_asked >= 2) {
            questionForm.style.display = 'none';
            paymentPrompt.style.display = 'block';
        } else {
            questionForm.style.display = 'block';
            paymentPrompt.style.display = 'none';
        }
    }
}

function isPremiumActive(user) {
    if (!user.premium || !user.premium_expiry) return false;
    const now = new Date();
    const expiry = new Date(user.premium_expiry);
    return now < expiry;
}

async function checkPaymentStatus() {
    // Assuming we have user data, but since we don't fetch it every time, perhaps store in session
    // For simplicity, assume after login we have the data
    // But to check, we can fetch user data or just proceed
    // For now, the submit will handle it
}

// Register form
document.getElementById('register-form').addEventListener('submit', handleRegister);

async function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Compte créé avec succès. Vous pouvez maintenant vous connecter.');
            document.getElementById('register-form').reset();
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Erreur de connexion');
    }
}

// Login form
document.getElementById('login-form').addEventListener('submit', handleLogin);

async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok) {
            currentUser = username;
            showQuestionSection(data.user);
            document.getElementById('login-form').reset();
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Erreur de connexion');
    }
}

// Question form
document.getElementById('question-form').addEventListener('submit', handleQuestionSubmit);

async function handleQuestionSubmit(e) {
    e.preventDefault();
    const question = document.getElementById('question-text').value;
    try {
        const response = await fetch('/question', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: currentUser, question })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Question envoyée avec succès.');
            document.getElementById('question-text').value = '';
        } else if (response.status === 403) {
            document.getElementById('question-form').style.display = 'none';
            document.getElementById('payment-prompt').style.display = 'block';
            alert(data.error);
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Erreur de connexion');
    }
}

// Pay button
document.getElementById('pay-btn').addEventListener('click', async function() {
    try {
        const response = await fetch('/pay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: currentUser })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Paiement effectué. Vous pouvez maintenant poser des questions.');
            document.getElementById('question-form').style.display = 'block';
            document.getElementById('payment-prompt').style.display = 'none';
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Erreur de connexion');
    }
});

// Pay for question button
document.getElementById('pay-question-btn').addEventListener('click', async function() {
    try {
        const response = await fetch('/pay-question', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: currentUser })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Paiement effectué. Vous pouvez poser une question.');
            document.getElementById('question-form').style.display = 'block';
            document.getElementById('payment-prompt').style.display = 'none';
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Erreur de connexion');
    }
});

// Premium monthly button
document.getElementById('premium-monthly-btn').addEventListener('click', async function() {
    await subscribePremium('monthly');
});

// Premium annual button
document.getElementById('premium-annual-btn').addEventListener('click', async function() {
    await subscribePremium('annual');
});

async function subscribePremium(type) {
    try {
        const response = await fetch('/premium', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: currentUser, type })
        });
        const data = await response.json();
        if (response.ok) {
            alert(`Vous êtes maintenant Premium ${type === 'annual' ? 'annuel' : 'mensuel'} !`);
            location.reload(); // Refresh to update status
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('Erreur de connexion');
    }
}

// Logout button
document.getElementById('logout-btn').addEventListener('click', handleLogout);

function handleLogout() {
    currentUser = null;
    showAuthSection();
}

// Check if user is logged in when switching to tab
const poserQuestionTab = document.querySelector('[data-tab="poser-question"]');
poserQuestionTab.addEventListener('click', function() {
    if (currentUser) {
        showQuestionSection();
    } else {
        showAuthSection();
    }
});

// Gestionnaire pour le modal de bienvenue (popup de création de compte)
document.addEventListener('DOMContentLoaded', function() {
    const welcomeModal = document.getElementById('welcome-modal');
    const accountModal = document.getElementById('account-modal');
    const closeWelcomeBtn = document.getElementById('close-welcome');
    const createAccountBtn = document.getElementById('create-account-btn');
    const registerForm = document.getElementById('register-form');
    const closeAccountBtn = document.getElementById('close-account');

    // Afficher le modal de bienvenue si pas connecté
    if (!currentUser) {
        welcomeModal.style.display = 'block';
    }

    // Fermer le modal de bienvenue
    closeWelcomeBtn.addEventListener('click', function() {
        welcomeModal.style.display = 'none';
    });

    // Ouvrir le modal de création de compte
    createAccountBtn.addEventListener('click', function() {
        welcomeModal.style.display = 'none';
        accountModal.style.display = 'block';
    });

    // Fermer le modal de création de compte
    closeAccountBtn.addEventListener('click', function() {
        accountModal.style.display = 'none';
    });

    // Soumettre le formulaire d'inscription
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
                accountModal.style.display = 'none';
                showAuthSection();
            } else {
                alert('Erreur : ' + data.error);
            }
        })
        .catch(error => {
            console.error('Erreur lors de l\'inscription:', error);
            alert('Erreur lors de l\'inscription.');
        });
    });

    // Fermer les modals en cliquant en dehors
    window.addEventListener('click', function(event) {
        if (event.target === welcomeModal) {
            welcomeModal.style.display = 'none';
        }
        if (event.target === accountModal) {
            accountModal.style.display = 'none';
        }
    });
});