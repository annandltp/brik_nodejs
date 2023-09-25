<template>
  <div>
    <h1>List of Products</h1>
    <router-link to="/add-product" class="btn btn-primary"
      >Add Product</router-link
    >

    <!-- Filter form -->

    <div class="container table-responsive py-5">
      <div class="py-3">
        <form @submit.prevent="searchProducts">
          <div class="form-group">
            <input
              type="text"
              v-model="searchTerm"
              class="form-control"
              placeholder="Search by Name"
            />
          </div>
          <button type="submit" class="btn btn-primary">Search</button>
        </form>
      </div>

      <table class="table table-bordered table-hover">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>
              {{
                new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(product.price)
              }}
            </td>
            <td>
              <router-link :to="'/product/' + product.id" class="btn btn-info"
                >Detail</router-link
              >
            </td>
          </tr>
        </tbody>
      </table>

      <nav>
        <ul class="pagination justify-content-center">
          <li
            class="page-item"
            :class="{ active: page === currentPage }"
            v-for="page in pageCount"
            :key="page"
          >
            <a class="page-link" @click="changePage(page)">{{ page }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { getAxiosConfig } from "@/helpers/app.js";

export default {
  data() {
    return {
      products: [], // Data produk dari server
      searchTerm: "", // Istilah pencarian
      currentPage: 1, // Halaman saat ini
      itemsPerPage: 10, // Jumlah produk per halaman
      totalData: 5, // Jumlah produk per halaman
    };
  },
  computed: {
    // Menghitung jumlah halaman yang diperlukan berdasarkan jumlah produk dan produk per halaman
    pageCount() {
      // Hitung jumlah halaman berdasarkan jumlah produk dan produk per halaman
      return Math.ceil(this.totalData / this.itemsPerPage);
    },
    // Mengambil produk yang sesuai dengan istilah pencarian
    filteredProducts() {
      const searchTerm = this.searchTerm.toLowerCase().trim();
      if (!searchTerm) {
        return this.products;
      }
      return this.products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
    },
    // Menampilkan produk di halaman saat ini
    displayedProducts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredProducts.slice(startIndex, endIndex);
    },
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      const axiosConfig = getAxiosConfig();
      const params = {
        name: this.searchTerm,
        page: this.currentPage,
        itemsPerPage: this.itemsPerPage,
        currentPage: this.currentPage,
      };

      axios
        .get("http://localhost:8000/api/product/search", {
          ...axiosConfig,
          params,
        })
        .then((response) => {
          this.products = response.data.data;
          console.log(response);
          this.totalData = response.data.totalItems;
          console.log(this.totalData);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);

          if (
            error.response &&
            error.response.data.message === "Authentication failed"
          ) {
            this.$router.push("/login");
          }
        });
    },
    searchProducts() {
      // Reset to the first page when searching
      this.currentPage = 1;
      this.fetchProducts(); // Fetch products with the updated search term
    },
    changePage(page) {
      this.currentPage = page;
      this.fetchProducts(); // Fetch products for the new page
    },
  },
};
</script>

<style>
/* Add any custom CSS styles here to style your table */
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
</style>
