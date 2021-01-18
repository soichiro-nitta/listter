const request = {
  delete: async (params: { config?: {}; data: {}; url: string }) => {
    const { config, data, url } = params

    const res = await fetch(url, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        // Authorization: 'Bearer ' + cookie.get('accessToken'),
      },
      method: 'DELETE',
      ...config,
    })

    if (!res.ok) throw new Error()
    return res.json()
  },
  get: async (params: { config?: {}; url: string }) => {
    const { config, url } = params

    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        // Authorization: 'Bearer ' + cookie.get('accessToken'),
      },
      method: 'GET',
      ...config,
    })

    if (!res.ok) throw new Error()
    return res.json()
  },
  post: async (params: { config?: {}; data: {}; url: string }) => {
    const { config, data, url } = params

    const res = await fetch(url, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        // Authorization: 'Bearer ' + cookie.get('accessToken'),
      },
      method: 'POST',
      ...config,
    })

    if (!res.ok) throw new Error()
    return await res.json()
  },
  put: async (params: { config?: {}; data: {}; url: string }) => {
    const { config, data, url } = params

    const res = await fetch(url, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        // Authorization: 'Bearer ' + cookie.get('accessToken'),
      },
      method: 'PUT',
      ...config,
    })

    if (!res.ok) throw new Error()
    return res.json()
  },
}

// create, update, delete, get

export const createCollection = async (params: {
  name: string
}): Promise<any> => {
  const { name } = params
  return await request.post({ data: { name }, url: '/api/collection' })
}
