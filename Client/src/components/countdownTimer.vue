<template>
  <div :class="{'countdown-timer': true, 'expired': isExpired}" class="font-third text-sm">
    {{ displayTime }}
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useStore } from 'vuex'; 


const props = defineProps({
  closesAt: Date,
  pollId: String, // Add a prop for pollId
});

const store = useStore(); 

const endTime = ref(null);
const displayTime = ref('00:00:00');
const isExpired = ref(false);

const remainingTime = computed(() => {
  if (endTime.value) {
    return endTime.value - new Date();
  }
  return 0;
});

watch(remainingTime, (newRemainingTime) => {
  if (newRemainingTime <= 0) {
    isExpired.value = true;
    if (props.pollId) {
      store.dispatch('updatePollStatusAction', {
        pollId: props.pollId,
        isOpen: false,
      });
    }
  }
});

const updateFormattedTime = () => {
  if (endTime.value) {
    const now = new Date();
    const remainingTime = endTime.value - now;

    if (remainingTime <= 0) {
      displayTime.value = 'Expired';
      isExpired.value = true;
    } else {
      const totalSeconds = Math.floor(remainingTime / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);

      const seconds = (totalSeconds % 60).toString().padStart(2, '0');
      const minutes = (totalMinutes % 60).toString().padStart(2, '0');
      const hours = (totalHours % 24).toString().padStart(2, '0');
      
      if (totalDays > 0) {
        displayTime.value = `${totalDays}D :${hours}H :${minutes}M :${seconds}S`;
      } else {
        displayTime.value = `${hours}H :${minutes}M :${seconds}S`;
      }
    }
  }
};

watch(() => props.closesAt, (newClosesAt) => {
  endTime.value = new Date(newClosesAt);
  updateFormattedTime();
});

onMounted(() => {
  endTime.value = new Date(props.closesAt);
  updateFormattedTime();
  setInterval(updateFormattedTime, 1000);
});
updateFormattedTime();
</script>

<style scoped>
.countdown-timer {
  background-color: #05ac1e;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-weight: bold;
}

.expired {
  background-color: #e02424;
  border: 2px solid #e02424;
}
</style>
