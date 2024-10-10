
const ticketLabels = [
    document.querySelector('#lbl-ticket-01'),
    document.querySelector('#lbl-ticket-02'),
    document.querySelector('#lbl-ticket-03'),
    document.querySelector('#lbl-ticket-04'),
];

const deskLabels = [
    document.querySelector('#lbl-desk-01'),
    document.querySelector('#lbl-desk-02'),
    document.querySelector('#lbl-desk-03'),
    document.querySelector('#lbl-desk-04'),
];

let lastWorkingOnTickets = [];

function connectToWebSockets() {

    const socket = new WebSocket( 'ws://localhost:3000/ws' );
  
    socket.onmessage = ( event ) => {
        
        const { type, payload } = JSON.parse( event.data );
    
        if( type === 'on-working-changed') {

            fillTickets( payload );
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

function fillTickets( tickets ) {

    if( !tickets ) return;

    for ( let i = 0; i < tickets.length; i++ ) {

        if( i>=4 ) break;

        ticketLabels[ i ].innerHTML = `Ticket ${ tickets[ i ]?.number || '...' }`;
        deskLabels[ i ].innerHTML = `Escritorio ${ tickets[ i ]?.handledAtDest || '...' }`;
    };
};

async function getLastWorkingOnTickets() {

    const tickets = await fetch( 
        `/api/ticket/working-on`, 
        {
            method: 'GET',
        }
    ).then( response => response.json() );

    if ( !tickets ){ 

        console.error( 'No tickets are worked on' );
        return;
    };
    
    fillTickets( tickets );
};

function init() {

    connectToWebSockets();
    getLastWorkingOnTickets();
};

init();