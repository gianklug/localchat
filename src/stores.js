import { persist, localStorage } from "@macfja/svelte-persistent-store"
import { writable } from 'svelte/store'


export let username = persist(writable('anonymous'), localStorage(), 'username')
export let range = persist(writable('50'), localStorage(), 'range')

