<template>
  <div class="bg-image container min-h-[90vh] min-w-full p-6 font-secondary">
    <div class="flex flex-wrap md:flex-row min-w-full">
      <!-- Left Section: List of Polls -->
      <div class="left-section w-1/2 min-w-1/2 p-4 justify-center">
        <h2 class="text-xl font-bold mb-4 font-primary">List of Polls</h2>
        <div
          v-for="poll in myPolls"
          :key="poll._id"
          @click="selectPoll(poll)"
          class="cursor-pointer p-2 mb-2 rounded-md hover:bg-blue-100"
        >
          <p class="text-lg">• {{ poll.title }}</p>
        </div>
      </div>

      <!-- Right Section: Poll Detail -->
      <div class="right-section w-full md:w-1/2 p-4">
        <h2 class="text-xl font-bold mb-4 font-primary">Poll Detail</h2>
        <div v-if="selectedPoll">
          <h2 class="text-xl font-bold mb-2 font-primary text-primary bg-white w-fit p-1 rounded">
            {{ selectedPoll.title }}?
          </h2>
          <p class="text-sm">Created At: {{ formatDateTime(selectedPoll.createdAt) }}</p>
          <p class="text-sm">Is Public: {{ selectedPoll.isPublic ? 'Yes' : 'No' }}</p>
          <p class="text-sm">
            Duration: {{ selectedPoll.timer.value }} {{ selectedPoll.timer.unit }}
          </p>
          <p class="text-sm">
            Status:
            <span
              :style="{ color: selectedPoll.isOpen ? '#05ac1e' : '#FF0000' }"
              class="bg-white w-fit p-1 rounded"
              >{{ selectedPoll.isOpen ? 'Open' : 'Closed' }}</span
            >
          </p>

          <div class="mt-4">
            <h3 class="text-lg font-bold mb-2 font-primary">Options and Votes</h3>
            <ul >
              <li v-for="option in selectedPoll.options" :key="option._id" class="my-10">
                <div class="flex  flex-col ">
                  <p class="text-base font-semibold">{{ option.text }}</p>
                  <div class="progress-bar">
                    <div
                      :style="{ width: option.votePercentage + '%' }"
                      class="progress-bar-fill"
                    ></div>
                    <p class="progress-bar-text">{{ option.votePercentage }}%</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="mt-4" v-if="selectedPoll.options.length > 0">
            <h3 class="text-lg font-bold mb-2 font-primary">Total Votes</h3>
            <p class="text-sm">{{ totalVotes(selectedPoll.options) }}</p>
          </div>
        </div>

        <div v-else>
          <p class="text-sm">Select a poll to view details</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted } from 'vue'

export default {
  data() {
    return {
      myPolls: [],
      selectedPoll: null,
      
    }
  },

  methods: {
    formatDateTime(timestamp) {
      const date = new Date(timestamp)
      return date.toLocaleString()
    },
    selectPoll(poll) {
      this.selectedPoll = poll
      this.updateChartData()
    },
    totalVotes(options) {
      if (options.length === 0) return 'No votes recorded.'
      const total = options.reduce((sum, option) => sum + option.votes, 0)
      return `Total Votes: ${total}`
    },
    updateChartData() {
      if (this.selectedPoll) {
        this.calculateVotePercentages()
      }
    },
    calculateVotePercentages() {
      if (this.selectedPoll && this.selectedPoll.options.length > 0) {
        const totalVotes = this.selectedPoll.options.reduce((sum, option) => sum + option.votes, 0)
        for (const option of this.selectedPoll.options) {
          option.votePercentage = ((option.votes / totalVotes) * 100).toFixed(2)
        }
      }
    }
  },

  watch: {
    selectedPoll: 'updateChartData'
  },

  async created() {
    const store = useStore()
    const polls = await store.dispatch('getMyPollsAction')
    this.myPolls = polls
  },

  mounted() {
    onMounted(() => {
      if (this.selectedPoll) {
        this.updateChartData()
      }
    })
  }
}
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

.left-section {
  padding: 20px;
  border-right: 1px solid #ccc;
  overflow-y: auto;
  max-height: 70vh;
}

.right-section {
  padding-left: 20px;
  max-height: 90vh;
  max-width: 50vw;
  overflow-y: auto;
}

.left-section div {
  transition: background-color 0.2s;
}

.left-section div:hover {
  background-color: #e3e3e3;
}
.progress-bar {
  width: 100%;
  background-color: #f0f0f0;
  height: 20px;
  border-radius: 4px;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 4px;
  background-color: #3f72af;
  transition: width 0.3s;
}

.progress-bar-text {
  margin-left: 5px;
}
</style>
