(function() {
	var stringSearch = "";
	var idVideo = "";
	search_button.onclick = function(e){
		e.preventDefault();
		if (!search_text.value){
			console.log("Строка пуста");
		} else {

			// Get iformation about videos request for watches
			stringSearch = search_text.value;
			var request = gapi.client.youtube.search.list({
			type: 'video',
			part: 'snippet',
			q:encodeURIComponent(stringSearch).replace(/%20/g, "+"),
			maxResults:3,
			order: 'viewCount'
			});

			request.execute(function(response) {
				var resultSearch = response.result;
				for (var key in resultSearch.items) {
					idVideo += resultSearch.items[key].id.videoId;
					console.log(resultSearch.items[key]);
				}
			});

			// Get information about watches of videos

			var requestWatches = gapi.client.youtube.videos.list({
			type: 'video',
			part: 'contentDetails,statistics',
			order: 'viewCount',
			maxResults: 3,
			id: idVideo,
			});
			idVideo = "";

			requestWatches.execute(function(response) {
				var resultSearch = response.result;
				for (var key in resultSearch.items) {
					console.log(1)
					console.log(resultSearch.items[key].statistics.likeCount);
				}
			});
		};	
	};

})();

function init(){
	gapi.client.load("youtube", "v3",function(){
		
	});
	gapi.client.setApiKey("AIzaSyAo6BNS_UCYrLS_sEq0O3-jusWqfmAyhWY");
};