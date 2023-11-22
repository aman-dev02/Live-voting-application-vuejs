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
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold mb-2 font-primary text-primary bg-white w-fit p-1 rounded">
              {{ selectedPoll.title }}?
            </h2>
            <button @click="confirmDelete" class="text-red-500 hover:text-red-700 bg-white p-2 rounded-full hover:drop-shadow-xl">
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M20.5001 6H3.5"
                    stroke="#e02424ff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>
                  <path
                    d="M9.5 11L10 16"
                    stroke="#e02424ff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>
                  <path
                    d="M14.5 11L14 16"
                    stroke="#e02424ff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>
                  <path
                    d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
                    stroke="#e02424ff"
                    stroke-width="1.5"
                  ></path>
                  <path
                    d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5"
                    stroke="#e02424ff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
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
            <ul>
              <li v-for="option in selectedPoll.options" :key="option._id" class="my-10">
                <div class="flex flex-col">
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
  <teleport to="body">
    <div v-if="showConfirmModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-content">
          <p class="text-modal">Are you sure you want to delete this poll?</p>
          <div class="flex justify-end mt-4 p-1 gap-4">
            <button @click="cancelDelete" class="btn-secondary">Cancel</button>
            <button @click="deletePoll" class="btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script >
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import store from '../store/store'
import { toast } from 'vue3-toastify'
export default {
  data() {
    return {
      myPolls: [],
      selectedPoll: null,
      showConfirmModal: false,
    }
  },
  async created() {
    const store = useStore()
    const polls = await store.dispatch('getMyPollsAction')
    this.myPolls = polls
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
    },
    confirmDelete() {
      this.showConfirmModal = true;
    },

    cancelDelete() {
      this.showConfirmModal = false;
    },
    async deletePoll() {
      try {
        const pollId = this.selectedPoll._id;
        const response = await store.dispatch('deletePollAction', pollId);
        if (response) {
          toast.success('Poll Deleted !', {
          position: toast.POSITION.TOP_CENTER
        })
          const polls = await store.dispatch('getMyPollsAction')
          this.myPolls = polls;
          this.selectedPoll=null;
          console.log(polls)
          console.log('Poll deleted successfully');
        } else {
          console.error('Error deleting poll:', response.message);
        }

        this.showConfirmModal = false;
      } catch (error) {
        console.error('Error deleting poll:', error);
      }
    },
  },

  watch: {
   
    selectedPoll: 'updateChartData',
  
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
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
}

.modal-content {
  padding: 20px;
}

.btn-secondary {
  background-color: #ccc;
  color: #333;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-danger {
  background-color: #ff4d4f;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary:hover, .btn-danger:hover {
  filter: brightness(90%);
}
.text-modal{
  font-size: 16px;
}
</style>
