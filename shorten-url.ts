import { config } from './config';

export async function shortenURLs(longURL: string): Promise<string> {
  const response = await fetch(config.goTinyUrl ?? "https://gotiny.cc/api" , {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input: longURL }),
  });

  if (!response.ok) {
    throw new Error(`Failed to shorten URL. Status: ${response.status}`);
  }

  const data = (await response.json());
  console.log(data);

  return data[0].code;
}
