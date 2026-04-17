export type Language = 'en' | 'fr';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      collections: 'Collections',
      philosophy: 'Philosophy',
      sponsors: 'Sponsorships',
      map: 'EMS@Path 4D',
      faq: 'FAQ',
      admin: 'Gestion / Admin'
    },
    hero: {
        title: 'ABSOLUTE ELEGANCE',
        subtitle: 'The Real Link',
        explore: 'Explore Collections',
        enter: 'Enter 1CL Hub'
    },
    agent: {
        welcome: "Welcome to the 1CL ecosystem. I am The Curator. How may I guide you?",
        typing: "The Curator is typing...",
        placeholder: "Message Sovereign...",
        whoAreYou: "I am The Curator, the sovereign intelligence of the 1CL ecosystem. My mission is to safeguard the link between sound and physical artifacts.",
        whatIs1CL: "1CL Collection is the birth of Street-Luxe. A universe where Chawblick's music meets exceptional textile craftsmanship.",
        sovereignLink: "The Sovereign Link is our secure bridge between Supabase (Identity) and MongoDB (Logistics). It ensures data integrity through Edge Functions.",
        iam: "IAM (Identity and Access Management) uses Supabase Auth and 2FA to ensure only authorized personnel can access the EMS Dashboard.",
        unknown: "Analyzing 1CL data... I do not have a specific answer. Try asking about the Vault, Logistics, or the Atelier.",
        deconnect: "Security protocols activated. Administrative session revoked."
    },
    auth: {
        restricted: 'ACCESS RESTRICTED',
        identify: 'Identify context via Supabase IAM',
        email: 'Identity (Email)',
        password: 'KeyPhrase (Password)',
        verify: 'VERIFY PROTOCOL',
        signup: 'INITIALIZE SECURITY CONTEXT',
        noAccount: 'No Identity? Create Admin Portal',
        hasAccount: 'Already identified? Back to Login'
    },
    admin: {
        dashboard: 'EMS DASHBOARD',
        iamPortal: 'IAM SECURITY PORTAL',
        sync: 'Force Global Sync (MongoDB)',
        syncing: 'Syncing Data...',
        disconnect: 'Disconnect Session',
        audit: '-- SYSTEM AUDIT LOG --'
    },
    catalog: {
        title: 'THE ARCHIVE',
        subtitle: 'Explore the 1CL Ecosystem',
        all: 'All',
        men: 'Men',
        women: 'Women',
        unisex: 'Unisex',
        noResults: 'No items found for the selected filters.',
        types: {
          all: 'All',
          tshirt: 'T-Shirts',
          pull: 'Pulls & Sweats',
          jogger: 'Joggers',
          jacket: 'Jackets'
        }
    },
    philosophy: {
        title: '1CL — 1st Class Obsession',
        subtitle: 'We are not just a clothing brand. We are an ecosystem. A sovereign physical manifestation of auditory art.',
        pillar1Title: 'Authenticity',
        pillar1Text: 'We do not follow trends. In the studio or the atelier, the process is pure. Every stitch, every beat, is born from a raw desire to create something real.',
        pillar2Title: 'Connection',
        pillar2Text: "The physical garment is 'The Real Link'. It bridges the gap between the music we create and the community that lives it. A wearable extension of the Chawblick universe.",
        pillar3Title: 'Legacy',
        pillar3Text: 'One Link, All Legacy. Clothes that age with you. Music that stays with you. We are building the sovereign archives of tomorrow.'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      collections: 'Collections',
      philosophy: 'Philosophie',
      sponsors: 'Partenariats',
      map: 'EMS@Path 4D',
      faq: 'FAQ',
      admin: 'Gestion / Admin'
    },
    hero: {
        title: 'ÉLÉGANCE ABSOLUE',
        subtitle: 'Le Lien Réel',
        explore: 'Explorer les Collections',
        enter: 'Entrer dans le Hub 1CL'
    },
    agent: {
        welcome: "Bienvenue dans l'écosystème 1CL. Je suis The Curator. Comment puis-je vous guider ?",
        typing: "The Curator réfléchit...",
        placeholder: "Message Sovereign...",
        whoAreYou: "Je suis The Curator, l'intelligence souveraine de l'écosystème 1CL. Ma mission est de veiller sur le lien entre le son et l'objet.",
        whatIs1CL: "1CL Collection est l'éclosion du Street-Luxe. Un univers où la musique de Chawblick rencontre l'artisanat textile d'exception.",
        sovereignLink: "Le Sovereign Link est notre pont sécurisé entre Supabase (Identité) et MongoDB (Logistique). Il garantit l'intégrité des données via des Edge Functions.",
        iam: "L'IAM (Gestion des Identités et des Accès) utilise Supabase Auth et la 2FA pour garantir que seul le personnel autorisé accède au Dashboard EMS.",
        unknown: "Analyse des données 1CL en cours... Je n'ai pas de réponse précise. Essayez de me parler du Vault, de la Logistique ou de l'Atelier.",
        deconnect: "Protocoles de sécurité activés. Session administrative révoquée."
    },
    auth: {
        restricted: 'ACCÈS RESTRICTE',
        identify: 'Identification contextuelle via Supabase IAM',
        email: 'Identité (Email)',
        password: 'Mot de Passe (KeyPhrase)',
        verify: 'VÉRIFIER LE PROTOCOLE',
        signup: 'INITIALISER LE CONTEXTE SÉCURITÉ',
        noAccount: 'Pas d\'identité ? Créer un portail Admin',
        hasAccount: 'Déjà identifié ? Retour au Login'
    },
    admin: {
        dashboard: 'DASHBOARD EMS',
        iamPortal: 'PORTAIL SÉCURITÉ IAM',
        sync: 'Forcer la Sync Globale (MongoDB)',
        syncing: 'Synchronisation en cours...',
        disconnect: 'Déconnecter la Session',
        audit: '-- LOG D\'AUDIT SYSTÈME --'
    },
    catalog: {
        title: 'L\'ARCHIVE',
        subtitle: 'Explorez l\'écosystème 1CL',
        all: 'Tout',
        men: 'Homme',
        women: 'Femme',
        unisex: 'Unisex',
        noResults: 'Aucun article trouvé pour les filtres sélectionnés.',
        types: {
          all: 'Tout',
          tshirt: 'T-Shirts',
          pull: 'Pulls & Sweats',
          jogger: 'Joggings',
          jacket: 'Vestes'
        }
    },
    sponsors: {
        title: 'FORGE DES PARTENARIATS',
        subtitle: 'Connectez-vous au réseau souverain 1CL',
        formTitle: 'MÉTRIQUES DE PROPOSITION',
        submit: 'ENVOYER LA PROPOSITION'
    },
    philosophy: {
        title: '1CL — Obsession de 1ère Classe',
        subtitle: 'Nous ne sommes pas seulement une marque de vêtements. Nous sommes un écosystème. Une manifestation physique souveraine de l\'art auditif.',
        pillar1Title: 'Authenticité',
        pillar1Text: 'Nous ne suivons pas les tendances. En studio ou à l\'atelier, le processus est pur. Chaque point de couture, chaque beat, naît d\'un désir brut de créer quelque chose de vrai.',
        pillar2Title: 'Connexion',
        pillar2Text: 'Le vêtement physique est "Le Lien Réel". Il comble le fossé entre la musique que nous créons et la communauté qui la vit. Une extension portable de l\'univers Chawblick.',
        pillar3Title: 'Héritage',
        pillar3Text: 'Un Lien, Tout Héritage. Des vêtements qui vieillissent avec vous. Une musique qui reste avec vous. Nous construisons les archives souveraines de demain.'
    }
  }
};
