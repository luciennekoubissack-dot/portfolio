# Portfolio Personnel - Designer UI/UX & Développeuse Frontend

Un portfolio moderne et responsive avec des effets 3D et un formulaire de contact fonctionnel.

## 🚀 Fonctionnalités

- **Design moderne** avec effets 3D et animations
- **Responsive** - s'adapte à tous les écrans
- **Formulaire de contact** fonctionnel avec validation
- **Navigation fluide** avec scroll smooth
- **Sections organisées** : À propos, Compétences, Certifications, Portfolio, Objectifs, Contact
- **Portfolio avec onglets** pour organiser vos projets
- **Effets visuels** : parallax, animations au scroll, hover effects

## 📋 Configuration du formulaire de contact

### Option 1: Formspree (Recommandé - Gratuit)

1. Allez sur [formspree.io](https://formspree.io)
2. Créez un compte gratuit
3. Créez un nouveau formulaire
4. Copiez l'URL de votre formulaire (ex: `https://formspree.io/f/xvgpkjqw`)
5. Dans `index.html`, remplacez `YOUR_FORM_ID` par votre ID Formspree :
   ```html
   <form id="contactForm" action="https://formspree.io/f/VOTRE_ID_ICI" method="POST">
   ```

### Option 2: Netlify Forms (Si hébergé sur Netlify)

1. Ajoutez l'attribut `netlify` à votre formulaire :
   ```html
   <form id="contactForm" netlify method="POST">
   ```
2. Déployez sur Netlify - les formulaires seront automatiquement gérés

### Option 3: PHP (Si vous avez un serveur PHP)

1. Modifiez `contact.php` avec votre vraie adresse email
2. Changez l'action du formulaire vers `contact.php`
3. Assurez-vous que votre serveur supporte l'envoi d'emails

## 🎨 Personnalisation

### Informations personnelles
Remplacez tous les éléments entre crochets `[...]` par vos vraies informations :
- `[Votre Prénom]` - Votre nom
- `[votre.email@exemple.com]` - Votre email
- `[Votre numéro]` - Votre téléphone
- Ajoutez vos vraies certifications
- Remplacez les projets d'exemple par vos réalisations

### Couleurs et style
Modifiez les variables CSS dans `style.css` :
```css
:root {
    --primary-color: #a66c84;    /* Couleur principale */
    --secondary-color: #6c5ce7;  /* Couleur secondaire */
    --accent-color: #fd79a8;     /* Couleur d'accent */
}
```

### Images
- Remplacez l'image de fond du header par votre photo
- Ajoutez vos vraies captures d'écran de projets
- Optimisez les images pour le web (format WebP recommandé)

## 📱 Responsive Design

Le portfolio est entièrement responsive avec :
- **Desktop** : Mise en page complète avec effets 3D
- **Tablette** : Adaptation des grilles et formulaires
- **Mobile** : Navigation simplifiée, effets 3D réduits pour les performances

## 🛠️ Technologies utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styles modernes avec Grid, Flexbox, animations
- **JavaScript** - Interactions et formulaire
- **Font Awesome** - Icônes
- **Google Fonts** - Typographie (Montserrat)

## 📦 Déploiement

### GitHub Pages
1. Créez un repository GitHub
2. Uploadez vos fichiers
3. Activez GitHub Pages dans les settings

### Netlify
1. Connectez votre repository GitHub
2. Déployez automatiquement
3. Configurez un nom de domaine personnalisé

### Vercel
1. Importez depuis GitHub
2. Déployez en un clic
3. Domaine personnalisé disponible

## 🔧 Optimisations recommandées

- **Images** : Compressez et utilisez des formats modernes (WebP)
- **Performance** : Minifiez CSS/JS pour la production
- **SEO** : Ajoutez des meta descriptions et Open Graph tags
- **Analytics** : Intégrez Google Analytics pour suivre les visites

## 📞 Support

Pour toute question ou personnalisation, n'hésitez pas à me contacter !

---

**Bonne chance pour votre recherche de stage ! 🎯**