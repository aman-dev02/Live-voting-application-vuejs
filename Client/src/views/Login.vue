<template>
    <section class="secction-signup bg-image">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700" data-aos="zoom-in">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white font-primary">
                       
                        Sign in
                    </h1>
                    <form class="space-y-4 md:space-y-6 font-secondary" action="#"  @submit.prevent="handleLogin" >
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required="true" v-model="userData.email">
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" v-model="userData.password">
                        </div>
                      
                     
                        <button type="submit" class="w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Dont have an account? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500"><router-link to="/signup">Signup here </router-link></a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
      </section>
    
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { toast } from 'vue3-toastify';
const userData = ref({
  email: '',
  password: '',
});
const router = useRouter();
const store = useStore(); 
const handleLogin = async () => {
  try {
    const response = await store.dispatch('login', userData.value);
  console.log( response)
    if (response.status) {
      toast.success('Login Successful', {
          position: toast.POSITION.TOP_CENTER
        })
      router.push('/dashboard');
    } else {
      toast.error('Login failed', {
          position: toast.POSITION.TOP_CENTER
        })
 
    }
  } catch (error) {
    console.error('Login error:', error);
    toast.error('Login failed', {
          position: toast.POSITION.TOP_CENTER
        })
  }
};

// const showToast = (message, bgColor, textColor) => {
//   const toast = document.createElement('div');
//   toast.className = `fixed top-20 right-4 py-2 px-4 rounded ${bgColor} ${textColor} drop-shadow`;
//   toast.textContent = message;

//   document.body.appendChild(toast);

//   setTimeout(() => {
//     document.body.removeChild(toast);
//   }, 3000);
// };
</script>

<style scoped>
.bg-image {
    background: rgb(245,245,245);
    background: linear-gradient(29deg, rgba(245,245,245,1) 40%, rgba(188,206,227,1) 100%);
    backdrop-filter: blur(18px);
}
.secction-signup{
    height: 100vh;
    background-color: #F5F5F5;
    
    

}
</style>