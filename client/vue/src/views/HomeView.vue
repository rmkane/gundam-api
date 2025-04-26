<template>
  <div class="home">
    <h1>Welcome to the Gundam Database</h1>
    <div class="card-grid">
      <router-link to="/series" class="card">
        <h2>Series</h2>
        <p>Explore the various Gundam series and their details</p>
      </router-link>
      <router-link to="/pilots" class="card">
        <h2>Pilots</h2>
        <p>Discover the pilots who fought in the Universal Century</p>
      </router-link>
      <router-link to="/mobile-suits" class="card">
        <h2>Mobile Suits</h2>
        <p>Browse the extensive collection of mobile suits</p>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
}

h1 {
  margin-bottom: 2rem;
  color: #2c3e50;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card h2 {
  color: #42b983;
  margin-bottom: 1rem;
}

.card p {
  color: #666;
  margin: 0;
}
</style> 
