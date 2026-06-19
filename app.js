// ==========================================
// 1. BASE DE DONNÉES INTEGRÉE
// ==========================================
const seuilsRemplissage = {
  1: 0.55, 2: 0.53, 3: 0.40, 4: 0.38, 5: 0.35, 6: 0.31, 7: 0.30
};

const conduitsParType = {
  "CONDUIT EMT": [
    { nom: '1/2"', section: 186 }, { nom: '3/4"', section: 330 }, { nom: '1"', section: 539 },
    { nom: '1-1/4"', section: 940 }, { nom: '1-1/2"', section: 1288 }, { nom: '2"', section: 2132 },
    { nom: '2-1/2"', section: 3783 }, { nom: '3"', section: 5701 }, { nom: '3-1/2"', section: 7451 }, { nom: '4"', section: 9503 }
  ],
  "CONDUIT RIGID": [
    { nom: '1/2"', section: 202 }, { nom: '3/4"', section: 354 }, { nom: '1"', section: 573 },
    { nom: '1-1/4"', section: 985 }, { nom: '1-1/2"', section: 1336 }, { nom: '2"', section: 2199 },
    { nom: '2-1/2"', section: 3139 }, { nom: '3"', section: 4839 }, { nom: '3-1/2"', section: 6458 },
    { nom: '4"', section: 8311 }, { nom: '5"', section: 13039 }, { nom: '6"', section: 18811 }
  ],
  "CONDUIT MÉTALLIQUE FLEX": [
    { nom: '1/2"', section: 202 }, { nom: '3/4"', section: 354 }, { nom: '1"', section: 573 },
    { nom: '1-1/4"', section: 985 }, { nom: '1-1/2"', section: 1336 }, { nom: '2"', section: 2199 },
    { nom: '2-1/2"', section: 3139 }, { nom: '3"', section: 4839 }, { nom: '3-1/2"', section: 6458 }, { nom: '4"', section: 8311 }
  ],
  "CONDUIT MÉTALLIQUE FLEX ÉTANCHE": [
    { nom: '3/8"', section: 119 }, { nom: '1/2"', section: 196 }, { nom: '3/4"', section: 341 },
    { nom: '1"', section: 549 }, { nom: '1-1/4"', section: 965 }, { nom: '1-1/2"', section: 1257 },
    { nom: '2"', section: 2068 }, { nom: '2-1/2"', section: 3116 }, { nom: '3"', section: 4776 },
    { nom: '3-1/2"', section: 6207 }, { nom: '4"', section: 8107 }
  ],
  "CONDUIT PVC RIGIDE": [
    { nom: '1/2"', section: 167 }, { nom: '3/4"', section: 307 }, { nom: '1"', section: 507 },
    { nom: '1-1/4"', section: 792 }, { nom: '1-1/2"', section: 1140 }, { nom: '2"', section: 2027 },
    { nom: '2-1/2"', section: 2951 }, { nom: '3"', section: 4560 }, { nom: '3-1/2"', section: 6138 },
    { nom: '4"', section: 7870 }, { nom: '5"', section: 12439 }, { nom: '6"', section: 17613 }, { nom: '8"', section: 31225 }
  ],
  "CONDUIT PVC EB1/BD2": [
    { nom: '2"', section: 2027 }, { nom: '3"', section: 4560 }, { nom: '3-1/2"', section: 6138 },
    { nom: '4"', section: 7870 }, { nom: '4-1/2"', section: 10261 }, { nom: '5"', section: 12439 }, { nom: '6"', section: 17613 }
  ],
  "CONDUIT NON-MÉTAL FLEX ÉTANCHE": [
    { nom: '3/8"', section: 114 }, { nom: '1/2"', section: 188 }, { nom: '3/4"', section: 328 },
    { nom: '1"', section: 527 }, { nom: '1-1/4"', section: 937 }, { nom: '1-1/2"', section: 1257 }, { nom: '2"', section: 2098 }
  ]
};

const cablesParType = {
  "RW": {
    "14 AWG SOLIDE RW": { section: 7.78 }, "12 AWG SOLIDE RW": { section: 10.02 }, "10 AWG SOLIDE RW": { section: 13.25 },
    "14 AWG RW": { section: 8.89 }, "12 AWG RW": { section: 11.61 }, "10 AWG RW": { section: 15.67 },
    "8 AWG RW": { section: 28.17 }, "6 AWG RW": { section: 37.98 }, "4 AWG RW": { section: 52.46 },
    "3 AWG RW": { section: 61.99 }, "2 AWG RW": { section: 73.85 }, "1 AWG RW": { section: 99.10 },
    "1/0 AWG RW": { section: 118.3 }, "2/0 AWG RW": { section: 141.9 }, "3/0 AWG RW": { section: 170.6 },
    "4/0 AWG RW": { section: 206.4 }, "250 MCM RW": { section: 251.8 }, "300 MCM RW": { section: 292.6 },
    "350 MCM RW": { section: 331 }, "400 MCM RW": { section: 373 }, "450 MCM RW": { section: 412.2 },
    "500 MCM RW": { section: 450.5 }, "600 MCM RW": { section: 561.7 }, "700 MCM RW": { section: 640 },
    "750 MCM RW": { section: 679.3 }, "800 MCM RW": { section: 718.7 }, "900 MCM RW": { section: 796.6 },
    "1000 MCM RW": { section: 872 }, "1250 MCM RW": { section: 1108 }, "1500 MCM RW": { section: 1300 },
    "1750 MCM RW": { section: 1492 }, "2000 MCM RW": { section: 1681 }
  },
  "RWU": {
    "14 AWG RWU": { section: 18.70 }, "12 AWG RWU": { section: 22.56 }, "10 AWG RWU": { section: 27.99 },
    "8 AWG RWU": { section: 47.29 }, "6 AWG RWU": { section: 59.72 }, "4 AWG RWU": { section: 77.76 },
    "3 AWG RWU": { section: 89.42 }, "2 AWG RWU": { section: 103.5 }, "1 AWG RWU": { section: 137.9 },
    "1/0 AWG RWU": { section: 160.2 }, "2/0 AWG RWU": { section: 187.5 }, "3/0 AWG RWU": { section: 220.6 },
    "4/0 AWG RWU": { section: 262.4 }, "250 MCM RWU": { section: 320.5 }, "300 MCM RWU": { section: 364.4 },
    "350 MCM RWU": { section: 408.6 }, "400 MCM RWU": { section: 455 }, "450 MCM RWU": { section: 498.4 },
    "500 MCM RWU": { section: 540.8 }, "600 MCM RWU": { section: 661.4 }, "700 MCM RWU": { section: 746 },
    "750 MCM RWU": { section: 788.7 }, "800 MCM RWU": { section: 831.1 }, "900 MCM RWU": { section: 914.9 },
    "1000 MCM RWU": { section: 995.5 }, "1250 MCM RWU": { section: 1199 }, "1500 MCM RWU": { section: 1449 },
    "1750 MCM RWU": { section: 1652 }, "2000 MCM RWU": { section: 1851 }
  },
  "FAS": {
    "18/2 FAS": { section: 23.21 }, "18/3 FAS": { section: 24.08 }, "18/5 FAS": { section: 33.99 },
    "16/2 FAS": { section: 27.27 }, "16/3 FAS": { section: 28.27 }, "16/5 FAS": { section: 38.59 },
    "14/2 FAS": { section: 32.18 }, "14/3 FAS": { section: 36.32 }, "14/5 FAS": { section: 48.69 },
    "18/2 FAS (SH)": { section: 23.21 }, "18/3 FAS (SH)": { section: 24.08 }, "18/5 FAS (SH)": { section: 33.99 },
    "16/2 FAS (SH)": { section: 26.42 }, "16/3 FAS (SH)": { section: 28.95 }, "16/5 FAS (SH)": { section: 46.83 },
    "14/2 FAS (SH)": { section: 32.69 }, "14/3 FAS (SH)": { section: 37.76 }, "14/5 FAS (SH)": { section: 49.33 }
  },
  "FAS VITALINK": {
    "16/3 FAS VITALINK": { section: 61.38 }, "14/3 FAS VITALINK": { section: 77.44 }, "16/2 FAS (TW-SH) VITALINK": { section: 55.15 }
  },
  "CONTROLE": {
    "3c22(SH)FT6 Orange": { section: 17.53 }, "2c18 FT6 Orange": { section: 12.97 }, "3c18 FT6 Orange": { section: 15.69 },
    "4c18 FT6 Orange": { section: 30.66 }, "6c18 FT6 Orange": { section: 38.32 }, "CAT6 FT6 Orange": { section: 24.54 },
    "4c22 FT6 Gris": { section: 10.07 }, "6c22 FT6 Gris": { section: 14.3 }, "8c22 FT6 Gris": { section: 17.53 },
    "12c22 FT6 Gris": { section: 21.09 }, "2pr22(TW/SH) FT6 Gris": { section: 26.8 }, "4c18 FT6 Gris": { section: 17.16 },
    "6c18 FT6 Gris": { section: 22.35 }, "8c18 FT6 Gris": { section: 28.70 }, "10c18 FT6 Gris": { section: 36.39 },
    "2c14 FT6 Gris": { section: 23 }, "2c12 FT6 Gris": { section: 30.92 }
  }
};

// ==========================================
// 2. LOGIQUE DE L'APPLICATION
// ==========================================
let liste = [];

const categorieCable = document.getElementById("categorieCable");
const typeCable = document.getElementById("typeCable");
const quantite = document.getElementById("quantite");
const btnAjouter = document.getElementById("btnAjouter");
const listeCables = document.getElementById("listeCables");
const resultat = document.getElementById("resultat");
const nbFils = document.getElementById("nbFils");
const viderListe = document.getElementById("viderListe");
const typeConduitSelect = document.getElementById("typeConduit");
const btnPdf = document.getElementById("btnPdf");

function chargerCables() {
  typeCable.innerHTML = '<option value="">Câble</option>';
  const categorie = categorieCable.value;

  if (!cablesParType[categorie]) {
    console.error("❌ Catégorie introuvable :", categorie);
    return;
  }

  const cables = cablesParType[categorie];

  Object.keys(cables).forEach(nom => {
    const opt = document.createElement("option");
    opt.value = nom;
    opt.textContent = nom;
    typeCable.appendChild(opt);
  });

  if (typeCable.value === "") {
    typeCable.classList.add("champ-placeholder");
  } else {
    typeCable.classList.remove("champ-placeholder");
  }
  verifierBoutonAjouter();
}

function verifierBoutonAjouter() {
  btnAjouter.disabled = !(Number(quantite.value) > 0 && typeCable.value !== "");
}

function verifierBoutonVider() {
  if (viderListe) {
    viderListe.disabled = (liste.length === 0);
  }
}

function ajouterCable() {
  liste.push({
    qte: Number(quantite.value),
    type: typeCable.value,
    categorie: categorieCable.value
  });

  quantite.value = "";
  typeCable.value = "";
  typeCable.classList.add("champ-placeholder");
  
  // Désactive la coloration rouge du menu après l'ajout
  categorieCable.classList.remove("option-rouge");
  
  verifierBoutonAjouter();
  verifierBoutonVider();
  afficherListe();
  calculer();
}

function afficherListe() {
  listeCables.innerHTML = "";
  liste.forEach((c, i) => {
    const li = document.createElement("li");
    li.className = "ligne-cable";
    li.innerHTML = `<span>${c.qte} × ${c.type}</span><button onclick="supprimerCable(${i})">✖</button>`;
    listeCables.appendChild(li);
  });
}

window.supprimerCable = function(i) {
  liste.splice(i, 1);
  verifierBoutonVider();
  afficherListe();
  calculer();
};

function calculer() {
  const pdfContent = document.getElementById("pdfContent");
  
  if (!liste.length) {
    resultat.textContent = "Ajoute des câbles pour voir les résultats.";
    if (pdfContent) pdfContent.innerHTML = "";
    return;
  }

  const facteur = seuilsRemplissage[nbFils.value];
  const conduits = conduitsParType[typeConduitSelect.value];

  if (!conduits) {
    resultat.textContent = "Type de conduit invalide.";
    return;
  }

  let sectionTotale = 0;
  let detailCablesHtml = "";

  liste.forEach(c => {
    if (cablesParType[c.categorie] && cablesParType[c.categorie][c.type]) {
      const secUnitaire = cablesParType[c.categorie][c.type].section;
      sectionTotale += secUnitaire * c.qte;
      detailCablesHtml += `<li>${c.qte} × ${c.type} (${(secUnitaire * c.qte).toFixed(2)} mm²)</li>`;
    }
  });

  const conduit = conduits.find(c => sectionTotale <= c.section * facteur);

  let texteResultat = "";
  if (!conduit) {
    texteResultat = "<span style='color:red; font-weight:bold;'>❌ OVER (Hors limites)</span>";
  } else {
    texteResultat = `✅ Section totale : <strong>${sectionTotale.toFixed(2)} mm²</strong><br>✅ Taille minimale du conduit : <strong>${conduit.nom}</strong>`;
  }

  resultat.innerHTML = texteResultat;

  if (pdfContent) {
    pdfContent.innerHTML = `
      <p><strong>Type de conduit sélectionné :</strong> ${typeConduitSelect.value}</p>
      <p><strong>% de remplissage ciblé :</strong> ${nbFils.options[nbFils.selectedIndex].text}</p>
      <br>
      <h3>Liste des câbles inclus :</h3>
      <ul>${detailCablesHtml}</ul>
      <hr>
      <h3>Résultats du calcul :</h3>
      <p>${texteResultat}</p>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  
  categorieCable.addEventListener("change", () => {
    chargerCables();
    // Gestion de l'état rouge persistant sur sélection
    if (categorieCable.value === "FAS VITALINK") {
      categorieCable.classList.add("option-rouge");
    } else {
      categorieCable.classList.remove("option-rouge");
    }
  });
  
  typeCable.addEventListener("change", () => {
    if (typeCable.value !== "") {
      typeCable.classList.remove("champ-placeholder");
    } else {
      typeCable.classList.add("champ-placeholder");
    }
    verifierBoutonAjouter();
  });
  
  quantite.addEventListener("input", verifierBoutonAjouter);
  btnAjouter.addEventListener("click", ajouterCable);
  typeConduitSelect.addEventListener("change", calculer);
  nbFils.addEventListener("change", calculer);

  if (viderListe) {
    viderListe.addEventListener("click", () => {
      liste = [];
      categorieCable.classList.remove("option-rouge");
      afficherListe();
      calculer();
      verifierBoutonVider();
    });
  }

  if (btnPdf) {
    btnPdf.addEventListener("click", () => {
      calculer();
      window.print();
    });
  }

  chargerCables();
  verifierBoutonAjouter();
  verifierBoutonVider();
});
