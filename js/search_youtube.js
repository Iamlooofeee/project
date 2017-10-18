document.ready = function() {
	var stringSearch = "";
	"use strict"
	search_button.onclick = function(element){
		e.preventDefault();
		if (!search_text.value){
			console.log("Строка пуста");
		} else {
			stringSearch = search_text.value;

			var request = gapi.client.youtube.search.list({
			type:'video',
			part: 'snippet',
			q:encodeURIComponent(stringSearch).replace(/%20/g, "+"),
			maxResult:10,
			order: "viewCount",
			});
			request.execute(function(response) {
				var resultSearch = response.result;
				console.log(resultSearch);
			})
		};
	};
};
	function init(){
		gapi.client.load("youtube", "v3",function(){

		});
		gapi.client.setApiKey("AIzaSyAo6BNS_UCYrLS_sEq0O3-jusWqfmAyhWY");
	}