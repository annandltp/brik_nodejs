<template>
  <div>
    <h1>Product Details</h1>
    <div class="container py-5">
      <form v-if="product">
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Category</label>
          <div class="col-sm-10">
            <input
              type="text"
              readonly
              class="form-control"
              :value="product.categoryName"
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">SKU</label>
          <div class="col-sm-10">
            <input
              type="text"
              readonly
              class="form-control"
              :value="product.sku"
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input
              type="text"
              readonly
              class="form-control"
              :value="product.name"
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Description</label>
          <div class="col-sm-10">
            <input
              type="text"
              readonly
              class="form-control"
              :value="product.description"
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Weight</label>
          <div class="col-sm-10">
            <input
              type="text"
              readonly
              class="form-control"
              :value="product.weight"
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Width</label>
          <div class="col-sm-10">
            <input
              type="text"
              readonly
              class="form-control"
              :value="product.width"
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Length</label>
          <div class="col-sm-10">
            <input
              type="text"
              readonly
              class="form-control"
              :value="product.length"
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Height</label>
          <div class="col-sm-10">
            <input
              type="text"
              readonly
              class="form-control"
              :value="product.height"
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Price</label>
          <div class="col-sm-10">
            <input
              type="text"
              readonly
              class="form-control"
              :value="product.price"
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Image</label>
          <div class="col-sm-10">
            <!-- Use the <img> element to display the image -->
            <img
              src="https://www.zdnet.com/a/img/resize/ba1b1ab92085d777ab5e313b34c66a94b7aa1236/2023/06/05/79a43eb8-ce38-488c-8cc0-e04699aaca7f/bing.jpg?auto=webp&width=1280"
              alt="Product Image"
              class="img-fluid"
            />
          </div>
        </div>
      </form>
    </div>

    <router-link to="/" class="btn btn-primary">Back</router-link>
    <br />
  </div>
</template>

<script>
import axios from "axios";
import { getAxiosConfig } from "@/helpers/app.js";

export default {
  data() {
    return {
      product: null, // Inisialisasi dengan null
    };
  },
  created() {
    const axiosConfig = getAxiosConfig();
    // Ambil ID produk dari parameter URL
    const productId = this.$route.params.id;

    // Lakukan permintaan GET untuk mendapatkan detail produk berdasarkan ID
    // Gantilah URL berikut sesuai dengan endpoint yang sesuai di server Anda
    axios
      .get(`http://localhost:8000/api/product/${productId}`, axiosConfig)
      .then((response) => {
        console.log(response.data.data);
        this.product = response.data.data; // Mengisi data produk dengan respons dari server
      })
      .catch((error) => {
        console.error("Error fetching products:", error);

        // Check if the error message is "Authentication failed"
        if (
          error.response &&
          error.response.data.message === "Authentication failed"
        ) {
          // Redirect to the login page
          this.$router.push("/login");
        }
      });
  },
};
</script>
