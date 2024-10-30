'use server'

export async function createList(name: string) {
  const response = await fetch('http://localhost:8000/api/v1/lists', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    console.error('Server response:', await response.text());
    return null;
  }

  return response.json();
}

export async function deleteList(id: string) {
  const response = await fetch(`http://localhost:8000/api/v1/lists/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    console.error('Server response:', await response.text());
    return null;
  }

  return response.json();
}

export async function getLists() {
  const response = await fetch('http://localhost:8000/api/v1/lists');
  if (!response.ok) {
    console.error('Server response:', await response.text());
    return [];
  }
  return response.json();
}

export async function updateList(id: string, name: string) {
  const response = await fetch(`http://localhost:8000/api/v1/lists/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    console.error('Server response:', await response.text());
    return null;
  }

  return response.json();
} 