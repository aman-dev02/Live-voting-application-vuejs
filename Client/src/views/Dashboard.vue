<template>
  <div class="bg-image container min-h-[90vh] min-w-full">
    <div
      class="filter-dropdown min-w-[70vw] px-4 py-1 rounded mt-2 flex justify-end items-center bg-transparent gap-4 font-secondary"
    >
      <label for="poll-filter" class="">Sort by:</label>
      <select
        id="poll-filter"
        v-model="filter"
        class="block bg-white border border-gray-300 rounded-md shadow-md focus:ring focus:ring-Primary focus:outline-none"
      >
        <option value="live">Live Polls</option>
        <option value="expired">Expired Polls</option>
      </select>
    </div>
    <div v-for="poll in filteredPolls" :key="poll._id" class="poll-card font-secondary">
      <div class="poll-header">
        <h2 class="poll-title font-primary">{{ poll.title }}?</h2>
        <div class="flex justify-center items-center gap-2">
          <p>Valid till:</p>
          <CountdownTimer :closesAt="new Date(poll.closesAt)" :pollId="poll._id" />
        </div>
      </div>
      <div class="poll-options font-third">
        <div
          v-for="(option, index) in poll.options"
          :key="index"
          @click="vote(poll, index)"
          :class="{ selected: selectedOption[poll._id] === index, disabled: !poll.isOpen }"
          class="option hover:font-primary"
        >
          {{ index + 1 }}. {{ option.text }}
        </div>
      </div>
      <div class="flex justify-between mt-5 text-xs md:text-sm font-third">
        <p>Created At: {{ formatDateTime(poll.createdAt) }}</p>
        <p>Created By: {{ poll.createdBy?.username }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toast } from 'vue3-toastify'
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import CountdownTimer from '../components/countdownTimer.vue'
import { socket } from '../socket'
const store = useStore()
const filter = ref('live')
const openPolls = ref([])
const selectedOption = ref({})

const user = store.state.user

const fetchOpenPolls = async () => {
  try {
    const polls = await store.dispatch('getAllPollsAction')
    openPolls.value = polls.map((poll) => ({
      ...poll
    }))
    console.log(openPolls.value)
  } catch (error) {
    console.error('Error fetching open polls:', error)
  }
}

const vote = async (poll, optionIndex) => {
  if (!poll.isClosed && selectedOption[poll._id] !== optionIndex) {
    try {
      selectedOption[poll._id] = optionIndex
      await store.dispatch('recordVoteAction', { pollId: poll._id, optionIndex })
      toast.success('Voted Successful', {
        position: toast.POSITION.TOP_CENTER
      })
      socket.emit('Vote', {
        username: user.username,
        id:user.id
      })
    } catch (error) {
      console.error('Error voting:', error)
      toast.success(error, {
        position: toast.POSITION.TOP_CENTER
      })
    }
  } else if (!poll.isClosed && selectedOption[poll._id] === optionIndex) {
    selectedOption[poll._id] = null
  }
}
const formatDateTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleString()
}
const filteredPolls = computed(() => {
  if (filter.value === 'live') {
    return openPolls.value.filter((poll) => poll.isOpen)
  } else if (filter.value === 'expired') {
    return openPolls.value.filter((poll) => !poll.isOpen)
  }
  return openPolls.value 
})
onMounted(() => {
  fetchOpenPolls()

})
</script>

<style scoped>
.bg-image {
  background: rgb(245, 245, 245);
  background: linear-gradient(29deg, rgba(245, 245, 245, 1) 40%, rgba(188, 206, 227, 1) 100%);
  backdrop-filter: blur(18px);
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.poll-card {
  width: 70%;
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.poll-card:hover {
  transform: scale(1.02);
}

.poll-title {
  font-size: 24px;
  margin-bottom: 16px;
}

.poll-options {
  display: flex;
  flex-direction: column;
}

.option {
  cursor: pointer;
  padding: 8px;
  margin: 4px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: background-color 0.2s;
}
.option:hover {
  background-color: #3f72af;
  color: white;
  transition: background-color 0.2s;
}
.option.selected {
  background-color: #1e90ff;
  color: white;
  transition: background-color 0.2s;
}

.option.disabled {
  cursor: not-allowed;
  background-color: #ccc;
  color: #777;
}
.poll-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
</style>
