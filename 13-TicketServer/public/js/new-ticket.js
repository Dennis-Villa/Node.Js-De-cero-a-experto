const currentTicketTab = document.querySelector( 'span' );
const newTicketButton = document.querySelector( 'button' );

async function getLastTicket() {

    const lastTicket = await fetch( '/api/ticket/last', {
        method: 'GET',
    })
        .then( response => response.json() );

    currentTicketTab.innerHTML = lastTicket;
};

async function createTicket() {

    const newTicket = await fetch( '/api/ticket', {
        method: 'POST',
    })
        .then( response => response.json() );

    console.log(newTicket);

    currentTicketTab.innerHTML = newTicket.number;
};

getLastTicket();

newTicketButton.addEventListener( 'click', createTicket );