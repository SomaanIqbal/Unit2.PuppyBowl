const baseApiUrl = ' https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF'

const state = {
    allPlayers: [],
}

const getAllPlayers = async () => {
    const response = await fetch(`${baseApiUrl}/players`);
    const jsonResponse = await response.json();
    const playersData = jsonResponse.data;
    state.allPlayers = playersData.players;

    // console.log(state.allPlayers)

    renderAllPlayers();
}


const getSinglePlayer = async (singlePlayerId) => {
    const response = await fetch(`${baseApiUrl}/players/${singlePlayerId}`);
    const jsonResponse = await response.json();
    const singlePlayerData = jsonResponse.data.player;

    console.log(singlePlayerData);

    renderSinglePlayer(singlePlayerData)

}

const renderAllPlayers = () => {
    const main = document.querySelector('main');
    const ol = document.createElement('ol');
   
    
    /*Add Button */
    const form = document.createElement('form');
    const addPlayerInput = document.createElement('input');
    form.appendChild(addPlayerInput);
    const addPlayerButton = document.createElement('button');
    form.appendChild(addPlayerButton);
    addPlayerButton.innerText = "Add Player Here";

    addPlayerButton.addEventListener('click', () => {

    });

    /*Remove Button*/
    const removePlayerInput = document.createElement('input');
    form.appendChild(removePlayerInput);
    const removePlayerButton = document.createElement('button');
    form.appendChild(removePlayerButton);
    removePlayerButton.innerText = "Remove Player Here";
    
    removePlayerButton.addEventListener('click', () => {

    });


    main.replaceChildren(form,ol);
    
   
    state.allPlayers.forEach((currentPlayer) => {
        
        const li = document.createElement('li');
        li.innerHTML = `<p id=${currentPlayer.id}>${currentPlayer.name}</p> <img id=${currentPlayer.id} src=${currentPlayer.imageUrl}> `
        li.setAttribute("style", "list-style-type: none; border: 2px solid black; margin: 5px; padding: 5px; width: fit-content;");
        
        // console.log(currentPlayer);
        li.setAttribute('id', currentPlayer.id);
        ol.appendChild(li);

        const liImage = document.querySelectorAll('img');
        liImage.forEach((currentPlayerImage)=> {
        currentPlayerImage.setAttribute("style", "width: 300px;")
    })
        ;
        
        li.addEventListener("click", (event) => {
            // console.log(event.target.id)
            const singlePlayerId = event.target.id

            getSinglePlayer(singlePlayerId)
        })
    });
}

const renderSinglePlayer = (singlePlayerData) => {
    const main = document.querySelector('main');
    main.innerHTML = ` 
    <p>Name: ${singlePlayerData.name}</p> 
    <p>Breed: ${singlePlayerData.breed}</p>
    <p>Id: ${singlePlayerData.id}</p>
    <p>Status: ${singlePlayerData.status}</p>
    <p>Created AT: ${singlePlayerData.createdAt}</p>
    <p>UpdatedAt: ${singlePlayerData.updatedAt}</p>
    <img src=${singlePlayerData.imageUrl}>
    `
    const image = document.querySelector('img');
    image.setAttribute("style","width: 300px;")
    
    const button = document.createElement('button');
    button.innerText = "GO BACK PLEASE";
    main.appendChild(button);

    button.addEventListener('click', (event) => {
        renderAllPlayers()
    })

}
getAllPlayers();