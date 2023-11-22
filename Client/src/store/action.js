import axios from 'axios'
 import axiosInstance from './axiosInstance'
export const actions = {
  async login({ commit }, { email, password }) {
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });
  
      if (response.data) {
        commit('setUser', response.data.user);
        localStorage.setItem('token', response.data.token);
        return response.data; 
      }
  
      return { success: false, message: 'Invalid credentials' };
    } catch (error) {
      console.error('An error occurred during login:', error);
      return { success: false, message: 'An error occurred during login' };
    }
  },
    
  async logout({ commit }) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    commit('clearUser')
  },

  async register({ commit }, { name, email, password }) {
    try {
      const response = await axios.post('/api/auth/signup', {
        name,
        email,
        password
      })
      if (response.data) {
        commit('setUser', response.data.user)
        return { success: true }
      }
      return { success: false, message: 'Registration failed' }
    } catch (error) {
      console.error('An error occurred during registration:', error)
      return { success: false, message: 'An error occurred during registration' }
    }
  },
  async createPollAction({ commit }, pollData) {
    try {
      const response = await axiosInstance.post('/api/polls', pollData);
      commit('SET_POLLS', response.data.poll); 
      return response.data.poll; 
    } catch (error) {
      console.error('Error creating poll:', error);
      throw error;
    }
  },
  async getAllPollsAction({ commit }) {
    try {
      const response = await axiosInstance.get('/api/polls');
      const polls = response.data;
      commit('SET_POLLS', polls);
      return polls;
    } catch (error) {
      console.error('Error fetching open polls:', error);
      throw error;
    }
  },

  async recordVoteAction({ commit }, { pollId, optionIndex }) {
    try {
      await axiosInstance.post(`/api/polls/${pollId}/vote`, { optionIndex });
    } catch (error) {
      console.error('Error recording vote:', error);
      throw error;
    }
  },
  async getMyPollsAction({ commit }) {
    try {
      const response = await axiosInstance.get('/api/polls/mypolls');
      const myPolls = response.data;
      commit('SET_MY_POLLS', myPolls);
      return myPolls;
    } catch (error) {
      console.error('Error fetching my polls:', error);
      throw error;
    }
  },

  async updatePollStatusAction({ commit }, { pollId, isOpen }) {
    try {
      const response = await axiosInstance.patch(`api/polls/update-poll-status/${pollId}`, { isOpen });
      console.log(response)
      if (response.data.message) {
        return response.data;
      } else if (response.data.error) {
        return { success: false, message: response.data.error };
      }
    } catch (error) {
      console.error('Error updating poll status:', error);
      return { success: false, message: 'An error occurred while updating poll status' };
    
    }
  },
  async sendNotificationAction({ commit }, { username, pollId, poll, optionVoted, userId }) {
    try {
     const res= await axiosInstance.post('/api/notification', { username, pollId, poll, optionVoted, userId });
     console.log(res)
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  },

  async getNotificationsAction({ commit }) {
    try {
      const response = await axiosInstance.get('/api/notification');
      const notifications = response.data;
      // console.log(notifications)
      // commit('SET_NOTIFICATIONS', notifications);
      return notifications;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },
  async deletePollAction({ commit }, pollId) {
    try {
      const response = await axiosInstance.delete(`/api/polls/${pollId}`);
      
      if (response.data.message) {
        commit('REMOVE_POLL', pollId);
        return response.data;
      } else if (response.data.error) {
        return { success: false, message: response.data.error };
      }
    } catch (error) {
      console.error('Error deleting poll:', error);
      throw error;
    }
  },
}

  
