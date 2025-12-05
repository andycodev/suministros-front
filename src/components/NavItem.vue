<template>
  <li>
    <router-link 
      :to="to"
      class="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 group"
      :class="{ 'bg-gray-50 text-gray-900': isActive }"
      @click="handleClick"
    >
      <span class="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-500">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          aria-hidden="true"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            :d="icon"
          />
        </svg>
      </span>
      <span class="ml-3">
        <slot />
      </span>
    </router-link>
  </li>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'NavItem',
  
  props: {
    to: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    onClose: {
      type: Function,
      default: () => {}
    }
  },

  setup(props) {
    const route = useRoute()

    const isActive = computed(() => route.path === props.to)

    const handleClick = () => {
      if (props.onClose) {
        props.onClose()
      }
    }

    return {
      isActive,
      handleClick
    }
  }
})
</script>
