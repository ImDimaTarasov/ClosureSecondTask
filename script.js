const app = () => {
	const inputUrl = document.querySelector("#urlInput");
	const btn = document.querySelector(".btn");
	const textArea = document.querySelector(".card-text");
	const spinner = document.querySelector(".loading");

	const request = makeRequestUsingURL();
	const usedUrls = [];

	const urlFromUser = {
		url: "https://jsonplaceholder.typicode.com/todos/1",
		errorMessage: "Sorry, this url has already been, try another url",
	};
	inputUrl.value = urlFromUser.url;

	const checkUrl = (url) => {
		if (usedUrls.includes(url)) {
			return "this url has already been";
		}

		usedUrls.push(url);
		return url;
	};

	const getValueFromInput = (e) => {
		urlFromUser.url = e.target.value;
		btn.disabled = false;
	};
	const makeRequest = (e) => {
		e.preventDefault();

		loading(true);
		setTimeout(() => {
			request(checkUrl(urlFromUser.url))
				.then((data) => {
					textArea.appendChild(createContent(data));
				})
				.then(loading(false))
				.catch(() => {
					errorMessage();
				});
		}, 1000);
	};
	const loading = (load) => {
		if (load) {
			textArea.textContent = "";
		}
		spinner.classList.toggle("active");
		btn.disabled = load;
	};
	const errorMessage = () => {
		btn.disabled = true;
		textArea.textContent = urlFromUser.errorMessage;
	};
	const createContent = (data) => {
		const content = document.createElement("div");

		if (data.length > 0) {
			const listOfItems = document.createElement("ul");
			data.forEach((item) => {
				const itemOfList = document.createElement("li");
				itemOfList.innerHTML = `
				Name: ${item.first_name},
				Last name: ${item.last_name},
				Email: ${item.email}
				`;
				listOfItems.appendChild(itemOfList);
			});
			content.appendChild(listOfItems);
			return content;
		}
		content.textContent = `
			Name: ${data.first_name},
			Last name: ${data.last_name},
			Email: ${data.email}
		`;

		return content;
	};

	const init = () => {
		inputUrl.addEventListener("change", (e) => getValueFromInput(e));
		btn.addEventListener("click", (e) => makeRequest(e));
	};
	return {
		init: init,
		destroy: () => {
			inputUrl.removeEventListener("change", getValueFromInput);
			btn.removeEventListener("click", makeRequest);
		},
	};
};
app().init();
