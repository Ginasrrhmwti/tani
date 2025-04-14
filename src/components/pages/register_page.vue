<template>
  <div
    class="w-screen h-screen flex items-center justify-center bg-cover bg-no-repeat relative"
    style="background-image: url('/8d6d087ef401236547d2541aabe8cf84.png');"
  >
    <!-- Overlay tipis untuk memberi kontras pada form -->
    <div class="absolute inset-0 bg-black opacity-30"></div>
    
    <form
      @submit.prevent="insert"
      class="relative z-10 flex flex-col gap-8 items-center w-full max-w-3xl bg-white/70 border-2 border-green-500 rounded-3xl py-16 px-10 shadow-2xl transition duration-300"
    >
      <h1 class="text-5xl font-extrabold text-green-800 drop-shadow-lg">
        Halaman Register
      </h1>
      
      <!-- Input Username -->
      <input
        @input="(e) => (nama_lengkap = e.target.value)"
        required
        type="text"
        placeholder="Username..."
        class="input w-[80%] bg-white border-2 border-green-500 rounded-full placeholder-gray-500 text-3xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
      />

      <!-- Input Address -->
      <input
        @input="(e) => (alamat = e.target.value)"
        required
        type="text"
        placeholder="Address..."
        class="input w-[80%] bg-white border-2 border-green-500 rounded-full placeholder-gray-500 text-3xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
      />

      <!-- Input Email -->
      <input
        @input="(e) => (email = e.target.value)"
        required
        type="email"
        placeholder="Email..."
        class="input w-[80%] bg-white border-2 border-green-500 rounded-full placeholder-gray-500 text-3xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
      />

      <!-- Input Password -->
      <input
        @input="(e) => (password = e.target.value)"
        required
        type="password"
        placeholder="Password..."
        minlength="6"
        class="input w-[80%] bg-white border-2 border-green-500 rounded-full placeholder-gray-500 text-3xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
      />

      <!-- Input Tanggal Lahir -->
      <input
        @input="(e) => (tanggal_lahir = e.target.value)"
        required
        type="date"
        placeholder="Tanggal lahir..."
        class="input w-[80%] bg-white border-2 border-green-500 rounded-full placeholder-gray-500 text-gray-500 text-3xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
      />

      <!-- Tombol Aksi -->
      <div class="flex w-[80%] justify-between items-center">
        <router-link
          to="/login"
          class="bg-white border-2 border-green-500 rounded-full text-green-500 text-3xl px-6 py-3 hover:bg-green-100 transition"
        >
          Login?
        </router-link>
        <button
          class="bg-green-500 border-2 border-green-500 rounded-full text-white text-3xl px-6 py-3 hover:bg-green-600 transition"
        >
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { supabase } from "../../lib/supabaseClient";

export default {
  data() {
    return {
      nama_lengkap: "",
      alamat: "",
      email: "",
      password: "",
      tanggal_lahir: null,
    };
  },
  methods: {
    async insert() {
      const { error: ErrorInsert } = await supabase.from("users").insert({
        nama: this.nama_lengkap,
        alamat: this.alamat,
        email: this.email,
        password: this.password,
        tanggal_lahir: this.tanggal_lahir,
      });

      if (ErrorInsert) {
        alert("Gagal membuat akun");
        return;
      }

      this.$router.push("/login");
    },
  },
};
</script>
