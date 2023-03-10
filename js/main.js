let theInput = document.querySelector('.get-repos input');

let getButton = document.querySelector('.get-button');

let reposData = document.querySelector('.show-data');

getButton.onclick = function(){
    getRepos();
}

function getRepos(){
    if(theInput.value == ""){
        reposData.innerHTML = `<span>Please Write Github Username</span>`;
    }
    else{
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
        .then((response) => {
            return response.json();
        })
        .then((repos) => {
            reposData.innerHTML = "";
            repos.forEach((repo) => {
                let mainDiv = document.createElement('div');
                let repoName = document.createTextNode(repo.name);
                mainDiv.appendChild(repoName);
                let theUrl = document.createElement('a');
                let theUrlText = document.createTextNode('visit');
                theUrl.appendChild(theUrlText);
                theUrl.href = repo.html_url;
                theUrl.target = '_blank';
                mainDiv.appendChild(theUrl);
                let starsSpan = document.createElement('span');
                let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);
                starsSpan.appendChild(starsText);
                mainDiv.appendChild(starsSpan);
                mainDiv.classList.add('repo-box');
                reposData.appendChild(mainDiv);
            })
        })
    }
}