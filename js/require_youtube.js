(function() {
	var stringSearch = "";
	search_button.onclick = function(e){
		e.preventDefault();
		if (!search_text.value){
			console.log("Строка пуста");
		} else {
			stringSearch = search_text.value;
			var request = gapi.client.youtube.search.list({
			type: 'video',
			part: 'snippet',
			q:encodeURIComponent(stringSearch).replace(/%20/g, "+"),
			maxResults:3,
			order: 'viewCount'
			});

			var text;
			var textWrapper = document.createElement("div");

			request.execute(function(response) {
				var resultSearch = response.result;
				for (var key in resultSearch.items) {
					console.log(resultSearch.items[key]);
				}
			})
		};
	};
})();
function init(){
	gapi.client.load("youtube", "v3",function(){
		
	});
	gapi.client.setApiKey("AIzaSyAo6BNS_UCYrLS_sEq0O3-jusWqfmAyhWY");
};