import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { temperature, humidity, acidity, planta } = await req.json();

    // Validar datos
    if (!temperature || !humidity || !acidity || !planta) {
      return NextResponse.json({ error: "Faltan datos para el análisis" }, { status: 400 });
    }

    // Construir el prompt para OpenAI
    const prompt = `
Eres un experto en botánica especializada en invernaderos. Estás monitoreando una planta del tipo "${planta}".

Los últimos datos registrados son:
- Temperatura: ${temperature}°C
- Humedad: ${humidity}%
- pH del suelo: ${acidity}

Con base en las condiciones óptimas conocidas para la planta "${planta}", proporciona un diagnóstico corto de su estado actual. Explica si está en buen estado o en riesgo y da una recomendación específica.

Responde en **una sola oración**, de forma técnica y clara, usando máximo **50 palabras**.
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
      }),
    });

    const data = await response.json();
    const analysis = data.choices?.[0]?.message?.content || "No se pudo generar el análisis.";

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Error en la API de análisis:", error);
    return NextResponse.json({ error: "Error generando el análisis" }, { status: 500 });
  }
}
