// ==========================================
// 1. BASE DE DONNÉES INTÉGRÉE
// ==========================================
const seuilsRemplissage = {
  1: 0.53, 2: 0.31, 3: 0.40, 4: 0.38, 5: 0.35, 6: 0.60, 7: 0.50
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
    { nom: '2-1/2"', section: 3139 }, { nom: '3"', section: 4839 }, { nom: '3-1/2"', section: 6458 },
    { nom: '4"', section: 8311 }
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
    "18/2 - VITALink FAS_CIC_FA1802": { section: 47.05 }, "18/3 - VITALink FAS_CIC_FA1803": { section: 54.50 }, "16/2 - VITALink FAS_CIC_FA1602": { section: 52.17 },
    "16/3 - VITALink FAS_CIC_FA1603": { section: 61.38 }, "16/4 - VITALink FAS_CIC_FA1604": { section: 78.70 }, "16/8 - VITALink FAS_CIC_FA1608": { section: 131.71 },
    "14/2 - VITALink FAS_CIC_FA1402": { section: 62.77 }, "14/3 - VITALink FAS_CIC_FA1403": { section: 77.44 }, "14/4 - VITALink FAS_CIC_FA1404": { section: 91.95 },
    "14/8 - VITALink FAS_CIC_FA1408": { section: 169.26 }, "12/2 - VITALink FAS_CIC_FA1202": { section: 81.71 }, "12/8 - VITALink FAS_CIC_FA1208": { section: 186.75 },
    "18/2 SH - VITALink FAS_CIC_FA1802S": { section: 48.40 }, "18/3 SH - VITALink FAS_CIC_FA1803S": { section: 55.55 }, "16/2 SH - VITALink FAS_CIC_FA1602S": { section: 55.15 },
    "16/3 SH - VITALink FAS_CIC_FA1603S": { section: 63.19 }, "16/4 SH - VITALink FAS_CIC_FA1604S": { section: 81.07 }, "16/6 SH - VITALink FAS_CIC_FA1606S": { section: 114.80 },
    "16/8 SH - VITALink FAS_CIC_FA1608S": { section: 134.99 }, "14/2 SH - VITALink FAS_CIC_FA1402S": { section: 65.18 }, "14/3 SH - VITALink FAS_CIC_FA1403S": { section: 79.80 },
    "14/6 SH - VITALink FAS_CIC_FA1406S": { section: 134.99 }
  },
  "CONTROLE FT4": {
    "1pr24 SH FT4 - 8250": { section: 13.30 }, "2pr24 SH FT4 - 8251": { section: 25.88 }, "1pr22 FT4 - 8230": { section: 12.17 },
    "1pr22 Echelon FT4 - 8229": { section: 11.71 }, "1pr22 SH FT4 - 8240": { section: 10.22 }, "1pr22 SH 108 Ohms FT4 - 8247": { section: 14.99 },
    "1tr22 SH FT4 - 8241": { section: 11.40 }, "1tr22 SH 108 Ohms FT4 - 8248": { section: 20.47 }, "4c22 SH Thermocom FT4 - 8242": { section: 13.46 },
    "3pr22 FT4 - 8233": { section: 25.20 }, "1pr20 FT4 - 8220": { section: 10.80 }, "1pr20 SH FT4 - 8224": { section: 12.65 },
    "1tr20 FT4 - 8221": { section: 12.17 }, "2pr20 FT4 - 8222": { section: 30.66 }, "1pr18 FT4 - 8200": { section: 15.70 },
    "1pr18 SH FT4 - 8210": { section: 16.05 }, "1tr18 FT4 - 8201": { section: 17.72 }, "1tr18 SH FT4 - 8211": { section: 18.10 },
    "2pr18 SH FT4 - 8212": { section: 37.21 }, "4c18 FT4 - 8202": { section: 22.35 }, "6pr18 SH FT4 - 8254": { section: 95.44 },
    "1pr16 FT4 - 8190": { section: 30.66 }, "1pr16 SH FT4 - 8217": { section: 26.57 }, "1tr16 FT4 - 8191": { section: 29.19 },
    "1pr14 FT4 - 8180": { section: 36.39 }, "CAT5e FT6": { section: 24.52 }, "CAT6 FT6": { section: 31.67 },
    "CAT6a FT6": { section: 55.18 }
  },
  "CONTROLE FT6": {
    "1pr24 SH FT6 - 8320": { section: 9.93 }, "1pr24 SH FT6 - 8321": { section: 9.93 }, "1pr22 SH 108 Ohms FT6 - 8302": { section: 15.87 },
    "1pr22 SH 120 Ohms FT6 - 8302A": { section: 13.30 }, "1tr22 SH 108 Ohms FT6 - 8304R": { section: 17.34 }, "1tr22 SH FT6 - 8304": { section: 14.99 },
    "2pr22 TW/SH FT6": { section: 26.80 }, "4c22 FT6 - BAF66": { section: 11.55 }, "4c22 Thermocom FT6  - 8275": { section: 10.07 },
    "4c22 SH Thermocom FT6 - 8305": { section: 10.95 }, "6c22 FT6 - BAF95": { section: 14.99 }, "8c22 FT6 - BAF97": { section: 17.53 },
    "12c22 FT6 - XXXXX": { section: 21.09 }, "1pr20 FT6 - 8290": { section: 9.65 }, "1pr20 Echelon FT6 - 8293": { section: 7.79 },
    "1pr20 SH FT6 - 8300": { section: 9.93 }, "1tr20 FT6 - 8291": { section: 10.80 }, "1pr18 FT6 - 8270": { section: 12.65 },
    "1pr18 SH FT6 - 8280": { section: 12.97 }, "1tr18 FT6 - 8271": { section: 14.30 }, "1tr18 SH FT6 - 8281": { section: 15.70 },
    "2pr18 SH FT6 - 8282": { section: 30.66 }, "4c18 FT6 - 8272": { section: 17.16 }, "4c18 FT6 - B7562": { section: 17.16 },
    "4C18 SH FT6 - 8284": { section: 18.29 }, "6c18 FT6 - B7564": { section: 22.77 }, "8c18 FT6 - B7566": { section: 30.66 },
    "10c18 FT6 - B7568": { section: 38.60 }, "12c18 SH FT6 - 8262": { section: 38.88 }, "1pr16 FT6 - 8260": { section: 15.70 },
    "1pr16 SH FT6 - 8287": { section: 17.53 }, "1tr16 FT6 - 8261": { section: 19.47 }, "1pr14 FT6 - 8258": { section: 28.88 },
    "2c14 FT6": { section: 23 }, "2c12 FT6": { section: 30.92 }, "CAT5e FT6": { section: 20.27 },
    "CAT6 FT6": { section: 29.19 }, "CAT6a FT6": { section: 45.60 }
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
const alerteZoneSecurisee = document.getElementById("alerteZoneSecurisee");

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
  
  if (alerteZoneSecurisee) {
    alerteZoneSecurisee.style.display = "none";
  }
  
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
  
  // 1. Calculer la quantité totale de câbles et analyser les types présents
  let quantiteTotaleCables = 0;
  let uniquementRwRwu = true; // Reste vrai tant qu'on ne trouve pas une autre catégorie

  liste.forEach(c => {
    if (cablesParType[c.categorie] && cablesParType[c.categorie][c.type]) {
      const secUnitaire = cablesParType[c.categorie][c.type].section;
      sectionTotale += secUnitaire * c.qte;
      quantiteTotaleCables += parseInt(c.qte, 10);
      detailCablesHtml += `<li>${c.qte} × ${c.type} (${(secUnitaire * c.qte).toFixed(2)} mm²)</li>`;
      
      // Si la catégorie du câble n'est ni RW ni RWU, on bascule à faux
      if (c.categorie !== "RW" && c.categorie !== "RWU") {
        uniquementRwRwu = false;
      }
    }
  });

  // 2. Récupérer la valeur sélectionnée dans le menu déroulant
  const optionSelectionnee = nbFils.value; 

  // 3. Logique des avertissements dynamiques
  let avertissementHtml = "";
  
  if (quantiteTotaleCables === 1) {
    if (optionSelectionnee === "1") {
      avertissementHtml = "";
    } else if (optionSelectionnee === "6") {
      avertissementHtml = `<p style="color: #d32f2f; font-weight: bold; margin-bottom: 15px;">⚠️ Attention : Pour 1 câble, le % de remplissage doit être égal ou inférieur à 53%.</p>`;
    } else {
      avertissementHtml = `<p style="color: #2e7d32; font-weight: bold; margin-bottom: 15px;">💡 Astuce : Pour 1 câble, le % de remplissage peut être jusqu'à 53%.</p>`;
    }
  } else if (quantiteTotaleCables === 2) {
    if (optionSelectionnee !== "2") {
      avertissementHtml = `<p style="color: #d32f2f; font-weight: bold; margin-bottom: 15px;">⚠️ Attention : Pour 2 câbles, le % de remplissage ne doit pas être supérieur à 31%.</p>`;
    } else {
      avertissementHtml = "";
    }
  } else if (quantiteTotaleCables >= 3 && uniquementRwRwu) {
    // Règle 3 câbles et + : Option 6 = 60%, Option 7 = 50%
    if (optionSelectionnee === "6" || optionSelectionnee === "7") {
      avertissementHtml = `<p style="color: #d32f2f; font-weight: bold; margin-bottom: 15px;">⚠️ Attention : Pour le RW et RWU, le % de remplissage ne doit pas être supérieur à 40%.</p>`;
    } else {
      avertissementHtml = "";
    }
  }

  const conduit = conduits.find(c => sectionTotale <= c.section * facteur);

  let texteResultat = "";
  if (!conduit) {
    texteResultat = "<span style='color:red; font-weight:bold;'>❌ OVER (Hors limites)</span>";
  } else {
    const texteComplet = nbFils.options[nbFils.selectedIndex].text;
    const pourcentageTexte = texteComplet.split("(")[0].trim();
    const sectionAutorisee = conduit.section * facteur;

    texteResultat = `
      ✅ Section totale : <strong>${sectionTotale.toFixed(2)} mm²</strong><br>
      ✅ Taille minimale du conduit : <strong>${conduit.nom}</strong><br>
      ✅ Section totale autorisée pour ${pourcentageTexte} du conduit ${conduit.nom} : <strong>${sectionAutorisee.toFixed(2)} mm²</strong>
    `;
  }

  // 4. Application des textes à l'écran et dans le PDF
  resultat.innerHTML = avertissementHtml + texteResultat;

  if (pdfContent) {
    pdfContent.innerHTML = `
      ${avertissementHtml}
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
    if (alerteZoneSecurisee) {
      if (categorieCable.value === "FAS VITALINK") {
        alerteZoneSecurisee.style.display = "block";
      } else {
        alerteZoneSecurisee.style.display = "none";
      }
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
      if (alerteZoneSecurisee) alerteZoneSecurisee.style.display = "none";
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
