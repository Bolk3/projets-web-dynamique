let	state = {amount:0, year: 0, rate: 0};

const	button = document.createElement("div");
const	inputs = document.createElement("div");
const	hero = document.createElement("div");
const	menu = document.createElement("a");
const	tableau = document.createElement("table");
const	colonnes = document.createElement("tbody");
const	amount_input = create_input("amount", "number", 0, "amount");
const	year_input = create_input("year", "number", 0, "year");
const	rate_input = create_input("rate", "number", 0, "rate", 0.1)

menu.href = "../../index.html";
menu.innerText = "back to menu"

inputs.className = "inputs";
hero.className = "hero";
tableau.append(create_line("Periode", "Capital amorti", "Interets", "Capital restant du", "Mensualite"));

function	create_input(name ,type, value, update, step="1"){
	let	handler = document.createElement("div");
	let	holder = document.createElement("span");
	let	input = document.createElement("input");

	holder.innerText = name + ":";

	input.type = type;
	// NOTE: need a better way to setup step
	if (step != "1"){
		input.step = step;
	}
	input.value = value;
	input.onchange = () => {
		state[update] = input.value;
		create_content(state.amount, state.year, state.rate, colonnes);
	}
	input.min = 0

	handler.append(holder);
	handler.append(input);
	return (handler);
}

function	create_line() {
	let	handler = document.createElement("tr");

	for (const arg of arguments) {
		let cell = document.createElement("td");
		cell.innerText = arg;
		handler.append(cell);
	}

	return (handler);
}

function	restet_tableau(tableau) {
	while (tableau.firstChild) {
		tableau.firstChild.remove();
	}
}

function create_content(montant, annee, taux, tableau) {
    restet_tableau(tableau);

    let current_periode = 1;
    let restant = montant;
	let	inter = montant * (taux/100);

    while (current_periode <= annee * 12 ) {
        let capital = montant / (annee * 12); 

        let current_inter = inter * (taux/100) * annee;

        let mens = capital + current_inter;

        restant -= capital;
		inter -= current_inter;

        tableau.append(create_line(
            current_periode,
            capital.toFixed(0),
            current_inter.toFixed(0),
            restant.toFixed(0),
            mens.toFixed(0)
        ));

        current_periode++;
    }
}

button.className = "buttons";
button.append(menu);
inputs.append(amount_input);
inputs.append(year_input);
inputs.append(rate_input);
tableau.append(colonnes);
hero.append(tableau);
document.body.append(button);
document.body.append(inputs);
document.body.append(hero);
