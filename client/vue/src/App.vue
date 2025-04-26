<script setup lang="ts">
// No additional setup needed
</script>

<template>
  <div class="app">
    <nav class="nav">
      <router-link to="/" class="home-link">Gundam Database</router-link>
      <div class="nav-links">
        <router-link to="/series">Series</router-link>
        <router-link to="/pilots">Pilots</router-link>
        <router-link to="/mobile-suits">Mobile Suits</router-link>
      </div>
    </nav>
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.nav {
  background-color: #2c3e50;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.home-link {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav a:hover {
  background-color: #34495e;
}

.nav a.router-link-active {
  background-color: #42b983;
}

main {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 2rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
