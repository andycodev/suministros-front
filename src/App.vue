<template>
  <div class="p-4">
    <nav class="flex gap-4 mb-6">
      <RouterLink to="/" class="text-blue-600">Shopping</RouterLink>
      <RouterLink to="/order" class="text-blue-600">Order</RouterLink>
      <RouterLink to="/payment" class="text-blue-600">Payment</RouterLink>
    </nav>

    <RouterView />
  </div>
</template>

<script setup>
</script>
