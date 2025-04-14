<template>
  <div
    class="w-screen h-screen flex items-center justify-center bg-cover bg-no-repeat relative"
    style="background-image: url('/8d6d087ef401236547d2541aabe8cf84.png');"
  >
    <!-- Tidak menggunakan overlay, sehingga background image tampil penuh -->
    <form
      @submit.prevent="login"
      class="relative z-10 flex flex-col gap-8 items-center w-full max-w-3xl bg-white/70 border-2 border-green-500 rounded-3xl py-20 px-10 shadow-xl transition duration-300"
    >
      <div class="text-5xl font-extrabold text-green-800 drop-shadow-lg">
        Halaman Login
      </div>
      
      <!-- Input Email -->
      <input
        @input="(e) => (email = e.target.value)"
        type="email"
        placeholder="Email..."
        class="input w-full bg-white border-2 border-green-500 rounded-full placeholder-gray-500 text-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        required
      />
      
      <!-- Input Password -->
      <input
        @input="(e) => (password = e.target.value)"
        type="password"
        placeholder="Password..."
        min="6"
        class="input w-full bg-white border-2 border-green-500 rounded-full placeholder-gray-500 text-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        required
      />
      
      <!-- Link Register dan Tombol Login -->
      <div class="flex w-full justify-between items-center">
        <router-link
          to="/register"
          class="bg-white border-2 border-green-500 rounded-full text-green-500 text-2xl px-6 py-3 hover:bg-green-100 transition"
        >
          Register?
        </router-link>
        <button
          class="bg-green-500 border-2 border-green-500 rounded-full text-white text-2xl px-6 py-3 hover:bg-green-600 transition"
        >
          Login
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
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("email", this.email)
        .eq("password", this.password);

      if (error) {
        alert("username atau password salah");
        return;
      }
      
      this.$cookies.set("auth_token", data[0].id);
      localStorage.setItem("credentials", JSON.stringify(data[0]));
      this.$router.push("/");
    },
  },
};
</script>
