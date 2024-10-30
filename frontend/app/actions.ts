'use server'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined in environment variables');
}

export async function createList(name: string) {
  try {
    const response = await fetch(`${API_URL}/api/v1/lists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  } catch (error) {
    console.error('Failed to create list:', error);
    return null;
  }
}

export async function deleteList(id: string) {
  try {
    const response = await fetch(`${API_URL}/api/v1/lists/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  } catch (error) {
    console.error('Failed to delete list:', error);
    return null;
  }
}

export async function getLists() {
  try {
    const response = await fetch(`${API_URL}/api/v1/lists`);
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response.json();
  } catch (error) {
    console.error('Failed to fetch lists:', error);
    return [];
  }
}

export async function updateList(id: string, name: string) {
  try {
    const response = await fetch(`${API_URL}/api/v1/lists/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  } catch (error) {
    console.error('Failed to update list:', error);
    return null;
  }
} 