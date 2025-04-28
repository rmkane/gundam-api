<template>
  <nav class="nav">
    <router-link to="/" class="home-link">Gundam Database</router-link>
    <div class="nav-links">
      <router-link to="/series">Series</router-link>
      <router-link to="/pilots">Pilots</router-link>
      <router-link to="/mobile-suits">Mobile Suits</router-link>
    </div>
  </nav>
</template>

<style scoped>
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
</style>
