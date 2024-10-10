import { create } from 'zustand';

type UsuarioStore = {
    usuario: string | null,
    setUsuario: any
}

export const useUsuarioStore = create<UsuarioStore>((set) => ({
    usuario: null,
    setUsuario: (usuario: string) => set(() => ({usuario}))
}))
