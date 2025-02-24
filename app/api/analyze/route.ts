import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { temperature, humidity, acidity } = await req.json();

    // Validar datos
    if (!temperature || !humidity || !acidity) {
      return NextResponse.json({ error: "Faltan datos de la planta" }, { status: 400 });
    }

    // Construir el prompt para OpenAI
    const prompt = `
      Soy un experto en el cuidado de plantas en invernaderos. 
      Los últimos datos registrados son:
      - Temperatura: ${temperature}°C
      - Humedad: ${humidity}%
      - Acidez del suelo: pH ${acidity}

      Analiza estos datos y brinda un diagnóstico detallado de la salud de la planta.
      Explica si está en buen estado o en riesgo y da recomendaciones para mejorar su salud.

      Responde de manera **corta y concisa** en **una sola oración** sobre el estado de la planta. Usa un máximo de **50 palabras**.
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "system", content: prompt }],
        max_tokens: 300,
      }),
    });

    const data = await response.json();
    const analysis = data.choices?.[0]?.message?.content || "No se pudo generar el análisis.";

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Error en la API de análisis:", error); // ✅ Registra el error en la consola
    return NextResponse.json({ error: "Error generando el análisis" }, { status: 500 });
  }
}
