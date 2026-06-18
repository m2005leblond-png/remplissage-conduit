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

/* ===============================
   REMPLISSAGE DU MENU CÂBLE
================================ */
function chargerCables() {
  typeCable.innerHTML = '<option value="">Câble</option>';
  
  if (!window.cablesParType) {
    console.error("❌ cablesParType est UNDEFINED");
    return;
  }

  const categorie = categorieCable.value;

  if (!cablesParType[categorie]) {
    console.error("❌ Aucune entrée pour :", categorie);
    return;
  }

  const cables = cablesParType[categorie];

  Object.keys(cables).forEach(nom => {
    const opt = document.createElement("option");
    opt.value = nom;
    opt.textContent = nom;
    typeCable.appendChild(opt);
  });

  // Gérer la classe placeholder visuelle
  if(typeCable.value === "") {
    typeCable.classList.add("champ-placeholder");
  } else {
    typeCable.classList.remove("champ-placeholder");
  }

  verifierBoutonAjouter();
}

/* ===============================
   VALIDATION DU BOUTON +
================================ */
function verifierBoutonAjouter() {
  btnAjouter.disabled = !(Number(quantite.value) > 0 && typeCable.value);
}

/* ===============================
   AJOUT DE CÂBLE
================================ */
function ajouterCable() {
  liste.push({
    qte: Number(quantite.value),
    type: typeCable.value,
    categorie: categorieCable.value
  });

  quantite.value = "";
  typeCable.value = "";
  typeCable.classList.add("champ-placeholder");
  
  afficherListe();
  calculer();
}

/* ===============================
   LISTE DES CÂBLES
================================ */
function afficherListe() {
  listeCables.innerHTML = "";
  liste.forEach((c, i) => {
    const li = document.createElement("li");
    li.className = "ligne-cable";
    li.innerHTML = `
      <span>${c.qte} × ${c.type}</span>
      <button onclick="supprimerCable(${i})">✖</button>
    `;
    listeCables.appendChild(li);
  });
}

function supprimerCable(i) {
  liste.splice(i, 1);
  afficherListe();
  calculer();
}

/* ===============================
   CALCUL DU REMPLISSAGE
================================ */
function calculer() {
  if (!liste.length) {
    resultat.textContent = "Ajoute des câbles pour voir les résultats.";
    return;
  }

  const facteur = seuilsRemplissage[nbFils.value];
  const conduits = conduitsParType[typeConduitSelect.value];

  if (!conduits) {
    resultat.textContent = "Type de conduit invalide.";
    return;
  }

  let sectionTotale = 0;

  liste.forEach(c => {
    if(cablesParType[c.categorie] && cablesParType[c.categorie][c.type]) {
        sectionTotale += cablesParType[c.categorie][c.type].section * c.qte;
    }
  });

  const conduit = conduits.find(c => sectionTotale <= c.section * facteur);

  if (!conduit) {
    resultat.innerHTML = "❌ OVER";
    return;
  }

  resultat.innerHTML = `
    ✅ Section totale des câbles : ${sectionTotale.toFixed(2)} mm²<br>
    ✅ Diamètre minimal requis : ${conduit.nom}
  `;
  
  // Préparer le contenu pour l'impression PDF si nécessaire
  const pdfContent = document.getElementById("pdfContent");
  if(pdfContent) {
     pdfContent.innerHTML = `<p><strong>Conduit :</strong> ${typeConduitSelect.value}</p>
                             <p><strong>Résultat :</strong> ${conduit.nom} (${sectionTotale.toFixed(2)} mm²)</p>`;
  }
}

/* ===============================
   EVENTS INITIALISATION
================================ */
document.addEventListener("DOMContentLoaded", () => {
  categorieCable.addEventListener("change", chargerCables);
  typeCable.addEventListener("change", () => {
    if(typeCable.value !== "") typeCable.classList.remove("champ-placeholder");
    verifierBoutonAjouter();
  });
  
  quantite.addEventListener("input", verifierBoutonAjouter);
  btnAjouter.addEventListener("click", ajouterCable);

  typeConduitSelect.addEventListener("change", calculer);
  nbFils.addEventListener("change", calculer);

  viderListe.addEventListener("click", () => {
    liste = [];
    afficherListe();
    calculer();
  });

  if(btnPdf) {
    btnPdf.addEventListener("click", () => {
      window.print();
    });
  }

  // APPEL INITIAL OBLIGATOIRE
  chargerCables();
});