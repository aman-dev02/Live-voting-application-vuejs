<template>
    <section class="h-screen max-h-screen bg-image font-secondary flex flex-col justify-center items-center">
      <nav></nav>
      <div class="flex flex-col w-full md:w-[95%] lg:w-[80%] px-4 md:px-8 text-center justify-center items-center">
        <img src="../assets/Main.png" alt="" class="w-full md:w-2/4 lg:w-1/2 mb-2 max-w-[400px] animate-custom-bounce" />
        <h1 class="text-2xl md:text-5xl text-[#000] font-bold font-primary shine">
          Empower Democracy in <span class="text-primary">Real-Time</span>: Modernizing Participation
          and Decision-Making
        </h1>
        <div class="font-secondary text-center mt-2">
          <p class="text-sm md:text-base lg:text-base">
            Welcome to the future of democratic participation with our RealTime Voting Application!
            We're here to revolutionize the way you engage with your community, organization, or
            event. Say goodbye to traditional, time-consuming voting processes and embrace the speed,
            accuracy, and convenience of real-time voting.
          </p>
        </div>
        <div class="flex flex-col md:flex-row gap-2 mt-4">
          <router-link to="/signup">
            <button
              type="button"
              class="w-full md:w-auto py-2.5 px-5 text-sm md:text-base lg:text-base font-medium text-white focus:outline-none bg-primary rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-200"
            >
              Get Started
            </button>
          </router-link>
          <router-link to="/login">
            <button
              type="button"
              class="w-full md:w-auto py-2.5 px-5 mt-2 md:mt-0 text-sm md:text-base lg:text-base font-medium text-gray-900 focus:outline-none bg-gray-200 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-200"
            >
              Login
            </button>
          </router-link>
        </div>
      </div>
    </section>
  </template>
  
  <script setup></script>
  
  <style scoped>
  .bg-image {
    background: rgb(245, 245, 245);
    background: linear-gradient(29deg, rgba(245, 245, 245, 1) 40%, rgba(188, 206, 227, 1) 100%);
    backdrop-filter: blur(18px);
  }
  
  .shine {
    background: #000 linear-gradient(-40deg, transparent 0%, transparent 40%, #fff 50%, transparent 60%, transparent 100%) 0 0 no-repeat;
    background-size: 200px;
    color: rgba(0, 0, 0, 0.3);
    background-clip: text;
    animation-name: shine;
    animation-duration: 6s;
    animation-iteration-count: infinite;
    text-shadow: 0 0px 0px rgba(103, 103, 103, 0.5);
  }
  
  @keyframes shine {
    0%, 10% {
      background-position: -1000px;
    }
    20% {
      background-position: top left;
    }
    90% {
      background-position: top right;
    }
    100% {
      background-position: 1000px;
    }
  }
  
  .animate-custom-bounce {
    animation: custom-bounce 2s linear infinite;
  }
  
  @keyframes custom-bounce {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }
  
  /* Responsive adjustments */
  @media (max-width: 640px) {
    .text-primary {
      font-size: 1.25rem;
    }
  }
  </style>
  