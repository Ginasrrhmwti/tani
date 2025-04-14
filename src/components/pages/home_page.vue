<template>
  <BaseLayout>
    <div class="flex justify-center py-16 px-4 md:px-10 bg-green-50 min-h-screen">
      <div class="container max-w-5xl flex flex-col items-center gap-10">
        <!-- Judul -->
        <h1 class="text-4xl md:text-5xl font-bold text-green-800 text-center">
          Selamat Datang di Pengaduan Tani!
        </h1>

        <!-- Gambar -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <img
            :src="leftImagePath"
            alt="Petani 1"
            class="w-full h-80 object-cover rounded-3xl shadow-lg"
          />
          <img
            :src="rightImagePath"
            alt="Petani 2"
            class="w-full h-80 object-cover rounded-3xl shadow-lg"
          />
        </div>

        <!-- Deskripsi -->
        <p class="text-lg md:text-2xl text-center text-gray-700 leading-relaxed max-w-3xl">
          Kami hadir untuk membantu petani dalam menyampaikan keluhan, masalah, dan aspirasi
          terkait pertanian. Dengan aplikasi ini, Anda bisa melaporkan kendala yang dihadapi
          dan mendapatkan solusi dengan cepat serta tepat.
        </p>

        <!-- Tombol -->
        <router-link
          to="/complaint"
          class="bg-green-700 hover:bg-green-800 text-white text-xl md:text-2xl font-semibold px-8 py-3 rounded-xl shadow-md transition"
        >
          Buat Pengaduan
        </router-link>
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import BaseLayout from "../layouts/base_layout.vue";

export default {
  data() {
    return {
      leftImagePath: "01c42f932351a109f49d0fa7accd029f.jpeg",
      rightImagePath: "7650fb13387b806b4be9e50c82650242.jpeg",
    };
  },
  components: {
    BaseLayout,
  },
};
</script>
