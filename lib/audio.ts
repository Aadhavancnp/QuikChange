const RAPID_API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY!;
const TRANSLATE_API_URL = "https://translate-plus.p.rapidapi.com/translate";
const TEXT_TO_SPEECH_API_URL = "https://text-to-speech-api3.p.rapidapi.com";

export const speak = async (text: string, lang: string) => {
  if (lang === "en") {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en";
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
  } else {
    const translatedText = await translateText(text, "en", lang);
    const blob = await textToSpeech(translatedText, lang);
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
  }
};

export const translateText = async (
  text: string,
  source: string,
  target: string
): Promise<string> => {
  try {
    const response = await fetch(TRANSLATE_API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": "translate-plus.p.rapidapi.com",
      },
      body: JSON.stringify({
        text: text,
        source: source,
        target: target,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to translate text: ${response.statusText}`);
    }

    const result = await response.json();
    return result.translations.translation;
  } catch (error: any) {
    throw new Error(`Failed to translate text: ${error.message}`);
  }
};

export const textToSpeech = async (
  text: string,
  voice: string
): Promise<Blob> => {
  try {
    const response = await fetch(
      `${TEXT_TO_SPEECH_API_URL}/speak?text=${encodeURIComponent(
        text
      )}&lang=${voice}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": RAPID_API_KEY,
          "X-RapidAPI-Host": "text-to-speech-api3.p.rapidapi.com",
        },
      }
    );
    const blob = await response.blob();
    return blob;
  } catch (error: any) {
    throw new Error(`Failed to generate speech audio: ${error.message}`);
  }
};
