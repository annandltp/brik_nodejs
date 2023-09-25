<template>
  <div>
    <h2>Register</h2>
    <!-- alert error -->
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
              required
              v-model="username"
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
              required
              v-model="password"
            />
          </div>
        </div>
        <br />
        <button type="submit" class="btn btn-primary">Submit</button>
        &nbsp;
        <router-link to="/login" class="btn btn-warning"
          >Back to Login</router-link
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
    };
  },
  methods: {
    displayErrorAlert(errorMessage) {
      this.alertMessage = errorMessage;
      this.showAlert = true;
    },
    login() {
      // Replace with the actual login endpoint URL
      const loginUrl = "http://localhost:8000/api/auth/register";

      // Send a POST request with username and password
      axios
        .post(loginUrl, {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
          this.$router.push({
            path: "/login",
            query: { message: "Register Successfully" },
          });
        })
        .catch((error) => {
          console.log(error);
          const errorMessage =
            error.response?.data?.error?.message || error.message;
          console.error(errorMessage);
          // Handle login failure, show an error message, etc.
          this.displayErrorAlert(errorMessage);
        });
    },
  },
};
</script>