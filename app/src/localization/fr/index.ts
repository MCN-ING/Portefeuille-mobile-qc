const translation = {
  Global: {
    EnterPin: 'Saisir le NIP',
    '6DigitPin': 'NIP à 6 chiffres',
    Submit: 'Soumettre',
    'NoneYet!': "Aucune attestation pour l'instant.",
    Cancel: 'Annuler',
    Confirm: 'Confirmer',
    Accept: 'Accepter',
    Reject: 'Rejeter',
    NotNow: 'Pas maintenant',
    Share: 'Partager',
    Decline: 'Refuser',
    Back: 'Précédent',
    Next: 'Suivant',
    Continue: 'Continuer',
    Info: 'Information',
    ThisDecisionCannotBeChanged: 'Cette décision ne peut être modifiée.',
    Failure: 'Échec',
    Success: 'Succès',
    SomethingWentWrong: 'Un problème est survenu',
    Done: 'Terminé',
    Skip: 'Ignorer',
    View: 'Afficher',
    Home: 'Accueil',
    ErrorCode: "Code d'erreur",
    Okay: 'Ok',
    TryAgain: 'Réessayer',
    GoBack: 'Retourner',
    GetStarted: 'Commencer',
    Dismiss: 'Rejeter',
    On: 'Activé',
    Off: 'Désactivé',
    Close: 'Fermer',
  },
  Language: {
    English: 'Anglais',
    French: 'Français',
  },
  CameraDisclosure: {
    AllowCameraUse: "Autoriser l'utilisation de l'appareil photo",
    CameraDisclosure:
      "L'appareil photo est utilisée pour balayer les codes QR. Aucune information sur les images n'est enregistrée, utilisée à des fins d'analyse ou partagée.",
    ToContinueUsing:
      "Pour continuer à utiliser la fonction de balayage du portefeuille numérique, veuillez autoriser l'utilisation de l'appareil photo.",
    Allow: 'Autoriser',
    OpenSettings: 'Ourvir Paramètres',
  },
  Biometry: {
    Toggle: 'Activer la biométrie',
    EnabledText1:
      'Déverrouillez votre portefeuille avec la biométrie de votre appareil au lieu d’utiliser le NIP du portefeuille.',
    EnabledText2:
      'Cela signifie que toutes les empreintes digitales et les données faciales ajoutées sur cet appareil peuvent être utilisées pour accéder à votre portefeuille QC.',
    NotEnabledText1:
      "La biométrie n'est pas actuellement configurée sur cet appareil et ne peut donc pas être activée.",
    NotEnabledText2:
      "Si vous souhaitez activer cette fonctionnalité, activez la biométrie dans les paramètres de l'appareil, puis revenez à cet écran.",
    Warning: '\n\nAssurez-vous que vous seul avez accès à votre portefeuille.',
    UseToUnlock: 'Souhaitez-vous utiliser la biométrie pour déverrouiller votre portefeuille?',
    NoBiometricsErrorTitle: 'Pas de biométrie',
    NoBiometricsErrorMessage: "La biométrie n'est pas activée sur cet appareil.",
    NoBiometricsErrorDetails: 'Pour résoudre ce problème, activez la biométrie dans les paramètres de votre appareil.',
    UnlockPromptTitle: 'Déverrouillage du portefeuille',
    UnlockPromptDescription: 'Utilisez la biométrie pour déverrouiller votre portefeuille',
    EnabledText1Bold:
      'Notez qu’en activant la biométrie, toute personne dont les données biométriques sont enregistrées sur votre appareil pourra déverrouiller votre portefeuille et avoir accès à vos attestations.',
    EnabledText3:
      "Toute personne pouvant accéder à votre téléphone à l'aide de la biométrie peut accéder à votre portefeuille numérique.",
    EnabledText3Bold: 'Assurez-vous que vous seul avez accès à votre portefeuille.',
  },
  Error: {
    Title2020: "Impossible de traiter l'invitation",
    Message2020: "Un problème est survenu lors du traitement de l'invitation à se connecter.",
    Title2021: "Impossible de recevoir l'invitation",
    Message2021: "Un problème est survenu lors de la réception de l'invitation à se connecter.",
    Title2022: "Impossible de trouver l'ancienne identité numérique.",
    Message2022: "Un problème est survenu lors de l'extraction du référentiel de l'identité numérique.",
    Title2025: 'Authentification BCSC',
    Message2025: 'Un problème a été signalé par BCSC.',
    Title2026: 'Oups! Un problème est survenu.',
    Message2026: "Un problème est survenu. Veuillez redémarrer l'application.",
    NoMessage: 'Aucun message.',
    Unknown: 'Erreur inconnue',
    Problem: 'Un problème est survenu',
    Title1034: 'Impossible de récupérer la demande de preuve.',
    Message1034: 'La demande de preuve est introuvable.',
    Title1035: "Impossible de récupérer l'offre d'attestation.",
    Message1035: "L'offre d'attestation est introuvable.",
    Title1036: 'Impossible de récupérer les attestations du portefeuille.',
    Message1036: 'Les attestations du portefeuille sont introuvables.',
    Title1037: 'Impossible de supprimer le contact.',
    Message1037: 'Un problème est survenu lors de la suppression du contact.',
    Message2024: "La demande d'authentification a été annulée.",
    Title2024: 'Authentification BCSC',
  },
  Credentials: {
    AddCredential: 'Ajouter une attestation',
    AddFirstCredential: 'Ajouter votre première attestation',
    CredentialsNotFound: 'Attestations introuvables',
    CredentialDetails: 'Détails des attestations',
    EmptyList: "Votre portefeuille ne contient pas d'attestation",
  },
  PersonCredentialNotification: {
    Title: "Obtenez votre attestation d'identité",
    Description:
      "Ajoutez l'attestation d'identité à votre portefeuille et utilisez-la pour accéder aux services en ligne.",
    ButtonTitle: 'Démarrer',
  },
  PersonCredential: {
    Issuer: 'Service C.-B.',
    Name: 'Personne',
    GivenName: 'Exemple de prénom',
    FamilyName: 'Exemple de nom de famille',
    Description:
      "Ajoutez vos justificatifs d’identités à votre portefeuille pour prouver vos informations personnelles en ligne et accéder aux services en ligne.\n\nVous aurez besoin de l'application BC Service Card configurée sur cet appareil mobile.",
    LinkDescription: "Obtenez l'application BC Services Card",
    GetCredential: "Obtenez votre attestation d'identité",
    Decline: "L'obtenir plus tard",
    PageTitle: "Attestation d'ìdentité",
  },
  StatusMessages: {
    InitAgent: "Initialisation de l'agent ...",
  },
  TermsV2: {
    Consent: {
      title: 'Consentement',
      body: "Veuillez prendre connaissance des conditions générales liées à l'utilisation du portefeuille numérique du gouvernement du Québec.",
      PersonalUse: {
        title: 'Usage personnel exclusif',
        body: "Vous êtes responsable de la confidentialité de votre portefeuille numérique. Vous devez le réaliser à votre usage exclusif. Ne divulguez à personne votre code d'accès et protégez adéquatement votre téléphone mobile. Des recommandations vous sont présentées dans la rubrique *Sécurité* .",
        subsection: {
          title: 'Utilisation acceptable',
          body:
            "Dans le cadre de votre utilisation de l'Application sous Licence, vous ne devez prendre aucune mesure susceptible de mettre en péril la sécurité, l'intégrité et/ou la disponibilité de l'Application sous Licence, y compris, sans s'y limiter :\n" +
            '\n' +
            "L’utilisation de l'Application sous Licence à des fins illégales ou inappropriées ;\n" +
            '\n' +
            "L’altération de toute partie de l'Application sous Licence ;\n" +
            '\n' +
            "L’utilisation de l'Application sous Licence pour transmettre tout virus ou tout autre code informatique, fichier ou programme nuisible ou destructeur, ou pour mener des activités de piratage et/ou d'intrusion ;\n" +
            '\n' +
            "Tenter de contourner ou de subvertir toute mesure de sécurité associée à l'Application sous Licence ;\n" +
            '\n' +
            "Entreprendre toute action qui pourrait raisonnablement être interprétée comme susceptible d'affecter négativement les autres utilisateurs de l'Application sous Licence ;\n" +
            '\n' +
            'Où\n' +
            '\n' +
            "Supprimer ou modifier tout symbole ou avis de propriété, y compris tout avis de droit d'auteur, marque ou logo, affiché en relation avec l'Application sous Licence.",
        },
      },
      IdentityTheft: {
        title: "En cas de vol d'identité",
        body: "Si vous soupçonnez que la sécurité de votre portefeuille et de son contenu a été compromise , vous devez communiquer immédiatement  avec *le Service québécois d’identité numérique.* Vous ne serez pas tenu responsable en cas de vol d'identité, dans la mesure où vous respectez les présentes conditions.",
        subsection: {
          title: 'Indemnisation',
          body:
            'Vous acceptez d’indemniser, de défendre et de dégager de toute responsabilité la province et tous ses fonctionnaires, employés et agents respectifs à l’égard de toutes les réclamations, demandes, obligations, pertes, passifs, coûts ou dettes et dépenses (y compris, sans s’y limiter, les frais juridiques raisonnables).\n' +
            '\n' +
            ' Découlant :\n' +
            '\n' +
            ' (a) de votre utilisation de l’Application sous licence ;\n' +
            '\n' +
            ' Où\n' +
            '\n' +
            ' (b) de votre violation de toute disposition du présent CLUF',
        },
      },
      Privacy: {
        title: 'Protection et confidentialité',
        body: 'Le gouvernement du Québec se préoccupe de la protection de votre vie privée et des renseignements personnels et confidentiels qui sont contenus dans cette application. Vous avez la responsabilité de consulter *la Politique de confidentialité pour connaitre les pratiques du gouvernements du Québec à ce sujet.*',
        subsection: {
          title: 'Protection des informations personnelles',
          body:
            'Si vous visitez le site Web de l’application sous licence à\n' +
            '\n' +
            'https://www.quebec.ca/gouvernement/ministere/cybersecurite-numerique,\n' +
            '\n' +
            "Y compris pour accéder au Fonction d’aide pour l’application sous licence ou le contenu connexe à https://www.quebec.ca/gouvernement/ministere/cybersecurite-numerique, certaines informations vous seront fournies conformément à la Déclaration de confidentialité de la province pour les sites Web du gouvernement. Certains renseignements sont également recueillis dans le cadre de la demande de permis, comme il est indiqué dans la Politique de confidentialité de Quebec Wallet App (la « Politique de confidentialité »), qui est incorporée par renvoi dans le présent CLUF et en fait partie. Vous consentez à la collecte par l’Application sous licence de ces informations qui, avec votre Contenu, sont stockées localement sur votre appareil et n’est pas accessible à la province, sauf dans les cas où vous choisissez de fournir des renseignements à la province, comme il est indiqué dans la politique de confidentialité. Tous les renseignements que vous fournissez à la province qui sont des « renseignements personnels », au sens de la Loi sur l’accès à l’information et la protection de la vie privée du Québec (« la Loi »), sont recueillis par la province en vertu de l’alinéa 26c la Loi, aux fins énoncées dans la Politique de confidentialité. Toute question concernant la collecte de ces renseignements peut être adressée à la personne-ressource indiquée à l'article 11. Les consentements que vous avez fournis conformément au présent article seront maintenus jusqu'à ce que vous les révoquiez par écrit à la personne-ressource mentionnée à l'article 11, auquel cas le présent ALUF prendra fin immédiatement, conformément à l'article 9.",
        },
      },
      AppAccess: {
        title: "Droit d'accès à l'application",
        body: '  Le gouvernement du Québec se préoccupe de la protection de votre vie privée et des renseignements personnels et confidentiels contenus dans cette application. À cet effet, vous avez la responsabilité de consulter la * Politique de confidentialité * pour connaître les pratiques du gouvernement du Québec à cet égard.',
        subsection: {
          title: 'Limitation de la responsabilité',
          body:
            'Dans la mesure où la loi applicable le permet, la Province ne sera en aucun cas en aucun cas, la Province ne sera responsable envers toute personne ou entité de toute perte, réclamation, blessure ou dommage direct, indirect, spécial, accessoire ou consécutif, ou de toute autre perte, réclamation, blessure ou dommage.\n' +
            '\n' +
            'Si prévisible ou imprévisible (y compris les demandes de limitation de dommages-intérêts pour perte de profits ou occasions d’affaires, l’utilisation ou l’utilisation abusive ou l’impossibilité d’utiliser , l’application sous licence , les interruptions , la suppression ou la corruption de fichiers , la perte de programmes ou d’informations , les erreurs, les défauts ou les retards ) découlant de votre utilisation de l’application sous licence ou y étant lié de quelque façon que ce soit, qu’il soit fondé sur un contrat, un délit, une responsabilité stricte ou toute autre théorie juridique. La phrase précédente s’appliquera même si la province a été expressément informée de la possibilité d’une telle perte, réclamation, blessure ou dommage. Les parties reconnaissent qu’Apple n’est pas responsable :\n' +
            '\n' +
            'a) traiter toute réclamation que vous ou un tiers de quelque nature que ce soit relativement à la demande autorisée;\n' +
            '\n' +
            'b) votre possession et/ou utilisation de la demande de permis.',
        },
      },
      More: {
        body: 'En savoir plus sur *ces conditions générales(*)*',
      },
    },
  },

  PinCreate: {
    UserAuthenticationPin: "NIP d'authentification de l'utilisateur",
    PinMustBe6DigitsInLength: 'Le NIP doit être composé de 6 chiffres',
    PinsEnteredDoNotMatch: 'Les NIP saisis ne correspondent pas',
    '6DigitPin': 'NIP à 6 chiffres',
    ReenterPin: 'Saisir le NIP à nouveau',
    Create: 'Créer',
    PINDisclaimer:
      'Si vous l’oubliez, vous devrez à nouveau : \n• Configurer votre portefeuille.\n• Demander de nouveau les attestations  déjà émises dans votre portefeuille.',
  },
  PinEnter: {
    IncorrectPin: 'NIP erroné',
    Unlock: 'Déverrouiller',
    Or: 'Ou',
    BiometricsUnlock: 'Déverrouiller avec la biométrie',
    LoggedOut: 'Vous êtes déconnecté',
    LoggedOutDescription:
      "Pour protéger vos informations, vous êtes déconnecté de votre portefeuille si vous ne l'avez pas utilisé pendant 5 minutes.",
    RepeatPIN: 'Veuillez réessayer avec votre code NIP.',
    AttemptLockoutWarning:
      "Note: pour votre sécurité, la saisie d'un autre code NIP incorrect verrouillera temporairement le portefeuille.",
  },
  AttemptLockout: {
    Title: 'Votre portefeuille est temporairement verrouillé ',
    Description: 'Vous avez fait trop de tentatives de connexion non réussies.',
    TryAgain: 'Vous pouvez essayer de nouveau dans :',
    Hours: 'heures',
    Minutes: 'minutes',
    Seconds: 'secondes',
  },
  ContactDetails: {
    Created: 'Créé',
    ConnectionState: 'État de la connexion',
    AContact: 'Un contact',
    DateOfConnection: 'Date de connexion : {{ date }}',
    RemoveTitle: 'Supprimer ce contact',
    RemoveCaption: "Pour ajouter des attestations, l'organisation émettrice doit figurer parmi vos contacts.",
    UnableToRemoveTitle: 'Impossible de supprimer le contact',
    UnableToRemoveCaption:
      "Impossible de supprimer, car il y a des attestations émises par ce contact dans votre portefeuille. Supprimez d'abord les attestations, puis supprimez ce contact.",
    GoToCredentials: 'Accéder aux attestations',
    ContactRemoved: 'Contact supprimé',
  },
  WhatAreContacts: {
    Title: "Qu'est-ce qu'un contact?",
    Preamble: "L'ajout d'organisations en tant que contact vous permettra de:",
    ListItemCredentialUpdates: 'Obtenir des mises à jour des attestations émises par cette organisation.',
    ListItemNewCredentials: "Obtenir de nouvelles attestations d'identité.",
    ListItemProofRequest: "Demandes d'attestations accélérées.",
    RemoveContacts: 'Vous pouvez à tout moment supprimer des contacts de votre  liste. ',
    ContactsLink: 'liste de contacts',
    ContactSharing: "L'utilisation de vos justificatifs d'identité n'est jamais partagée avec vos contacts.",
  },
  CredentialDetails: {
    Id: 'Identifiant :',
    CreatedAt: 'Créé à :',
    Version: 'Version',
    Issued: 'Délivré',
    PrivacyPolicy: 'Politique de confidentialité',
    TermsAndConditions: "Conditions d'utilisation",
    RemoveFromWallet: 'Retirer du portefeuille',
    Revoked: 'Révoqué',
    Choose: 'Choisir',
    GetPersonCred: "Obtenez votre attestation d'identité",
    ScanQrCode: 'Lire un code QR',
    CredentialRevokedMessageTitle: 'Cette attestation est révoquée',
    CredentialRevokedMessageBody:
      "Cette attestation peut ne plus fonctionner pour certaines demandes de preuve. Le cas échéant, vous devrez mettre à jour l'attestation avec l'émetteur.",
    NewRevoked: 'Attestation révoquée',
  },
  Home: {
    Welcome: 'Bienvenue',
    Notifications: 'Notifications',
    NoNewUpdates: "Vous n'avez pas de nouvelles notifications.",
    NoCredentials: "Vous n'avez pas d'attestation dans votre portefeuille.",
    SeeAll: 'Afficher tout',
    YouHave: 'Vous avez',
    Credential: 'attestation',
    Credentials: 'attestations',
    InYourWallet: 'dans votre portefeuille',
  },
  PrivacyPolicy: {
    Title: 'Politique de confidentialité',
    CameraDisclosure:
      "La caméra est utilisée pour scanner les codes QR pour un traitement immédiat sur l'appareil. Aucune information sur les images n'est stockée, utilisée à des fins d'analyse ou partagée.",
  },
  Scan: {
    SuccessfullyAcceptedConnection: 'Connexion acceptée avec succès',
    AcceptingConnection: 'Acceptation de la connexion',
    ConnectionRecordIdNotFound: "Identifiant de l'enregistrement de connexion introuvable",
    ConnectionAccepted: 'Connexion acceptée',
    ConnectionNotFound: 'Connexion non détectée',
    InvalidQrCode: 'Code QR erroné. Veuillez réessayer.',
    UnableToHandleRedirection: 'Impossible de traiter la redirection',
    Close: 'Fermer',
    Torch: 'Flash',
  },
  Connection: {
    JustAMoment: 'Veuillez patienter pendant que nous établissons une connexion sécurisée...',
    TakingTooLong:
      "L'opération prend plus de temps que prévu. Vous pouvez retourner à l'accueil ou continuer à patienter.",
  },
  CredentialOffer: {
    ThisIsTakingLongerThanExpected:
      'Cette opération prend plus de temps que prévu. Revenez plus tard pour obtenir votre nouvelle attestation.',
    'RejectThisCredential?': 'Souhaitez-vous rejeter cette attestation?',
    AcceptingCredential: "Acceptation de l'attestation",
    SuccessfullyAcceptedCredential: 'Attestation acceptée avec succès',
    RejectingCredential: "Rejet de l'attestation",
    SuccessfullyRejectedCredential: 'Attestation rejetée avec succès',
    CredentialNotFound: 'Attestation introuvable',
    CredentialAccepted: 'Attestation acceptée',
    CredentialRejected: 'Attestation rejetée',
    CredentialAddedToYourWallet: 'Attestation ajoutée à votre portefeuille',
    CredentialDeclined: 'Attestation refusée',
    CredentialOnTheWay: 'Votre attestation est en cours de transmission',
    CredentialOffer: "Nouvelle offre d'attestation",
    IsOfferingYouACredential: 'vous propose un attestation',
    ConfirmDeclineCredential: 'Oui, refuser cette attestation',
    AbortDeclineCredential: 'Non, revenir en arrière',
    DeleteOfferTitle: 'Supprimer cette offre ?',
    DeleteOfferMessage: 'La suppression de cette offre supprimera la notification de votre liste.',
    DeleteOfferDescription:
      "Vous ne reconnaissez pas l'organisation ? Vérifiez votre liste de contacts. Vous ne recevez des notifications que des contacts que vous avez initiés",
    NewCredentialOffer: "Nouvelle offre d'attestation",
  },
  ConnectionAlert: {
    AddedContacts: 'Ajouté aux contacts',
    WhatAreContacts: 'Que sont les contacts ?',
    NotificationBodyUpper: 'Tu peux trouver ',
    NotificationBodyLower: ' dans vos contacts. Gérez vos contacts dans les paramètres',
    PopupIntro: "L'ajout d'organisations en tant que contact vous permettra de : ",
    PopupPoint1: "Obtenir des mises à jour des informations d'identification émises par cette organisation",
    PopupPoint2: "Obtenez de nouvelles informations d'identification",
    PopupPoint3: 'Demandes de preuves accélérées',
    SettingsLink: 'Réglages',
    SettingsInstruction: 'Vous pouvez toujours supprimer des contacts à tout moment dans ',
    PrivacyMessage: "L'utilisation de vos informations d'identification n'est jamais partagée avec vos contacts.",
    PopupExit: "J'ai compris",
  },
  ProofRequest: {
    OfferDelay: "Retard de l'offre",
    'RejectThisProof?': 'Rejeter cette preuve?',
    AcceptingProof: 'Acceptation de la preuve',
    SuccessfullyAcceptedProof: 'Preuve acceptée avec succès',
    ProofNotFound: 'Preuve introuvable',
    RejectingProof: 'Rejet de la preuve',
    ProofAccepted: 'Preuve acceptée',
    ProofRejected: 'Preuve rejetée',
    RequestedCredentialsCouldNotBeFound: "Les attestations demandées n'ont pas été trouvées",
    ProofRequest: 'Nouvelle demande de preuve',
    NotAvailableInYourWallet: 'Non disponible dans votre portefeuille',
    IsRequesting: 'demande',
    IsRequestingSomethingYouDontHaveAvailable: "demande une information que vous n'avez pas à votre disposition",
    IsRequestingYouToShare: 'vous demande de partager',
    WhichYouCanProvideFrom: 'que vous pouvez fournir à partir de',
    Details: 'Détails',
    SendingTheInformationSecurely: "Envoi sécurisé de l'information",
    InformationSentSuccessfully: 'Informations envoyées avec succès',
    ProofRequestDeclined: 'Demande de preuve refusée',
  },
  TabStack: {
    Home: 'Accueil',
    Scan: 'Lire',
    Credentials: 'Attestations',
  },
  RootStack: {
    Contacts: 'Contacts',
    Settings: 'Paramètres',
  },
  QRScanner: {
    PermissionToUseCamera: "Autorisation d'utiliser l'appareil photo",
    WeNeedYourPermissionToUseYourCamera: 'Nous avons besoin de votre autorisation pour utiliser votre appareil photo.',
    Ok: 'Ok',
  },
  Record: {
    Hide: 'Masquer',
    Show: 'Afficher',
    HideAll: 'Masquer tout',
    Hidden: 'Masqué',
  },
  Loading: {
    TakingTooLong:
      "L'opération prend plus de temps que prévu. Vous pouvez retourner à l'accueil ou continuer à patienter..",
    BackToHome: "Retour à l'accueil",
  },
  Screens: {
    Splash: 'Page de garde',
    Onboarding: 'Portefeuille numérique du Québec',
    Terms: "Conditions d'utilisation",
    CreatePin: 'Créer un NIP à 6 chiffres',
    EnterPin: 'Saisir le NIP',
    Home: 'Accueil',
    Scan: 'Lire un code QR',
    Credentials: 'Attestations',
    CredentialDetails: 'Détails des attestations',
    Notifications: 'Notifications',
    CredentialOffer: "Proposition d'attestation",
    ProofRequest: 'Demande de preuve',
    ProofRequestAttributeDetails: 'Détails des attributs de la demande de preuve',
    Settings: 'Paramètres',
    Language: 'Langue',
    Contacts: 'Contacts',
    ContactDetails: 'Informations du contact',
  },
  OnboardingPages: {
    FirstPageTitle: 'Bienvenue dans le portefeuille numérique du Québec',
    FirstPageBody1:
      'Le portefeuille Québec vous permet de recevoir, enregistrer et utiliser vos attestations numériques.',
    FirstPageBody2: 'Cette application est sécurisée et aide à protéger votre confidentialité en ligne.',
    FirstPageBody3:
      "Le portefeuille québécois en est actuellement aux premiers stades de développement et la technologie est en cours d'exploration. La plupart des gens n'auront pas besoin du portefeuille numérique, car il n'y a que quelques justificatifs d'identité actuellement disponibles.",
    SecondPageTitle: 'Une attestation numérique, enregistrée secrètement',
    SecondPageBody:
      'Le portefeuille Québec protège vos attestations numériques, une version digitale de vos permis et cartes d’identité.\n\nElles sont enregistrées de manière sécurisée, seulement sur votre appareil.',
    ThirdPageTitle: 'Partager uniquement ce qui est nécessaire',
    ThirdPageBogy:
      'Pour recevoir une attestation, vous devez lire le code QR qui vous sera présenté. \n\nLes informations seront communiquées grace à une communication privée et protégée.',
    FourthPageTitle: 'Prenez le contrôle de vos informations',
    FourthPageBody:
      'Vous avez le contrôle sur les informations qui sont partagées et utilisées depuis votre portefeuille Québec. Vous ne partagez que les informations requises selon la situation. \n\nLe gouvernement du Québec n’est jamais mis au courant des interactions réalisées lorsque vous utilisez une attestation numérique.',
    ButtonGetStarted: 'Configurer le portefeuille',
  },
  NetInfo: {
    NoInternetConnectionTitle: 'Pas de connexion Internet',
    NoInternetConnectionMessage:
      "Vous ne pouvez pas accéder aux services à l'aide du portefeuille numérique, ni recevoir d'attestations tant que vous ne serez pas de nouveau en ligne.\n\nVeuillez vérifier votre connexion Internet.",
    LedgerConnectivityIssueTitle: 'Services de portefeuille',
    LedgerConnectivityIssueMessage:
      "Il se peut qu'un pare-feu vous empêche de vous connecter aux services liés au portefeuille.",
  },
  Settings: {
    Help: 'Aide',
    MoreInformation: "Plus d'information",
    HelpUsingBCWallet: "Aide à l'utilisation du portefeuille numérique de la C.-B.",
    ReportAProblem: 'Signaler un problème',
    TermsOfUse: "Conditions d'utilisation",
    PrivacyStatement: 'Déclaration de confidentialité',
    VulnerabilityDisclosurePolicy: 'Politique de divulgation des vulnérabilités',
    Accessibility: 'Accessibilité',
    IntroductionToTheApp: "Présentation de l'application",
    Version: 'Version',
    VersionString: '0.0.0-0',
    AppPreferences: "À propos de l'application : Préférences ",
    AboutApp: "À propos de l'application",
    Language: 'Langue',
    AppSettings: "Paramètres de l'application",
    WhatAreContacts: 'Que sont les contacts?',
    Developer: 'Développeur',
  },
  Tips: {
    Header: 'Conseils',
    GettingReady: 'Préparez votre portefeuille...',
    Tip1: "Par souci de sécurité, l'application du portefeuille numérique du Québec se verrouille après 5 minutes d'inactivité.",
    Tip2: 'Contrairement à la présentation de cartes physiques, vous ne partagez que ce qui est nécessaire à partir de vos justificatifs',
    Tip3: 'Vos justificatifs sont stockés uniquement sur ce téléphone, nulle part ailleurs',
    Tip4: "Les informations sont envoyées et reçues par l'entremise d'une connexion cryptée intraçable.",
    Tip5: "N'oubliez pas votre NIP. Si vous l'oubliez, vous devrez réinstaller et rajouter vos attestations",
    Tip6: "Ignorez le code NIP et déverrouillez votre portefeuille à l'aide de vos données biométriques pour une navigation plus rapide.",
    Tip7: 'Vos attestations les plus récemment ajoutées sont placés en haut de la liste.',
    Tip8: "Supprimez les attestations de votre portefeuille à partir de l'écran des attestations.",
    Tip9: "Vous pouvez ignorer les notifications sans les ouvrir en cliquant sur le bouton  'X' dans le coin supérieur droit.",
    Tip10: "Besoin d'aide? Trouvez des réponses dans la section d'aide du bouton '☰' dans le coin supérieur gauche",
    Tip11: "Vous pouvez activer le flash de l'appareil photo en cas de problème de lecture du code QR .",
    Tip12: "Si le code QR ne se balaie pas, essayez d'augmenter la luminosité de l'écran.",
    Tip13:
      "Les informations envoyées par l'intermédiaire de votre portefeuille sont fiables pour vous et pour les contacts avec lesquels vous communiquez.",
    Tip14:
      "Même les attestations d'identité révoquées ou expirées peuvent être utilisées si l'organisation n'en fait pas la demande.",
  },
  Init: {
    Retry: 'Réessayer',
    Starting: 'Débuter...',
    CheckingAuth: 'Vérification de l’authentification...',
    FetchingPreferences: 'Récupération des préférences...',
    VerifyingOnboarding: "Vérification de l'intégration...",
    GettingCredentials: 'Récupération des attestations...',
    RegisteringTransports: 'Enregistrement des transports...',
    InitializingAgent: 'Initialisation de l’agent...',
    ConnectingLedgers: 'Connexion aux fichiers...',
    SettingAgent: 'Configuration de l’agent...',
    Finishing: 'Finalisation...',
  },
  Feedback: {
    GiveFeedback: 'Donnez votre avis',
  },
}

export default translation
