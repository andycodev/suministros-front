// src/stores/useOrderStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useOrderStore = defineStore('order', () => {
  const step = ref<number>(1)

  const member = ref<null | { id: number; name: string; dni?: string }>(null)

  const materials = ref<Array<{ id: number; code?: string; name: string; price: number; qty: number }>>([])

  const lastOrderCode = ref<string | null>(null)

  const total = computed(() => materials.value.reduce((acc, m) => acc + m.price * m.qty, 0))

  function setStep(n: number) {
    step.value = n
  }

  function setMember(m: { id: number; name: string; dni?: string }) {
    member.value = m
    step.value = 2
  }

  function addMaterial(mat: { id: number; name: string; price: number }) {
    const found = materials.value.find(x => x.id === mat.id)
    if (found) found.qty++
    else materials.value.push({ ...mat, qty: 1 })
  }

  function setMaterialQty(id: number, qty: number) {
    const it = materials.value.find(x => x.id === id)
    if (it) it.qty = Math.max(0, Math.floor(qty))
    materials.value = materials.value.filter(x => x.qty > 0)
  }

  function clearMaterials() {
    materials.value = []
  }

  function makePayment(code?: string) {
    // code could come from backend; if not, generate one here
    const c = code ?? `PED-${Date.now().toString().slice(-6)}`
    lastOrderCode.value = c
    step.value = 4
    // normalmente limpiar carrito tras confirmación
    clearMaterials()
  }

  function resetAll() {
    step.value = 1
    member.value = null
    clearMaterials()
    lastOrderCode.value = null
  }

  return {
    step,
    member,
    materials,
    lastOrderCode,
    total,
    setStep,
    setMember,
    addMaterial,
    setMaterialQty,
    clearMaterials,
    makePayment,
    resetAll,
  }
})
