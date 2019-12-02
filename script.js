class FlashCard {
	constructor(hint,info,id) {
		this.hin = hint;
		this.inf = info;
		this.hide = true;
		this.i = id;
	}
	get hint() {
		return this.hin;
	}
	get id(){
		return `${this.i}`;
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
	cards.splice(find(cards,id)[1],1);
	console.log(cards);
}

function update() {
	// console.log("updating");
	// console.log(cards);
	for(var i = 0; i < cards.length; i++) {
		// console.log("looping...");
		createCard(cards[i].id, cards[i].hint, cards[i].info);
		if(cards[i].hiding) {
			// console.log("Hint showing");
			document.getElementById(cards[i].id + "i").innerText = cards[i].hint;
			document.getElementById(cards[i].id + "s").innerText = "Show";
		}
		else {
			// console.log("Info showing");
			document.getElementById(cards[i].id + "i").innerText = cards[i].info;
			document.getElementById(cards[i].id + "s").innerText = "Hide";
		}
	}
}

function find(arr, id) {
	for(var i = 0; i < arr.length; i++) {
		if(arr[i].id === id)
			return [arr[i],i];
	}
}

let cards = [];
const findCard = (id) => {return find(cards,id)[0];};

cards.push(new FlashCard("Arrow Functions", "Shorthand for function() {}, use () => {} instead.", 0));
cards.push(new FlashCard("Let", "Keyword that hoists the variable following.", 1));

// var timer = setInterval(update,200);

document.addEventListener('click', (e) => {
	var c = e.target.getAttribute("class");
	var id = e.target.parentElement.id;
	console.log(e.target);
	console.log(e.target.parentElement);
	if(c === null) {
		update();
		return;
	} 
		if(c.includes("btn-large")) {
		// console.log(e.target.parentElement);
		findCard(id).swapHide();
		console.log(`Is hiding=${findCard(id).hiding}`);
	} else if (c.includes("delete btn-small")){
			console.log("Delete pressed" + id);
			deleteCard(id);
	} else if (c.includes("edit btn-small")){
			console.log("Edit pressed");
			e.target.parentElement.nextElementSibling.className = "hide";
			e.target.parentElement.nextElementSibling.nextElementSibling.className = "edit row";
			document.getElementById(id+"i").className= "hide";
	} else if (c.includes("save btn-small")){
			console.log("Save pressed");
			findCard(id).hint = e.target.previousElementSibling.previousElementSibling.value;
			findCard(id).info = e.target.previousElementSibling.value;
			e.target.parentElement.className = "edit row hide";
			document.getElementById(id+"i").className= "info";
			e.target.parentElement.nextElementSibling.className = "show btn-large";
	} else if (c.includes("new btn-small")){
			console.log("New pressed");
			cards.push(new FlashCard(e.target.previousElementSibling.previousElementSibling.value ,
															 e.target.previousElementSibling.value, cards.length));
	}
	update();
});