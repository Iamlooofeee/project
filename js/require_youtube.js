(function() {
	var stringSearch = "";
	var idVideo = "";
	search_button.onclick = function(e){
		e.preventDefault();
		if (!search_text.value){
			console.log("Строка пуста");
		} else {

			stringSearch = search_text.value;
			var watchesVideos;
			getInformation(stringSearch);

		};	
	};

})();

function init(){
	gapi.client.load("youtube", "v3",function(){
		
	});
	gapi.client.setApiKey("AIzaSyAo6BNS_UCYrLS_sEq0O3-jusWqfmAyhWY");
};

function getInformation(search) {
			var request = gapi.client.youtube.search.list({
			type: 'video',
			part: 'snippet',
			q:encodeURIComponent(search).replace(/%20/g, "+"),
			maxResults:3,
			order: 'viewCount'
			});

			request.execute(function(response) {
				var resultSearch = response.result;
				for (var key in resultSearch.items) {

					idVideo = resultSearch.items[key].id.videoId;
					getCountView(idVideo);
					console.log(resultSearch.items[key]);
				}
			});
}

function getCountView(id) {
			var requestWatches = gapi.client.youtube.videos.list({
			type: 'video',
			part: 'contentDetails,statistics',
			order: 'viewCount',
			maxResults: 3,
			id: id,
			});
			idVideo = "";

			requestWatches.execute(function(response) {
				var resultSearch = response.result;
				for (var key in resultSearch.items) {

					watchesVideos = resultSearch.items[key].statistics.viewCount;
					console.log("//" + watchesVideos);

				}
			});
}