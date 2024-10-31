// src/utils/fetcher.ts
export async function fetcher(path) {
    const req = await fetch(`http://localhost:8000/api/${path}`);
    if (!req.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await req.json();
    return data;
}
