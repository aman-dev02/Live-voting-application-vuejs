<template>
    <div class="notiBox overflow-y-auto" v-if="isVisible" data-aos="zoom-in" >
      <ul class="notification-list font-secondary ">
        <li v-for="(message, index) in filteredNotifications" :key="index" class="notification-item hover:font-primary hover:bg-primary hover:text-white cursor-pointer" >
          {{ message }}
        </li>
      </ul>
    </div>
  </template>
  
  
  <script setup>
import { socket } from '../socket';
import { ref,computed } from 'vue';
import { useStore } from 'vuex'
const notifications = ref([]);
const store =useStore();
const props = defineProps({
  isVisible: Boolean,
});

const user = store.state.user
socket.on('Vote', (data) => {
  if (data.username !== user.username) { 
    const newNotification = `${data.username} voted to your poll`;
    notifications.value.push(newNotification);
  }
});

const filteredNotifications = computed(() => {
  return notifications.value.filter(message => {
    return !message.includes(store.state.user.username); 
  });
});
</script>
  
  <style scoped>
  ::-webkit-scrollbar{
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
  box-shadow: 0px 10px 22px 14px rgba(0,0,0,0.1);
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

  