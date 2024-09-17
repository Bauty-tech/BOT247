const mineflayer = require('mineflayer');

// Configuración del bot
const botConfig = {
  host: 'Huevosdibu1.aternos.me', // IP del servidor
  port: 54687,       // Puerto del servidor
  username: 'JinTest224', // Nombre del bot
  version: '1.20'      // Deja false para autodetectar la versión
};

// Crear el bot
const bot = mineflayer.createBot(botConfig);

bot.on('spawn', () => {
  bot.chat('/register contraseña')  
});
    

  // Lista de mensajes que el bot enviará aleatoriamente
  const messages = [
    "¿Alguien ha encontrado diamantes?",
    "¡Recuerden hidratarse!",
    "Cuidado con los Creepers...",
    "¿Listos para la aventura?",
    "Me pregunto si hay aldeanos cerca...",
    "¿Cuál es tu bloque favorito?"
  ];

  // Función para enviar un mensaje aleatorio cada 30 segundos
  function sendRandomMessage() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    bot.chat(messages[randomIndex]);
  }

  // Envía un mensaje aleatorio cada 30 segundos
  setInterval(sendRandomMessage, 30000);
    
bot.on('login', () => {
  console.log(`El bot ${bot.username} se ha conectado al servidor ${botConfig.host}:${botConfig.port}`);
});

// Manejar errores y desconexiones
bot.on('kicked', (reason) => console.log(`Bot kicked: ${reason}`));
bot.on('error', (err) => console.log(`Error: ${err}`));

// Mover al bot para evitar la desconexión por inactividad
function moveBot() {
  const { forward, left, back, right } = bot.controlState;
  if (forward || left || back || right) {
    bot.setControlState('forward', false);
    bot.setControlState('left', false);
    bot.setControlState('back', false);
    bot.setControlState('right', false);
  } else {
    const direction = Math.floor(Math.random() * 4);
    switch (direction) {
      case 0:
        bot.setControlState('forward', true);
        break;
      case 1:
        bot.setControlState('left', true);
        break;
      case 2:
        bot.setControlState('back', true);
        break;
      case 3:
        bot.setControlState('right', true);
        break;
    }
  }
}

// Mantener al bot en movimiento cada 5 segundos
setInterval(moveBot, 5000);
