// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

const users = [
  {
    id: 1,
    nombreUsuario: 'admin',
    email: 'admin@example.com',
    password: '1234',
    rol: 'admin' as const,
    fotoPerfil: undefined,
  },
  {
    id: 2,
    nombreUsuario: 'user',
    email: 'user@example.com',
    password: '1234',
    rol: 'user' as const,
  },
]

export const handlers = [
    http.post('/api/login', async ({ request }) => {
    const { email, nombreUsuario, password } = await request.json() as { 
        email?: string
        nombreUsuario?: string
        password: string 
    }

    const user = users.find(u => 
        (email && u.email === email) || 
        (nombreUsuario && u.nombreUsuario === nombreUsuario)
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
]