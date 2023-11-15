<template>
  <div class="notiBox overflow-y-auto" v-if="isVisible" data-aos="zoom-in">
    <ul class="notification-list font-secondary">
      <li v-for="(notification, index) in filteredNotifications" :key="index" class="notification-item hover:font-primary hover:bg-primary hover:text-white cursor-pointer text-sm">
        {{ notification.username }} voted to your poll "{{ notification.poll.title }}" at {{ formatDateTime(notification.votedAt) }}. Option voted: {{ notification.optionVoted }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { socket } from '../socket'; 
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const notifications = ref([]);
const props = defineProps({
  isVisible: Boolean,
});

const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

const fetchNotifications = async () => {
  try {
    const response = await store.dispatch('getNotificationsAction');
    notifications.value = response;
    // console.log(response)
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
};

const filteredNotifications = computed(() => {
  return notifications.value;
});

onMounted(() => {
  fetchNotifications();

  socket.on('Vote', (data) => {
    fetchNotifications();
  });
});
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}

.notiBox {
  height: 400px;
  width: 300px;
  position: absolute;
  z-index: 9000;
  background-color: rgb(253, 253, 253);
  top: 72px;
  right: 120px;
  box-shadow: 0px 10px 22px 14px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.notification-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.notification-item {
  padding: 10px;
  border-bottom: 1px solid #e7e7e7;
}
</style>
