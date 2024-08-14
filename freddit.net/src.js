const mcapi = 'https://eu.mc-api.net/v3/server'

const servers = [
    {
        'name': 'Freddit Freebuild',
        'address': 'play.freddit.net',
        'map_url': 'http://map.freddit.net'
    },
    {
        'name': 'Freddit Survival',
        'address': 'survival.freddit.net',
        'map_url': 'https://survivalmap.freddit.net'
    }
]

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    var toastEl = document.getElementById('copied-toast');
    var toast = new bootstrap.Toast(toastEl);
    toast.show();
}

const serverStatusCardHTML = (server_name, server_address, status, map_url, players, version) => {
    return `
        <div class="col-md-4 p-2">
            <div class="card">
                <div class="card-header">
                    <img src="${mcapi}/favicon/${server_address}" alt="Server icon" style="width: 16px; height: 16px;">
                    ${server_name}
                    ${version ? `<span class="badge bg-secondary">${version}</span>` : ''}
                    <div class="badge bg-${status === 'online' ? 'success' : 'danger'}">${status === 'online' ? 'O' : 'X'}</div>
                </div>
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <p>${players} player${players !== 1 ? 's' : ''} online</p>
                        <button class="btn btn-sm btn-outline-primary" onclick="window.open('${map_url}')">Map</button>
                    </div>
                </div>
                <div class="card-footer" onclick="copyToClipboard('${server_address}')" style="cursor: pointer;">
                    <code>${server_address}</code>
                </div>
            </div>
        </div>
    `
}

servers.forEach(server => {
    $.get(mcapi + "/ping/" + server.address, function(data) {
        if (data.error) {
            $('#server-status').append(serverStatusCardHTML(server.name, server.address, 'offline', server.map_url, 0))
            return
        }
        $('#server-status').append(serverStatusCardHTML(server.name, server.address, 'online', server.map_url, data.players.online, data.version.name))
    }).fail(function() {
        $('#server-status').append(serverStatusCardHTML(server.name, server.address, 'offline', server.map_url, 0))
    })
})

$(function() {
    const ENDOFTHEWORLD = new Date("jun 09, 2069 06:09:00").getTime();

    var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = ENDOFTHEWORLD - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        days = days < 10 ? `0${days}` : days;
        hours = hours < 10 ? `0${hours}` : hours;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        $('#countdown-timer').html(`${days} : ${hours} : ${minutes} : ${seconds}`);

        if (distance < 0) {
            clearInterval(x);
            $('#countdown-timer').html("...?");
        }
    }, 1000);

    const orbitalLinks = [
        "https://www.youtube.com/watch?v=6X3DsTZuRC4",
        "https://www.youtube.com/watch?v=zZct-itCwPE",
        "https://youtu.be/YVxpZQOG_lo?si=0IorRTV8dG0ir0n4",
        "https://www.youtube.com/watch?v=R5YJuesDa9Y",
        "https://www.youtube.com/watch?v=Wl9_JnweumI",
        "https://orbital.freddit.net",
        "https://orbital.freddit.net"
    ]

    $('#footer-orbital').on('click', function() {
        const rand = Math.floor(Math.random() * orbitalLinks.length)
        window.open(orbitalLinks[rand])
    })
})