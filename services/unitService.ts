interface CreateUnitParams {
  name: string;
  textbook_id: number;
  sequence_number: number;
}

export const createUnit = async (params: CreateUnitParams) => {
  const response = await fetch('/api/unit/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create unit');
  }

  return response.json();
}; 