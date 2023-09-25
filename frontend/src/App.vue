<template>
  <div>
    <button v-if="showLogoutButton" @click="logout" class="btn btn-danger">
      Logout
    </button>
    <br />
    <img alt="Vue logo" src="./assets/logo.png" />
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<script>
export default {
  computed: {
    showLogoutButton() {
      // Check if the current route is not "/login" or "/register"
      return !["/login", "/register"].includes(this.$route.path);
    },
  },
  methods: {
    logout() {
      // Clear the JWT token from local storage or any other storage mechanism
      localStorage.removeItem("token"); // Change 'jwtToken' to your storage key

      this.$router.push("/login");
    },
  },
};
</script>


