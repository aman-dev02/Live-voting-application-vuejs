<template>
  <nav v-if="isLoggedin" class="p-4 lg:px-10 md:px-2 nav-bg z-50">
    <div class="flex justify-between items-center">
      <router-link to="/">
      <div class="text-secondry text-2xl font-semibold font-primary cursor-grab">
        <v-icon name="fa-poll" scale="2" animation="pulse" fill="#3F72AF" />
        Live Voting System
      </div>
    </router-link>
      <div class="lg:hidden">
        <button @click="toggleMenu" class="text-gray-600 hover:text-primary focus:outline-none">
          <template v-if="!isMenuOpen">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </template>
          <template v-else>
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </template>
        </button>
      </div>

      <div class="space-x-4 hidden lg:flex">
        <router-link to="/dashboard">
          <button
            class="flex items-center text-sm text-white focus:outline-none bg-primary rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-200 px-3 py-2 font-secondary"
          >
            Dashboard
          </button>
        </router-link>
        <router-link to="/dashboard">
          <button
            class="flex items-center text-sm text-white focus:outline-none bg-primary rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-200 px-3 py-2 font-secondary"
          >
           View History
          </button>
        </router-link>
        <router-link to="/mypolls">
          <button
            class="flex items-center text-sm text-white focus:outline-none bg-primary rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-200 px-3 py-2 font-secondary"
          >
            My Polls
          </button>
        </router-link>
        <router-link to="/create">
        <button
          class="flex items-center text-sm text-white focus:outline-none bg-primary rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-200 px-3 py-2 font-secondary"
        >
          Create Poll
        </button>
      </router-link>
        <router-link to="/">
          <button
            class="flex items-center text-white text-sm bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg focus:outline-none font-secondary"
            @click="logout"
            >
            Logout
          </button>
        </router-link>
      </div>
    </div>

    <div class="lg:hidden" :class="{ block: isMenuOpen, hidden: !isMenuOpen }">

      <router-link to="/dashboard">
        <button
          class="flex mt-4 items-center  text-sm text-gray-900 focus:outline-none bg-gray-200 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-200 px-3 py-2 font-secondary mb-2"
        >
          Dashboard
        </button>
      </router-link>
      <router-link to="/dashboard">
        <button
          class="flex mt-4 items-center  text-sm text-gray-900 focus:outline-none bg-gray-200 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-200 px-3 py-2 font-secondary mb-2"
        >
          History
        </button>
      </router-link>
      <!-- My Polls button with icon -->
      <router-link to="/mypolls">
        <button
          class="flex items-center  text-sm text-gray-900 focus:outline-none bg-gray-200 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-200 px-3 py-2 font-secondary mb-2"
        >
          My Polls
        </button>
      </router-link>
      <router-link to="/create">
      <button
        class="flex  items-center text-sm text-gray-900 focus:outline-none bg-gray-200 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-200 px-3 py-2 font-secondary mb-2"
      >
        Create Poll
      </button>
    </router-link>
      <router-link to="/">
        <button
          class="flex items-center text-white text-sm bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg focus:outline-none font-secondary"
          @click="logout"
          >
          Logout
        </button>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref,computed } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
const store = useStore();
const router = useRouter();

// Check if the user is logged in
const isLoggedin = computed(() => {
  return store.getters.isLoggedIn;
});
console.log(isLoggedin)
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
const logout = async () => {
  try {
    await store.dispatch('logout').then(() => {
      console.log('logout')
      toast.success('Logout successfully', {
          position: toast.POSITION.TOP_CENTER
        })
      router.push('/');
    });
  } catch (error) {
    toast.error('Logout failed', {
          position: toast.POSITION.TOP_CENTER
        })
    console.error('An error occurred during signup:', error);
  }
};
</script>

<style scoped>
.nav-bg {
  background: rgba(255, 255, 255, 0.559);
  box-shadow: 0 2px 10px 0 rgba(204, 208, 255, 0.168);
}
</style>
