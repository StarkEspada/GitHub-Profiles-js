var inputSearchUser = document.querySelector(".input-search-user");
var search = document.querySelector(".search");
var resultSearch = document.querySelector(".result-search");
var resultRepositories = document.querySelector(".result-repositories")
var resultRepositoriesHeader = document.querySelector(".result-repositories-header")


var url = "https://api.github.com"



resultSearch.style.display = "none";
resultRepositories.style.display = "none"


search.addEventListener("click", function(){

	resultSearch.innerHTML = "";
	resultRepositories.innerHTML = "";
	resultSearch.style.display = "block";
	resultRepositories.style.display = "block"


		var inputValue = inputSearchUser.value

		var queryUser = "https://api.github.com/users/" + inputValue
		

		var resultRepositoriesHeader = document.createElement("div");
		resultRepositoriesHeader.classList.add("result-repositories-header");
		resultRepositories.appendChild(resultRepositoriesHeader)
		resultRepositoriesHeader.innerHTML = "Хранилище пользователя"

	 	var xhrUser = new XMLHttpRequest()
		xhrUser.open("GET", queryUser)
 		xhrUser.responseType = "json"
 		xhrUser.onload = () => {
 			var data = xhrUser["response"]	
 			
 			console.log(data)

 			var image = xhrUser["response"]["avatar_url"]
 			var name = xhrUser["response"]["name"]
 			var followers = xhrUser["response"]["followers"]
 			var publicRepositories = xhrUser["response"]["public_repos"]

 			var avatarUser = document.createElement("img")
 			avatarUser.classList.add("avatar")
 			avatarUser.setAttribute("src", image)
 			resultSearch.appendChild(avatarUser)


 			var nameBox = document.createElement("div")
 			nameBox.classList.add("name-box")
 			resultSearch.appendChild(nameBox)
 			nameBox.innerHTML = "Пользователь"

			var nameUser = document.createElement("div")
			nameUser.classList.add("name-user")
			nameBox.appendChild(nameUser)
			nameUser.innerHTML = name


			var followersNumberBox = document.createElement("div")
			followersNumberBox.classList.add("followers-number-box")
			resultSearch.appendChild(followersNumberBox)
			followersNumberBox.innerHTML = "Число подписчиков"

 			var followersNumber = document.createElement("div")
 			followersNumber.classList.add("followers-number")
 			followersNumberBox.appendChild(followersNumber)
 			followersNumber.innerHTML = followers
 			

 			var repositoriesBox = document.createElement("div")
 			repositoriesBox.classList.add("repositories-box")
 			resultSearch.appendChild(repositoriesBox)
 			repositoriesBox.innerHTML = "Размер Хранилища"

 			repositoriesBoxNumber = document.createElement("div")
 			repositoriesBoxNumber.classList.add("repositories-box-number")
 			repositoriesBox.appendChild(repositoriesBoxNumber)
 			repositoriesBoxNumber.innerHTML = publicRepositories
	}

	xhrUser.send()

	var urlRepositories = "https://api.github.com/users/" + inputValue + "/repos"

		var xhrRepositories = new XMLHttpRequest()
		xhrRepositories.open("GET", urlRepositories)
		xhrRepositories.responseType = "json"
		xhrRepositories.onload = () => {
			var dataRepositories =  xhrRepositories["response"]
			console.log(dataRepositories)
			for(var i = 0; i < dataRepositories.length; i++){
				console.log(xhrRepositories["response"][i]["html_url"])
				var boxRepositories = document.createElement("div")
				boxRepositories.classList.add("box-repositories")
				resultRepositories.appendChild(boxRepositories)
				var linkRepositories = document.createElement("a")
				linkRepositories.setAttribute("href", xhrRepositories["response"][i]["html_url"])
				linkRepositories.classList.add("boxRepositories")
				boxRepositories.appendChild(linkRepositories)
				linkRepositories.innerHTML = i + ": " + xhrRepositories["response"][i]["html_url"]
			}		
		}

	xhrRepositories.send()

 })
