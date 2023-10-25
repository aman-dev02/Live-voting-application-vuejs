<template>
  <section
    class="h-[90vh] flex flex-col justify-center items-center bg-image z-50 backdrop-blur-lg"
  >
    <div
      class="p-4 lg:p-10 space-y-4 w-full md:w-2/4 font-secondary bg-white drop-shadow"
      data-aos="zoom-in"
    >
      <h1 class="text-xl md:text-2xl font-semibold font-primary">Create a New Poll</h1>

      <div>
        <label for="poll-title" class="block text-gray-700 font-medium">Poll Title</label>
        <input
          v-model="poll.title"
          type="text"
          id="poll-title"
          class="w-full px-2 py-1 md:px-4 md:py-2 border rounded-md"
        />
      </div>

      <!-- Options -->
      <div>
        <label for="poll-options" class="block text-gray-700 font-medium">Poll Options</label>
        <div
          v-for="(option, index) in poll.options"
          :key="index"
          class="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2 md:items-center mt-2"
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="300"
        >
          <label class="text-white bg-primary text-center rounded p-1 w-6 lg:w-10 md:text-center"
            >{{ index + 1 }}.</label
          >
          <input
            v-model="option.text"
            type="text"
            class="w-full px-2 py-1 md:w-full md:px-4 md:py-2 border rounded-md"
          />
          <button
            v-if="index >= 2"
            @click="removeOption(index)"
            class="text-red-500 hover:text-red-600 focus:outline-none"
          >
            <v-icon name="fa-trash" scale="1" fill="#e02424" animation="wrench" hover />
          </button>
        </div>
        <button
          @click="addOption"
          class="mt-2 text-primary hover:text-primary-dark focus:outline-none"
        >
          Add Option
        </button>
      </div>

      <div class="flex flex-col space-y-2 md:flex-row md:space-x-2 md:items-center">
        <div class="w-full md:w-1/2">
          <label for="poll-timer-value" class="block text-gray-700 font-medium">Timer Value</label>
          <input
            v-model="poll.timer.value"
            type="number"
            id="poll-timer-value"
            class="w-full px-2 py-1 md:px-4 md:py-2 border rounded-md"
          />
        </div>
        <div class="w-full md:w-1/2">
          <label for="poll-timer-unit" class="block text-gray-700 font-medium">Timer Unit</label>
          <select
            v-model="poll.timer.unit"
            id="poll-timer-unit"
            class="w-full px-2 py-1 md:px-4 md:py-2 border rounded-md"
          >
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>
        </div>
      </div>

      <div>
        <label class="block text-gray-700 font-medium">Visibility</label>
        <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <label class="flex items-center space-x-2">
            <input
              v-model="poll.isPublic"
              type="radio"
              value="true"
              class="text-primary form-radio"
            />
            <span class="text-gray-800">Public</span>
          </label>
          <label class="flex items-center space-x-2">
            <input
              v-model="poll.isPublic"
              type="radio"
              value="false"
              class="text-primary form-radio"
            />
            <span class="text-gray-800">Private</span>
          </label>
        </div>
      </div>

      <!-- Show multiselect when "Private" is selected -->
      <div v-if="!poll.isPublic">
        <label for="user-select" class="block text-gray-700 font-medium">Select Users</label>
        <!-- Include your multiselect component or code here -->
        <!-- Example: <MultiSelect v-model="selectedUsers" :options="userOptions" /> -->
      </div>

      <!-- Create Poll Button -->
      <button
        @click="createPoll"
        class="w-full px-2 py-1 md:px-4 md:py-2 text-white bg-primary rounded-md hover:bg-[#37639a] hover:drop-shadow"
      >
        Create Poll
      </button>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import { socket } from '../socket'
export default {
  setup() {
    const router = useRouter()
    const store = useStore()
    const user = store.state.user

    const poll = ref({
      title: '',
      timer: { value: 0, unit: 'minutes' },
      isPublic: true,
      options: [{ text: '' }, { text: '' }],
      createdBy: {
        id: user._id,
        username: user.username
      }
    })

    const addOption = () => {
      poll.value.options.push({ text: '' })
    }

    const removeOption = (index) => {
      if (poll.value.options.length > 2) {
        poll.value.options.splice(index, 1)
      }
    }

    const createPoll = async () => {
      const response = await store.dispatch('createPollAction', poll.value)

      if (response) {
        // Poll created successfully

        toast.success('Poll created !', {
          position: toast.POSITION.TOP_CENTER
        })

        socket.emit('newPollNotification', {
          username: user.username,
          pollTitle: poll.value.title
        })
        poll.value = {
          title: '',
          timer: { value: 0, unit: 'minutes' },
          isPublic: true,
          options: [{ text: '' }, { text: '' }],
          createdBy: {
            id: '',
            username: ''
          }
        }
        router.push('/dashboard')
      } else {
        console.error('Poll creation failed:', response.error)
        toast.error('Error creating poll', {
          position: toast.POSITION.TOP_CENTER
        })
      }
    }

    return {
      poll,
      addOption,
      removeOption,
      createPoll
    }
  }
}
</script>
<style>
.bg-image {
  background: rgb(245, 245, 245);
  background: linear-gradient(29deg, rgba(245, 245, 245, 1) 40%, rgba(188, 206, 227, 1) 100%);
  backdrop-filter: blur(18px);
}
</style>
