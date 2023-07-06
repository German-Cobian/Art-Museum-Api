![](https://img.shields.io/badge/Microverse-blueviolet)

# Art-Museum-Api

 This Javascript app fetches artworks in the Art Institute of Chicago from an API (https://api.artic.edu/api/v1/artworks) and displays their image as well as their title and creator name. 

From the home page the user can input the artist, or title, or type of artwork that they are searching for: 

![Homepage](/assets/for-presentation/Initial-and-search-for.png?raw=true "Homepage")

The app will then render a listing of all the works that match the search criteria, displaying their image as well as their title and creator name.

![Listing pre-likes](/assets/for-presentation/List-pre-likes.png?raw=true "Artworks listing pre-likes")

The user can input "likes" on the artworks of his/her choice. 

![Listing post-likes](/assets/for-presentation/List-post-likes.png?raw=true "Artworks listing post-likes")

The comment button brings up a popup window with additional information regarding the artwork (type of artwork,  medium, dimensions, date, provenance of artist, category in which the artwork is included), the comments posted by other users (if any)...

![Pop-up](/assets/for-presentation/Pop-up-pre-comment.png?raw=true "Pop-up pre-comments")

... as well as the form for the current user to input a comment.

![Comment form](/assets/for-presentation/Comment-fill-in.png?raw=true "Comment form")

When the pop-up window is again accesed later, the user's comments will be displayed.

![Pop-up](/assets/for-presentation/Pop-up-pre-comment.png?raw=true "Pop-up post-comments")

The application makes API calls to the [Chicago Art Institute API](https://api.artic.edu/api/v1/artworks) retrieving information about the movies. Another API, [Involvement API](https://www.notion.so/Involvement-API-869e60b5ad104603aa6db59e08150270), is responsible for saving likes and fetching the number of likes, saving comments and fetching a list of comments. All those functionalities are tied-up in a single codebase.


## Built With

* HTML
* CSS
* JavaScript
* Chicago Art Institute API
* Involvement API


## Getting Started

To get a local copy up and running follow these simple example steps.


### Setup and Install

* Open your terminal - Windows: `Win + R`, then type `cmd` | Mac: `Command + space`, then type `Terminal`
* Navigate to a directory of your choosing using the `cd` command
* Run this command in your OS terminal: `git clone git@github.com:German-Cobian/Art-Museum-Api.git` to get a copy of the project
* Navigate to the project's directory using the `cd` command
* Input the following: `<project's file path in your computer>/Art-Museum-Api/index.html` into your web-browser's address bar


## Authors

👤 **German Cobian**
* GitHub: [@German Cobian](https://github.com/German-Cobian)
* Twitter: [@GermanCobian2](https://twitter.com/GermanCobian2)
* LinkedIn: [@German Cobian](https://www.linkedin.com/in/german-cobian/)


## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/German-Cobian/Art-Museum-Api/issues).


## Show your support

Give a ⭐️ if you like this project!


## Acknowledgments

Guidelines for this project supplied by [Microverse](https://github.com/microverseinc/curriculum-javascript/tree/main/group-capstone).


## 📝 License

This project is [MIT](https://github.com/German-Cobian/Art-Museum-Api/blob/main/LICENSE) licensed.
