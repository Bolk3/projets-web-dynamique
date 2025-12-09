var	current_layout = "Azerty";
var	current_theme = "Light";

async function setup(){
	const	data = await loadData('./layouts.json');
	const	buttons = document.createElement("div");
	const	menu = document.createElement("a");
	const	toggle = document.createElement("a");
	const	layout_term = document.createElement("select");
	const	reset_button = document.createElement("a");
	const	layout = document.createElement("div");
	const	pressed = document.createElement("div");
	const	reset = (elem) => {
		while (elem.firstChild)
		{
			elem.firstChild.remove();
		}
	};
	const	update = () => {
		reset(layout);
		reset(pressed);

		data[current_layout].forEach((e) => {
			const	row = document.createElement("div");
			row.className = "row";
			e.forEach((letter) => {
				const	a = document.createElement("a");
				a.innerHTML = letter;
				a.onclick = () => {
					const	dup = document.createElement("a");
					dup.innerHTML = letter;
					pressed.append(dup);
				}
				row.append(a);
			})
			layout.append(row);
		});
	};

	menu.href = "../../index.html";
	menu.innerHTML = "back to menu"

	toggle.append(current_theme + " mode");
	toggle.onclick = () => {
		document.body.className = current_theme 
		current_theme == "Light" ? current_theme = "Dark" : current_theme = "Light";
		toggle.innerHTML = (current_theme == "Light" ? "Dark" : "Light") + " mode";
	};

	layout_term.onchange = () => {
		current_layout = layout_term[layout_term.selectedIndex].value;
		update();
	}

	Object.keys(data).forEach((key) => {
		const option = document.createElement("option");
		option.value = key;
		option.append(key);
		layout_term.append(option);
	});

	reset_button.onclick = () => {
		reset(pressed);
	};
	reset_button.innerHTML = "reset";

	update()
	layout.className = "layout";
	pressed.className = "pressed";

	buttons.className = "buttons";
	buttons.append(menu);
	buttons.append(toggle);
	buttons.append(layout_term);
	buttons.append(reset_button);

	document.body.className = current_theme;
	document.body.append(buttons);
	document.body.append(layout);
	document.body.append(pressed);
}

async function	loadData(url)
{
	const res = await fetch(url);
	const data = await res.json();
	return data;
}
