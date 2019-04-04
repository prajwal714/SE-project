var movies=[ {
	name: "Star Wars",
	img: "https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/9ada75bf-aba2-4259-b1ca-16d33469a46f/14.jpg"
},
{
	name: "V for Vendetta",
	img: "https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a6411636-c6e7-4524-8800-9a3e4e36787e/v.jpg"
},
{
	name: "Dexter",
	img: "https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/2e9fb1d6-3f65-4497-a97e-377886ffc869/12.jpg"
},
{
	name: "Detective Pikachu",
	img: "https://www.joblo.com/assets/images/joblo/posters/2019/04/D3LbtK7UEAAOMl1_thumb.jpg"
},
{
	name: "Avengers EndGame",
	img: "https://www.joblo.com/assets/images/joblo/posters/2019/04/avengers_endgame_ver45_xlg_thumb.jpg"
}

];

var numMovies=movies.length;
var liked_movies=[];
var liked=document.querySelector("#liked");
var next=document.querySelector("#next-button");
var movie_img=document.querySelector(".img");
var movie_name=document.querySelector(".name");
var button=document.querySelector(".button");
var pickedMovie,n=3;
var selected_num=0;

//to load movies for the first time we reload the page
generateRandomMovie();

function generateRandomMovie()
{
	pickedMovie=movies[Math.floor(Math.random()*movies.length)];
	movie_img.src=pickedMovie.img;
	movie_name.textContent=pickedMovie.name;
}



//event listerner for liking of a movie
liked.addEventListener("click",function()
{
	//increments the number of liked movies
	selected_num++;
	if(selected_num<=n)
	{
		liked_movies.push(pickedMovie);
		for(var i = movies.length - 1; i >= 0; i--) {
		    if(movies[i] === pickedMovie) {
		       movies.splice(i, 1);
		    }
		}
		console.log(liked_movies);
		console.log("You cliked liked button");
		window.alert("You Liked: "+pickedMovie.name);
		generateRandomMovie();
	}
	else
	{
		window.alert("You have already liked "+n+" movies");
	}
	
});
//event listerner for next button to display new movie
next.addEventListener("click",function()
{

	generateRandomMovie();
	console.log("you clicked the next button");
	
})
