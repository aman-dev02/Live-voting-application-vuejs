<template>
  <div :class="{'countdown-timer': true, 'expired': isExpired}" class="font-third text-sm">
    {{ displayTime }}
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  closesAt: Date,
});

const endTime = ref(null);
const displayTime = ref('00:00:00');
const isExpired = ref(false);

console.log(endTime);

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
