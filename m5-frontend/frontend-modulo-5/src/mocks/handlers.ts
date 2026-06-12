// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

const users = [
  {
    id: 1,
    username: 'admin',
    name: 'Ana',
    lastName: 'García',
    email: 'ana@example.com',
    password: '1234',
    role: 'admin' as const,
    profilePicture: 'https://plus.unsplash.com/premium_photo-1669343628944-d0e2d053a5e8?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
    gender: 'femenino',
    region: 'Costa Rica',
  },
  {
    id: 2,
    username: 'user',
    name: 'Carlos',
    lastName: 'López',
    email: 'carlos@example.com',
    password: '1234',
    role: 'user' as const,
    profilePicture: 'https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png',
    gender: 'masculino',
    region: 'México',
  },
]

export const handlers = [
  // Login
  http.post('/api/login', async ({ request }) => {
    const { email, nombreUsuario, password } = await request.json() as {
      email?: string
      nombreUsuario?: string
      password: string
    }

    const user = users.find(u =>
      (email && u.email === email) ||
      (nombreUsuario && u.username === nombreUsuario)
    )

    if (!user || user.password !== password) {
      return HttpResponse.json({ success: false }, { status: 401 })
    }

    const { password: _, ...userWithoutPassword } = user

    return HttpResponse.json({
      success: true,
      data: {
        token: 'fake-jwt-token-' + user.id,
        user: userWithoutPassword,
      },
    })
  }),

  // Logout
  http.post('/api/logout', () => {
    return HttpResponse.json({ success: true })
  }),

  // Perfil del usuario autenticado
  http.get('/api/users/:id', ({ request, params }) => {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')

    if (!token?.startsWith('fake-jwt-token-')) {
      return HttpResponse.json({ success: false, message: 'No autorizado' }, { status: 401 })
    }

    const user = users.find(u => u.id === Number(params.id))

    if (!user) {
      return HttpResponse.json({ success: false }, { status: 404 })
    }

    const { password: _, ...userWithoutPassword } = user

    return HttpResponse.json({ success: true, data: userWithoutPassword })
  }),

  // Passthrough para /api/* al backend real
  http.all('/api/*', async ({ request }) => {
    const targetUrl = new URL(request.url)
    targetUrl.hostname = 'localhost'
    targetUrl.port = '3002'
    
    console.log('[MSW] Proxying to backend:', targetUrl.toString())
    
    try {
      // Para GET requests, no enviar body
      const fetchOptions: RequestInit = {
        method: request.method,
        headers: Object.fromEntries(request.headers.entries()),
      }
      
      if (request.method !== 'GET' && request.method !== 'HEAD') {
        fetchOptions.body = await request.arrayBuffer()
      }
      
      const response = await fetch(targetUrl.toString(), fetchOptions)
      
      console.log('[MSW] Backend response:', response.status, targetUrl.pathname)
      
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      })
    } catch (error) {
      console.error('[MSW] Backend connection error:', error)
      return HttpResponse.json(
        { error: 'Backend unavailable', details: String(error) },
        { status: 503 }
      )
    }
  }),
]