
const pendingTicketsTab = document.querySelector( '#lbl-pending' );
const currentTicketTab = document.querySelector( 'small' );
const deskTab = document.querySelector( '#desk' );
const noMoreAlert = document.querySelector( '.alert' );

const buttonDraw = document.querySelector( '#btn-draw' );
const buttonFinish = document.querySelector( '#btn-finish' );

let deskNumber = null;
let workingTicket = null;

function updatePendingTickets( currentCount ) {

    pendingTicketsTab.innerHTML = currentCount || 0;

    if( currentCount > 0 ) {

        noMoreAlert.classList.contains( 'd-none' )
            || noMoreAlert.classList.add( 'd-none' );
    }
    else {

        noMoreAlert.classList.remove( 'd-none' );
    };
};

async function getPendingTickets() {

    const pendingTickets = await fetch( '/api/ticket/pending', {
        method: 'GET',
    })
        .then( response => response.json() );

    updatePendingTickets( pendingTickets.length );
};

function updateCurrentTicket( ticket = null ) {

    if( !ticket ) {

        currentTicketTab.innerText = 'Nadie';
        return;
    };

    currentTicketTab.innerText = ticket.number;
    workingTicket = ticket;
};

async function drawTicket() {

    await finishTicket();

    const { status, message, ticket } = await fetch( 
        `/api/ticket/draw/${ deskNumber }`, 
        {
            method: 'GET',
        }
    ).then( response => response.json() );

    if ( status === 'error' ) {
        console.error( message );

        updateCurrentTicket();
    }
    else if ( status === 'success' ) {
        updateCurrentTicket( ticket );
    };
};

async function finishTicket() {

    if( !workingTicket ) return;
    const { id } = workingTicket;
    
    const { status, message } = await fetch( 
        `/api/ticket/done/${ id }`, 
        {
            method: 'PUT',
        }
    ).then( response => response.json() );

    if ( status === 'error' ){ 

        console.error( message );
        return;
    };
    
    updateCurrentTicket();
};

function connectToWebSockets() {

    const socket = new WebSocket( 'ws://localhost:3000/ws' );
  
    socket.onmessage = ( event ) => {
      
        const { type, payload } = JSON.parse( event.data );
    
        if( type === 'on-ticket-count-changed') {

            updatePendingTickets( payload );
        };

        return;
    };
  
    socket.onclose = ( event ) => {
      console.log( 'Connection closed' );
      setTimeout( () => {
        console.log( 'retrying to connect' );
        connectToWebSockets();
      }, 1500 );
  
    };
  
    socket.onopen = ( event ) => {
      console.log( 'Connected' );
    };
  
};

function init() {

    getPendingTickets();
    connectToWebSockets();

    const searchParams = new URLSearchParams( window.location.search );
    if( !searchParams.has('escritorio') ){

        window.location = 'index.html';
        throw new Error( 'Parameter escritorio is required' );
    }

    deskNumber = searchParams.get('escritorio');
    deskTab.innerHTML = deskNumber;
};

buttonDraw.addEventListener( 'click', drawTicket );
buttonFinish.addEventListener( 'click', finishTicket );

init();