<template>
  <div>
    <h2>Login</h2>
    <div class="container table-responsive py-5">
      <!-- alert error -->
      <div
        v-if="successMessage"
        class="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        {{ successMessage }}
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>

    <div class="container py-5">
      <div
        v-if="alertMessage"
        class="alert alert-danger alert-dismissible fade show"
        role="alert"
      >
        {{ alertMessage }}
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form @submit.prevent="login">
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Username</label>
          <div class="col-sm-10">
            <input
              type="text"
              id="username"
              class="form-control"
              v-model="username"
              required
            />
          </div>
        </div>

        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Password</label>
          <div class="col-sm-10">
            <input
              type="password"
              id="password"
              class="form-control"
              v-model="password"
              required
            />
          </div>
        </div>
        <br />
        <button type="submit" class="btn btn-primary">Submit</button>
        &nbsp;
        <router-link to="/register" class="btn btn-warning"
          >Register</router-link
        >
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      alertMessage: "",
      successMessage: this.$route.query.message,
    };
  },
  created() {
    // Get the message from the query parameter
    const successMessage = this.$route.query.message;

    // Check if a message exists
    if (successMessage) {
      // Set a timeout to remove the route after 5 seconds
      setTimeout(() => {
        // Use the router's replace method to remove the current route
        this.$router.replace({ path: "/" }); // Replace '/' with your desired path
      }, 5000); // 5000 milliseconds (5 seconds)
    }
  },
  methods: {
    displayErrorAlert(errorMessage) {
      this.alertMessage = errorMessage;
      this.showAlert = true;
    },
    login() {
      // Replace with the actual login endpoint URL
      const loginUrl = "http://localhost:8000/api/auth/login";

      // Send a POST request with username and password
      axios
        .post(loginUrl, {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          const { token } = response.data;

          // Save the JWT token to localStorage
          localStorage.setItem("token", token);
          // Redirect to another page or perform other actions as needed
          // For example, you can redirect to the home page:
          this.$router.push("/");
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.message || error.message;
          console.error(errorMessage);
          // Handle login failure, show an error message, etc.
          this.displayErrorAlert(errorMessage);
          console.error("Error logging in:", error);
          // Handle login failure, show an error message, etc.
        });
    },
  },
};
</script>