class FlashCard {
	constructor(hint,info) {
		this.hin = hint;
		this.inf = info;
		this.hide = true;
	}
	get hint() {
		return this.hin;
	}
	get info() {
		return this.inf;
	}
	set hint(h) {
		this.hin = h;
	}
	set info(i) {
		this.inf = i;
	}
	swapHide() {
		this.hide = !this.hide;
	}
	get hiding() {
		return this.hide;
	}
}
cards_element = document.getElementById("cards");

function createCard(id, hin, inf) {
	if(!id)
		return;
	if(document.getElementById(id) === null) {
		var node = document.createElement("div");
		node.className = "card-panel contain";
		node.id = id;

		var row = document.createElement("div");
			row.id = id;
			var del_btn = document.createElement("button");
			var edit_btn = document.createElement("button");
			del_btn.className="red darken-3 delete btn-small";
			edit_btn.className="green edit btn-small";
			del_btn.appendChild(document.createTextNode("Delete"));
			edit_btn.appendChild(document.createTextNode("Edit"));
			row.appendChild(del_btn);
			var divide = document.createElement("div");
			divide.className = "col s4";
			row.appendChild(divide);
			row.appendChild(edit_btn);

		var info = document.createElement("p");
		info.className="info";
		info.id = id + "i";
		var edit = document.createElement("div");
		edit.className= "edit row hide";
		edit.id = id;
			var hint = document.createElement("input");
			hint.type = "text";
			hint.value = hin;
			var info_e = document.createElement("input");
			info_e.type = "text";
			info_e.value = inf;
			var save = document.createElement("button");
			save.className = "green save btn-small";
			save.innerText = "Save";
			edit.appendChild(hint);
			edit.appendChild(info_e);
			edit.appendChild(save);

		var show = document.createElement("button");
		show.className="show btn-large";
		show.id = id + "s";

		show.appendChild(document.createTextNode("Show"));
		node.appendChild(row);
		node.appendChild(info);
		node.appendChild(edit);
		node.appendChild(show);
		cards_element.appendChild(node);
	}
	return;
}
function deleteCard(id) {
	document.getElementById(id).remove();
	cards.splice(id,1);
}

function update() {
	// console.log("updating");
	// console.log(cards);
	for(var i = 0; i < cards.length; i++) {
		// console.log("looping...");
		createCard(`${i}`, cards[i].hint, cards[i].info);

		if(cards[i].hiding) {
			// console.log("Hint showing");
			document.getElementById(`${i}i`).innerText = cards[i].hint;
			document.getElementById(`${i}s`).innerText = "Show";
		}
		else {
			// console.log("Info showing");
			document.getElementById(`${i}i`).innerText = cards[i].info;
			document.getElementById(`${i}s`).innerText = "Hide";
		}
	}
}

let cards = [];

cards.push(new FlashCard("Arrow Functions", "Shorthand for function() {}, use () => {} instead."));
cards.push(new FlashCard("Let", "Keyword that hoists the variable following."));

var timer = setInterval(update,500);

document.addEventListener('click', (e) => {
	var c = e.target.getAttribute("class");
	var id = e.target.parentElement.id;
	console.log(e.target);
	console.log(e.target.parentElement);
	if(c === null) return;
	if(c.includes("btn-large")) {
			console.log("show button clicked");
			// console.log(e.target.parentElement);
			cards[id].swapHide();
	} else if (c.includes("delete btn-small")){
			console.log("Delete pressed");
			deleteCard(id);
	} else if (c.includes("edit btn-small")){
			console.log("Edit pressed");
			e.target.parentElement.nextElementSibling.className = "hide";
			e.target.parentElement.nextElementSibling.nextElementSibling.className = "edit row";
			document.getElementById(id+"i").className= "hide";
	} else if (c.includes("save btn-small")){
			console.log("Save pressed");
			cards[id].hint = e.target.previousElementSibling.previousElementSibling.innerText;
			cards[id].info = e.target.previousElementSibling.innerText;
			e.target.parentElement.className = "edit row hide";
			document.getElementById(id+"i").className= "info";
			e.target.parentElement.nextElementSibling.className = "show btn-large";
	} else if (c.includes("new btn-small")){
			console.log("New pressed");
			cards.push(new FlashCard(e.target.previousElementSibling.previousElementSibling.innerText ,
															 e.target.previousElementSibling.innerText));
	}
});