import { api } from "./api-client"

export type Employee = {
  id: string
  name: string
  role?: string
}

export async function getEmployees(role?: string): Promise<Employee[]> {
  const query = role ? `?role=${encodeURIComponent(role)}` : ""
  const data = await api.get<any[]>(`/users${query}`)
  return data.map((u) => ({ id: u.id, name: `${u.firstName} ${u.lastName}`, role: u.role }))
}

export default getEmployees
