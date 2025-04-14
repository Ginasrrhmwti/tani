<template>
  <BaseLayout>
    <div class="flex flex-col items-center gap-10 px-4 py-12 bg-green-50 min-h-screen">
      <h1 class="text-4xl md:text-5xl font-bold text-green-800 text-center">
        Edit Profil Pengguna
      </h1>

      <form
        @submit.prevent="update"
        class="bg-white p-10 rounded-3xl shadow-lg border border-green-300 w-full max-w-3xl flex flex-col gap-8"
      >
        <div class="flex justify-center">
          <img :src="userPath" class="w-24 h-24 rounded-full border-2 border-green-500 object-cover" />
        </div>

        <!-- Nama -->
        <div class="flex flex-col">
          <label class="text-lg font-medium text-green-800 mb-1">Nama Lengkap</label>
          <input
            type="text"
            :value="user?.nama"
            @input="(e) => (user.nama = e.target.value)"
            class="input border-2 border-green-300 rounded-xl px-4 py-2 text-xl placeholder-gray-400"
            placeholder="Masukkan nama..."
          />
        </div>

        <!-- Alamat -->
        <div class="flex flex-col">
          <label class="text-lg font-medium text-green-800 mb-1">Alamat</label>
          <input
            type="text"
            :value="user?.alamat"
            @input="(e) => (user.alamat = e.target.value)"
            class="input border-2 border-green-300 rounded-xl px-4 py-2 text-xl placeholder-gray-400"
            placeholder="Masukkan alamat..."
          />
        </div>

        <!-- Email -->
        <div class="flex flex-col">
          <label class="text-lg font-medium text-green-800 mb-1">Email</label>
          <input
            type="email"
            :value="user?.email"
            @input="(e) => (user.email = e.target.value)"
            class="input border-2 border-green-300 rounded-xl px-4 py-2 text-xl placeholder-gray-400"
            placeholder="Masukkan email..."
          />
        </div>

        <!-- Tanggal Lahir -->
        <div class="flex flex-col">
          <label class="text-lg font-medium text-green-800 mb-1">Tanggal Lahir</label>
          <input
            type="date"
            :value="user?.tanggal_lahir"
            @input="(e) => (user.tanggal_lahir = e.target.value)"
            class="input border-2 border-green-300 rounded-xl px-4 py-2 text-xl"
          />
        </div>

        <!-- Tombol Simpan -->
        <button
          type="submit"
          class="bg-green-700 hover:bg-green-800 text-white text-xl font-semibold py-3 rounded-xl transition"
        >
          Simpan Perubahan
        </button>
      </form>

      <!-- Tombol Kembali -->
      <div class="w-full max-w-3xl flex justify-start">
        <router-link
          to="/"
          class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-xl rounded-xl transition"
        >
          ← Kembali
        </router-link>
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import { supabase } from "../../lib/supabaseClient";
import BaseLayout from "../layouts/base_layout.vue";

export default {
  components: {
    BaseLayout,
  },
  data() {
    return {
      userPath: "user.png",
      user: null,
    };
  },
  async created() {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("id", this.$cookies.get("auth_token"));

    if (error) {
      console.log(error);
    }
    this.user = data[0];
  },
  methods: {
    async update() {
      const { error } = await supabase
        .from("users")
        .update({
          nama: this.user.nama,
          email: this.user.email,
          alamat: this.user.alamat,
          tanggal_lahir: this.user.tanggal_lahir,
        })
        .eq("id", this.user.id);

      if (error) {
        alert("Gagal memperbarui profil.");
        return;
      }

      location.reload();
    },
  },
};
</script>
