const developerJokes = [
  "¿Por qué los desarrolladores odian la naturaleza? Porque tiene demasiados bugs.",
  "Un SQL entra en un bar, se acerca a dos mesas y pregunta: '¿Puedo unirme?'",
  "¡He terminado mi código a tiempo! – Nadie, nunca.",
  "Si no funciona, añade más `console.log()`.",
  "¿Cuántos programadores se necesitan para cambiar una bombilla? Ninguno, es un problema de hardware.",
  "No me asusto fácilmente... excepto cuando veo código sin `;` al final.",
  "Los desarrolladores no envejecen, solo se depuran.",
  "El único lugar donde puedes escapar de una excepción es en Java.",
  "Frontend sin diseño es como un backend sin lógica.",
  "¿Por qué los programadores prefieren el té? Porque en Java no hay café.",
  "Hay 10 tipos de personas en el mundo: las que entienden binario y las que no.",
  "Siempre prueba tu código... excepto cuando funciona.",
  "Tu código no está roto, solo es 'funcionalidad no documentada'.",
  "En qué se parecen los programadores y los gatos? En que odian mojarse y no pueden dejar de jugar con cosas que no deberían.",
  "Mi código funciona... hasta que lo toco de nuevo.",
  "¿Por qué los desarrolladores odian la luz del sol? Porque depuran en la oscuridad.",
  "Cuando crees que has eliminado todos los bugs, aparece el 'bug final'.",
  "Git es como un horóscopo: nunca entiendes los conflictos.",
  "Un desarrollador sin bugs es como un unicornio, no existe.",
  "En mi máquina funciona... pero no en producción.",
];


const handler = async (req: Request): Promise<Response> => {
  const method = req.method;
  const url = new URL(req.url);
  const path = url.pathname;

  if (method === "GET") {
    // Ruta 1: /jokes
    if (path === "/jokes") {
      const indice = url.searchParams.get("indice");
      if (indice) {
        const bromaIndice= parseInt(indice);
        if (bromaIndice >= 0 && bromaIndice< developerJokes.length) {
          return new Response(developerJokes[bromaIndice]);
        } else {
          return new Response("Bad request", { status: 400 });
        }
      } else {
        const randomBroma =
          developerJokes[Math.floor(Math.random() * developerJokes.length)];
        return new Response(randomBroma);
      }
    }

    // Ruta 2: /calcular
    if (path === "/calcular") {
      const num1 = parseInt(url.searchParams.get("num1") || ""); //o Int
      const num2 = parseInt(url.searchParams.get("num2") || "");
      const operacion = url.searchParams.get("operacion");

      if (!num1 || !num2 || !operacion) { 
        return new Response("Por favor, proporciona números válidos y una operación.", { status: 400 });
      }
      let resultado;
      switch (operacion) {
        case "suma":
          resultado = num1 + num2;
          break;
        case "resta":
          resultado = num1 - num2;
          break;
        case "multiplicacion":
          resultado = num1 * num2;
          break;
        case "division":
          if (num2 === 0) {
            return new Response("Error: No se puede dividir por 0", {
              status: 400,
            });
          }
          resultado = num1 / num2;
          break;
        default:
          return new Response("Operación no válida", { status: 400 });
      }
      return new Response(`Resultado: ${resultado}`);
    }

    // Ruta 3: /reverso
    if (path.startsWith("/reverso/")) {
      const frase = path.replace("/reverso/", "");
      const detalles = url.searchParams.get("detalles") === "true";
      const reverso = frase.split("").reverse().join("");
      if (detalles) {
        const longitud = frase.length;
        const rBody = {
          reverso,
          longitud,
        };
        return new Response(JSON.stringify(rBody), {
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return new Response(reverso);
      }
    }
  }

  return new Response("Ruta no encontrada", { status: 404 });
};

Deno.serve({ port: 3000 }, handler);
