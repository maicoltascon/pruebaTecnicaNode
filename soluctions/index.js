import net from "net";
import fs from "fs";

export function ping(ip, callback) {
  const startTime = process.hrtime.bigint();

  const client = net.createConnection({ port: 80, host: ip });

  client.on("connect", () => {
    const endTime = process.hrtime.bigint();
    const timeTaken = Number(endTime - startTime) / 1e6;
    callback(
      null,
      `Ping successful. Time: ${timeTaken.toFixed(2)} ms, IP: ${ip}`
    );
    client.end();
  });

  client.on("error", (error) => {
    callback("Ping failed", null);
  });
}

ping("google.com", (error, info) => {
  if (error) console.error(error);
  console.log(info);
});

/* 
* Convertir en una promesa la siguiente funcion
*

function delayedCallback(callback) {
    setTimeout(() => {
        console.log('ya paso el tiempo')
    }, 2000);
} 
*
*/

function delayedCallback() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Ya pasó el tiempo en ejercicio dos");
    }, 3000);
  });
}

delayedCallback()
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error);
  });

// Mejora la siguiente funcion para

/* export function readFile() {
  const archivo1 = fs.readSync("archivo1.txt", "utf8");
  const archivo2 = fs.readSync("archivo2.txt", "utf8");
  const archivo3 = fs.readSync("archivo3.txt", "utf8");

  return `${archivo1} ${archivo2} ${archivo3}`;
} */



export async function readFile() {
    try {
        const archivo1 = await fs.promises.readFile('archivo1.txt', 'utf8');
        const archivo2 = await fs.promises.readFile('archivo2.txt', 'utf8');
        const archivo3 = await fs.promises.readFile('archivo3.txt', 'utf8');
        
        return `${archivo1} ${archivo2} ${archivo3}`;
    } catch (error) {
        console.error('Error al leer los archivos:', error);
        throw error; // Propaga el error para que lo maneje el código que llama a esta función
    }
}


readFile()
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error);
  });




// Emular el comportamiento de la libreria dotenv con fs

export function loadEnv() {
  const envFilePath = ".env";

  if (!fs.existsSync(envFilePath)) {
    console.error(`El archivo ${envFilePath} no existe.`);
    return;
  }

  try {
    const envData = fs.readFileSync(envFilePath, "utf8");

    if (envData.trim() === "") {
      console.error(`El archivo ${envFilePath} está vacío.`);
      return;
    }

    const envLines = envData.split("\n");

    envLines.forEach((line) => {
      const [key, value] = line.split("=");
      const trimmedKey = key.trim();
      const trimmedValue = value ? value.trim() : "";

      process.env[trimmedKey] = trimmedValue;

      console.log("Variable de entorno  cargada", process.env[trimmedKey]);
    });
  } catch (error) {
    console.error("Error al cargar el archivo .env:", error);
  }
}

loadEnv();
