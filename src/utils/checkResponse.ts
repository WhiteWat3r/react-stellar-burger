export async function checkResponse(res: Response) {
  if (res.ok) {
    return await res.json();
  }

  const errorResponse = await res.json();

  throw new Error(errorResponse.message);
}
