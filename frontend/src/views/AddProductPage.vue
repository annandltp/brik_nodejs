<template>
  <div>
    <h1>Product Details</h1>

    <div class="container table-responsive py-5">
      <!-- alert error -->
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

      <form @submit.prevent="addProduct">
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input
              type="text"
              id="name"
              class="form-control"
              v-model="newProduct.name"
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Category</label>
          <div class="col-sm-10">
            <select
              id="category"
              class="form-control"
              v-model="newProduct.categoryId"
              @change="updateCategoryName"
              required
            >
              <option value="" disabled>Select a category</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.categoryName }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Sku</label>
          <div class="col-sm-10">
            <input
              type="text"
              id="sku"
              class="form-control"
              v-model="newProduct.sku"
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Description</label>
          <div class="col-sm-10">
            <input
              type="text"
              id="description"
              class="form-control"
              v-model="newProduct.description"
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Price</label>
          <div class="col-sm-10">
            <input
              type="text"
              id="price"
              class="form-control"
              v-model="newProduct.price"
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Weight</label>
          <div class="col-sm-10">
            <input
              type="number"
              id="weight"
              class="form-control"
              v-model="newProduct.weight"
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Width</label>
          <div class="col-sm-10">
            <input
              type="number"
              id="width"
              class="form-control"
              v-model="newProduct.width"
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Length</label>
          <div class="col-sm-10">
            <input
              type="number"
              id="length"
              class="form-control"
              v-model="newProduct.length"
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Height</label>
          <div class="col-sm-10">
            <input
              type="number"
              id="height"
              class="form-control"
              v-model="newProduct.height"
              required
            />
          </div>
        </div>
        <!-- <div class="form-group row">
          <label class="col-sm-2 col-form-label">Image</label>
          <div class="col-sm-10">
            <input
              type="text"
              id="image"
              class="form-control"
              v-model="newProduct.image"
              required
            />
          </div>
        </div> -->

        <button type="submit" class="btn btn-success">Save Product</button>
        &nbsp;
        <router-link to="/" class="btn btn-primary">Back</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getAxiosConfig, getBaseUrl } from "@/helpers/app.js";

export default {
  data() {
    return {
      categories: [],

      newProduct: {
        name: "",
        categoryId: "",
        categoryName: "",
        description: "",
        sku: "",
        price: "",
        weight: "",
        width: "",
        length: "",
        height: "",
        image: "",
      },

      showAlert: false,
      alertMessage: "",
    };
  },
  async created() {
    try {
      const baseUrl = getBaseUrl();
      const axiosConfig = getAxiosConfig();

      // Fetch authentication data
      const authResponse = await axios.get(`${baseUrl}/checkAuth`, axiosConfig);
      this.data = authResponse.data.data;

      // Fetch categories from the endpoint and populate the categories data property
      const categoryResponse = await axios.get(
        `${baseUrl}/category`,
        axiosConfig
      );
      this.categories = categoryResponse.data.data;
      console.log(this.categories);
    } catch (error) {
      // Check if the error message is "Authentication failed"
      if (
        error.response &&
        error.response.data.message === "Authentication failed"
      ) {
        // Redirect to the login page
        this.$router.push("/login");
      } else {
        console.error("Error:", error.message);
      }
    }
  },

  methods: {
    updateCategoryName() {
      const selectedCategory = this.categories.find(
        (category) => category.id === this.newProduct.categoryId
      );
      if (selectedCategory) {
        this.newProduct.categoryName = selectedCategory.categoryName;
      } else {
        this.newProduct.categoryName = ""; // Reset if no category is selected
      }
    },

    displayErrorAlert(errorMessage) {
      this.alertMessage = errorMessage;
      this.showAlert = true;
    },

    addProduct() {
      axios
        .post(
          "http://localhost:8000/api/product",

          this.newProduct,
          getAxiosConfig()
        )
        .then((response) => {
          console.log("Product added:", response.data.product);

          this.$router.push("/");
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.error?.message || error.message;
          console.error("Error adding product:", errorMessage);

          this.displayErrorAlert(errorMessage);
        });
    },
  },
};
</script>
