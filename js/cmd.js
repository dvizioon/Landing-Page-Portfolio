const openTerminalButton = document.getElementById('openTerminal');
const terminalContainer = document.getElementById('terminalContainer');
const terminalOutput = document.getElementById('terminalOutput');
const userInput = document.getElementById('userInput');

// JSON de comandos
const commands = {
    "help": {
        "action": () => {
            terminalOutput.innerHTML += '<p>Lista de comandos disponíveis:</p>';
            terminalOutput.innerHTML += '<ul>';
            Object.keys(commands).forEach(key => {
                terminalOutput.innerHTML += `<li>${key} - ${commands[key].description}</li>`;
            });
            terminalOutput.innerHTML += '</ul>';
        },
        "description": "Mostra esta mensagem de ajuda"
    },
    "clear": {
        "action": () => {
            terminalOutput.innerHTML = '';
        },
         "description": "Limpa o terminal"
    },
    "img": {
        "action": async () => {
            const { value: result } = await Swal.fire({
                title: 'Nova imagem',
                html:
                    '<input type="file" id="swal-input2" class="swal2-file" accept="image/*">',
                focusConfirm: false,
                preConfirm: () => {
                    const file = document.getElementById('swal-input2').files[0];
                    return file ? [URL.createObjectURL(file), file] : [null, null];
                }
            });

            if (result) {
                const [imageUrl, file] = result;
                if (imageUrl) {
                    document.getElementById('avatar').src = imageUrl;
                } else if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        document.getElementById('avatar').src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            }
        },
        "description": "Insere uma imagem (local)"
    }, 
    "dark": {
        "action": () => {
            document.body.classList.remove('ligth-theme');
        },
        "description": "Ativa o tema escuro"
    },
    "light": {
        "action": () => {
            document.body.classList.add('ligth-theme');
        },
        "description": "Ativa o tema claro"
    }
};

openTerminalButton.addEventListener('click', () => {
    terminalContainer.classList.toggle('active');
});

const closeTerminalButton = document.querySelector('.close-button');
closeTerminalButton.addEventListener('click', () => {
    terminalContainer.classList.remove('active');
});


terminalContainer.addEventListener('click', (e) => {
    if (e.target === terminalContainer) {
        terminalContainer.classList.remove('active');
    }
});


userInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); 

        const command = userInput.value.trim().toLowerCase(); 


        if (commands.hasOwnProperty(command)) {
            commands[command].action(); 
        } else {

            terminalOutput.innerHTML += `<p>Comando '${command}' não encontrado. Digite 'help' para ver os comandos disponíveis.</p>`;
        }

        userInput.value = ''; 
    }
});

