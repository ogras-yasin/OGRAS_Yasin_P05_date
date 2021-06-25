// **** au chargement de la page l'ourson est lancee automatiquement *******
main();
function main() {
	getTeddies();
}

function getTeddies() {
	/* Récupération du produit avec l'id associé depuis le serveur */
	const getProductId = new URL(window.location.href).searchParams.get('_id');
	console.log(getProductId);

	fetch(`http://localhost:3000/api/teddies/${getProductId}`).then((response) => response.json()).then((response) => {
		let teddiesCardHTML = '';

		// Affichage du produit / personalisation
		teddiesCardHTML += `<div class="container">
        <div class="card mb-3" style="max-width: 2040px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img
                  src="${response.imageUrl}" alt="..." class="img-fluid"/>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h2 class="card-title">Ours en peluche : ${response.name}</h2>
                  <p class="card-text">${response.description}</p>
                  <p class="card-text"> prix :  ${(response.price / 100).toFixed(2).replace('.', ',')}€ </p> 
                  <p class="card-text">Choisir la couleur de votre produit :</p>
                  <!-- choix de couleurs  --!>
                  <select class="color__choice" name="colors" id="select__color">
                  </select> <br>
                  <strong>quantité :</strong> 1
                  <button class="btn btn-success mx-5 addCart">Ajouter panier</button>
                </div>
              </div>
            </div>
        </div>
    </div> `;

		document.getElementById('item__Product').innerHTML = teddiesCardHTML;

		//Création d'une function pour afficher mes choix de couleurs
		let choice = document.querySelector('.color__choice');

		response.colors.forEach(function(colors) {
			let opt = document.createElement('option');
			opt.value = colors;
			opt.textContent = colors;
			// on integre l'enfant au parent
			choice.appendChild(opt);
		});
		// return localStorage.getItem('cart')
		addItemCart(response);
	});

	// d'enregistrer les informations lors du clique du client su btn ajouter panier
	// enregistrer l'information localstorgae
	// reutilisler l'information( le nombre d'ourson que le client a choisi)
	// creer objet
	function addItemCart(item) {
		let refProduct = [
			{
				quantity: 0,
				teddyId: getProductId,
				nom: item.name,
				prix: (item.price / 100).toFixed(2).replace('.', ','), 
				image: item.imageUrl,
				couleur: item.colors /* a faire: executer la couleur choisi par la balise select*/
			}
		];

		const cart = localStorage.getItem('cart')
		
		// a chaque fois qu'on clique sur le btn, incrementer la quantite
		// pseudo-code: si on click btn(.addCart)  alors quantite incrementer

		// lorsque je clique ecrase les donnes enregistres precedemment 
		// du coup mettre des if else 
		// pseudo-code si null cree 
		// sinon recup get 
		document.querySelector('.addCart').addEventListener('click', function() {
			refProduct[0].quantity = refProduct[0].quantity + 1;

			console.log(refProduct[0].quantity);

			localStorage.setItem('cart', JSON.stringify(refProduct));
			// panier modif
			document.getElementById('quantite-elt-panier').textContent = `(${refProduct[0].quantity})`;


			
		});
	}
}



