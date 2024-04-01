import fs from "fs";
import clipboardy from "clipboardy";

// Lee el contenido del archivo
const texto = fs.readFileSync("data.txt", "utf8");

// Remueve los espacios en blanco adicionales y los saltos de línea
const text = texto.replace(/\s+/g, " ");

// Define el tamaño máximo de cada conjunto
const size = 4096;
const conjuntos = [];

// Divide el texto en conjuntos de tamaño 'size'
for (let i = 0; i < text.length; i += size) {
  const conjunto = text.slice(i, i + size);
  conjuntos.push(conjunto);
}

// Copia cada conjunto al portapapeles
async function copyToClipboard() {
  while (conjuntos.length > 0) {
    const data = conjuntos.shift();
    await clipboardy.write(data);
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Espera 1 segundo entre cada copia
  }
}

copyToClipboard()
  .then(() => console.log("Todos los datos han sido copiados al portapapeles"))
  .catch((error) => console.error("Error:", error));
