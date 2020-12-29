// const tester = fetch("../lang/pt-br.json").then(response => response.json()).then(json => console.log(json)); Test of importing a JSON file for translation.

"use strict"; // Enables strict mode to make errors more visible.

// Event Listener
document.getElementById('loginButton').addEventListener("click", login);
document.getElementById('logout').addEventListener("click", logoutUser);
document.getElementById('back').addEventListener("click", () => {render(renderStats.previousScreen)})
document.getElementById('searchButton').addEventListener("click", search)
document.getElementById('searchPageActive').addEventListener("click", () => {render('searchPage')})
document.getElementById('about').addEventListener("click", () => {render('aboutpage')})
document.querySelector('div#navigation img#notes').addEventListener("click", () => {
    render('koganotesPage')
})
document.querySelector('#searchTerms').addEventListener("keydown", (k) => {
    if (k.key === "Enter") {
        return search()
    }
})

const server = {
    url: localStorage.getItem('server')
}

/*
Profile information saved. In the case of variable items, it will constantly change every time you open the popup. The Id and server will not change unless the user "logout".
*/
const profile = {
    server: server.url,
    url: `${server.url}/user/${localStorage.getItem('userid')}`,
    badges: `${server.url}/user/${localStorage.getItem('userid')}/badge/`,
    id: `${localStorage.getItem('userid')}`,
    errors: `${localStorage.getItem('errors')}`
}

const renderStats = {
    activeScreen: '',
    previousScreen: ''
}

// Render screens
function render(action) {
    // Identificadores das telas.
    const ScreenElem = {
        login_Page: document.getElementById('loginpage'),
        profile_View: document.getElementById('profileview'),
        search_Page: document.getElementById('searchPage'),
        navigation_Menu: document.getElementById('navigation'),
        error_Page: document.getElementById('errorpage'),
        search_Next: document.getElementById('searchnextpage'),
        about_Page: document.getElementById('aboutpage'),
        pages: document.querySelectorAll('.pages'),
        koganotes_Page: document.querySelector('div#koganotes')
    }

    console.log(ScreenElem.pages);

    // Actions
    switch(action) {
        case 'loginPage':
            loginPage(true);
            profileView(false);
            searchPage(false);
            navigationMenu(false)
            aboutPage(false);
            koganotePage(false);
            console.log(`Render action: ${action}, sucess`);
            break;
        case 'profileView':
            profileView(true);
            loginPage(false);
            searchPage(false);
            navigationMenu(true)
            aboutPage(false);
            koganotePage(false);
            console.log(`Render action: ${action}, sucess`);
            break;
        case 'searchPage':
            searchPage(true);
            profileView(false);
            loginPage(false);
            aboutPage(false);
            koganotePage(false);
            console.log(`Render action: ${action}, sucess`);
            break;
        case 'aboutpage':
            searchPage(false);
            profileView(false);
            loginPage(false);
            aboutPage(true)
            koganotePage(false);
            console.log(`Render action: ${action}, sucess`);
            break;
        case 'errorPage':
            errorPage(true);
            searchPage(false);
            profileView(false);
            loginPage(false);
            koganotePage(false);
            console.log(`Render action: ${action}, sucess`);
            break;
        case 'koganotesPage':
            koganotePage(true);
            profileView(false);
            loginPage(false);
            searchPage(false);
            aboutPage(false);
        default:
          return console.log(`Render action: ${action}`);
    }
    

    function koganotePage(value) {
        if (value == true) {
            let newNote = {
                'name': document.querySelector('#typeNoteName'),
                'link': document.querySelector('#typeProjectURL'),
                'note': document.querySelector('#typeNotes')
            }
            newNote.name.value = '';
            newNote.link.value = '';
            newNote.note.value = '';
            ScreenElem.koganotes_Page.style.display = 'flex';
            renderStats.previousScreen = renderStats.activeScreen;
            renderStats.activeScreen = 'koganotePage';
            hiddenPages(true);
        } else {
            ScreenElem.koganotes_Page.style.display = 'none';
        }
    }
    function loginPage(value) {
        if (value == true) { 
            // Show the login screen.
            ScreenElem.login_Page.style.display = 'flex';
            renderStats.previousScreen = renderStats.activeScreen;
            renderStats.activeScreen = 'loginPage';
            verifyScreen(value);
        } else { 
            // Hides the login screen.
            ScreenElem.login_Page.style.display = 'none';
        }
    }
    function profileView(value) {
        if (value == true) {
            ScreenElem.profile_View.style.display = 'block';
            hiddenPages(false);
            renderStats.previousScreen = '';
            renderStats.activeScreen = 'profileView';
            verifyScreen(value);
        } else {
            ScreenElem.profile_View.style.display = 'none';
        }
    }
    function searchPage(value) {
        if (value == true) {
            ScreenElem.search_Page.style.display = 'inline-block';
            hiddenPages(true);
            ScreenElem.search_Next.style.display = 'none';
            renderStats.previousScreen = renderStats.activeScreen;
            renderStats.activeScreen = 'searchPage';
            verifyScreen(value)
        } else {
            ScreenElem.search_Page.style.display = 'none';
        }
    }
    function errorPage(value) {
        if (value == true) { 
            // Shows the error screen.
            ScreenElem.error_Page.style.display = 'flex';
            hiddenPages(true);
            renderStats.previousScreen = renderStats.activeScreen;
            renderStats.activeScreen = 'loginPage';
            verifyScreen(value)
        } else { 
            // Hides the error screen.
            ScreenElem.error_Page.style.display = 'none';
        }
    }
    function aboutPage(value) {
        if (value == true) {
            ScreenElem.about_Page.style.display = 'flex';
            hiddenPages(true)
            renderStats.previousScreen = renderStats.activeScreen;
            renderStats.activeScreen = 'aboutpage';
            verifyScreen(value)
        } else { 
            ScreenElem.about_Page.style.display = 'none';
        }
    }

    function navigationMenu(value) {
        if (value == true) {
            ScreenElem.navigation_Menu.style.display = 'inline-block';
        } else {
            ScreenElem.navigation_Menu.style.display = 'none';
        }
    }

    function hiddenPages(value) {
        if (value == true) {
            ScreenElem.pages.forEach((item) => {
                item.style.display = 'none';
                console.log("hidden", item,item.style.display);
            })
        } else {
            ScreenElem.pages.forEach((item) => {
                item.style.display = 'inline-block';
                console.log("show", item.style.display);
            })
        }
    }

    function verifyScreen(screen) {
        let back = document.getElementById('back')
        if (screen !== "profileView" || screen !== "") {
            back.style.display = 'inline-block';
        } else if (renderStats.previousScreen == renderStats.activeScreen) {
            renderStats.previousScreen = "";
        } else {
            back.style.display = 'none';
        }
    
    console.log(`Active: ${renderStats.activeScreen}`, `Previous: ${renderStats.previousScreen}`)
    }
    
}

function checkSave() {
    /* Check whether the user is already logged in or not with an ID */
    if (localStorage.getItem('userid') == null || localStorage.getItem('userid') == '' ||        localStorage.getItem('userid') == undefined) {
        localStorage.setItem('server', '');
        render('loginPage');
    } else {
        profile.url = `${server.url}/user/${localStorage.getItem('userid')}`
        profile.badges = `${server.url}/user/${localStorage.getItem('userid')}/badge/`
        console.log(profile.url, profile.badges);
        render('profileView');
        fetchprofiledata();
    }
}

function logoutUser() {
    /* Disconnect the user ID */
    document.getElementById('profileview').style.display = 'none';
    document.getElementById('errorpage').style.display = 'none';
    localStorage.setItem('userid', '');
    checkSave();
}

function login() {
    // Get ID from the box and try to login.
    let id = document.getElementsByClassName('inputbox');
    let serverValue = document.getElementById('server-select').value
    if (serverValue == '') {
        return alert('Please select a server to continue.');
    }
    console.log(serverValue);
    checkID(id[0].value, serverValue);
}

function checkID(id, serverValue) {
    // Check login before saving.
    console.log('My ID is', id);
    fetch(`${serverValue}/user/${id}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        localStorage.setItem('userid', `${id}`);
        localStorage.setItem('server', `${serverValue}`);
        server.url = serverValue;
        checkSave();
    })
    .catch((error) => {
        localStorage.setItem('userid', '');
        localStorage.setItem('server', '');
        alert('Connection failed, please try again.');
        console.error('Error:', error);
    });
}


let userinfo = {
    profile: document.getElementById('profileurl'),
    avatar: document.getElementById('avatar'),
    nome: document.getElementById('name'),
    gold: document.getElementById('golds'),
    xp: document.getElementById('xp'),
    nextxp: document.getElementById('nxp'),
    level: document.getElementById('level'),
    levelimg: document.getElementById('levelimg'),
    badgesElem: document.getElementById('badges')
}



function fetchprofiledata() {
    var profiledata = '';
    fetch(profile.url).then((resp) => {
        return resp.json();
    }).then((res) => {
        profiledata = res;
        console.log(profiledata);
        userinfo.avatar.src = `https:${profiledata.data.images.large}`;
        userinfo.profile.href = `${profile.server}/profile/${profile.id}`;
        userinfo.profile.target = '_blank';
        userinfo.nome.innerText = profiledata.data.username;
        userinfo.gold.innerText = profiledata.data.gold;
        let xpx = `${profiledata.data.xp} / ${profiledata.data.next_level_xp} (${profiledata.data.xp_to_next_level})`;
        userinfo.xp.innerText = xpx;
        userinfo.levelimg.src = `https:${profiledata.data.level_images.medium}`;
    }).catch((err) => {
        document.getElementById('profileview').style.display = 'none';
        document.getElementById('errorpage').style.display = 'block';
    })

    fetch(profile.badges).then((resp) => {
        return resp.json();
    }).then((res) => { 
        let badge = res;
        console.log(`I have ${badge.data.length} badges.`);
        userinfo.badgesElem.innerHTML = '';
        badge.data.forEach((item, i) => {
            console.log('Badges forEach:', item);
            let link = document.createElement('a');
            link.href = `https://kogama.gamepedia.com/Special:Search?search=${badge.data[i].name}&go=Go`;
            link.target = '_blank';
            let node = document.createElement("img");
            node.src = `https:${badge.data[i].images.medium}`;
            node.title = `${badge.data[i].name}`;
            node.className = 'badgesIMG';
            userinfo.badgesElem.appendChild(link);
            link.appendChild(node);
        })

    }).catch((err) => {
        var node = document.createElement("p");
        var text = document.createTextNode("Não foi possível baixar as informações sobre os emblemas desse perfil.");
        node.appendChild(text);
        userinfo.badgesElem.appendChild(node);
        console.log("Não foi possível baixar as informações dos emblemas.");
        console.error(err);
    })
}


/*
Saves the next link to be created on the button that takes the user to the next page of the list of items.
*/
const searchstatus = {
    nextUrl: ''
}

function nextURL(control, link) {
    if (control == 'Next') {
        searchstatus.nextUrl = `${link}`;
        console.log('Proximo link adicionado: ', searchstatus.nextUrl);
    } else {
        searchstatus.nextUrl = '';
        console.log('Links limpos.');
    }
}


// Search terms validation.
function search() {
    let terms = document.getElementById('searchTerms').value;
    terms = terms.replace(' ', '+');
    let item = document.getElementById('item-select').value;
    if (item == '') {
        return alert('You need to select which item you want to search. (Models or Avatars)');
    } else {
        console.log(terms);
        searchItem(terms, item);
    }
}

/*
Search for the requested item in the KoGaMa API, which returns a JSON with this data.
If it is a "next page", it injects the entire url.
*/
function searchItem(name, item, fullurl) {
    let avatarList = '';
    let url = '';
    if (typeof(fullurl) === 'undefined') {
        url = `${server.url}/model/market/?q=${name}&category=${item}`;
        console.log(url);
    } else {
        url = fullurl;
        console.log(url);
    }

    fetch(`${url}`).then((resp) => {
        return resp.json()
    }).then((res) => {
        let avatarList = res;
        console.log(avatarList, avatarList.data.length);
        var searchElements = document.getElementById('searchElements');
        searchElements.innerHTML = '';
        if (avatarList.data.length == 0) {
            alert('No results.');
        }
        avatarList.data.forEach((item, i) => {
            let link = document.createElement("a");
            link.href = `${server.url}/marketplace/model/${avatarList.data[i].product_id}`;
            link.target = '_blank';
            let node = document.createElement('img');
            node.src = `https:${avatarList.data[i].images.small}`;
            node.title = `${avatarList.data[i].name}`;
            node.className = 'itensIMG';
            link.appendChild(node);
            searchElements.appendChild(link);
        })
        if (avatarList.paging.next_url != "") {
            searchNav.innerHTML = '';
            let node = document.createElement('input');
            node.type = 'button';
            node.id = 'searchnextpage';
            node.value = 'Next Page';
            searchNav.appendChild(node);
            return document.getElementById('searchnextpage').addEventListener("click", () => {searchItem("", "", `${server.url}${avatarList.paging.next_url}`)}); 
        } else {
            return document.getElementById('searchnextpage').style.display = 'none';
        }

    }).catch((err) => {
        console.log('Ocorreu um erro inesperado');
        console.log(`URL: ${server.url}/model/market/?q=${name}&category=avatar`);
    })
}

checkSave()

