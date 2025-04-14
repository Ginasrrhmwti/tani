<template>
  <BaseLayout>
    <div class="flex flex-col items-center gap-10 px-6 py-12 bg-green-50 min-h-screen">
      <div class="text-5xl font-bold text-green-800 text-center">
        Form Pengaduan Petani
      </div>

      <form
        @submit.prevent="complaint"
        class="p-10 flex flex-col gap-7 border-2 border-green-400 rounded-3xl bg-white shadow-xl w-full max-w-3xl"
      >
        <!-- Input Nama -->
        <input
          v-model="nama"
          required
          type="text"
          placeholder="Nama..."
          class="input w-full border-2 border-green-400 rounded-xl placeholder-gray-500 text-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300"
        />

        <!-- Input Alamat -->
        <input
          v-model="alamat"
          required
          type="text"
          placeholder="Alamat..."
          class="input w-full border-2 border-green-400 rounded-xl placeholder-gray-500 text-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300"
        />

        <!-- Input Jenis Pengaduan -->
        <input
          v-model="jenis_pengaduan"
          required
          type="text"
          placeholder="Jenis pengaduan..."
          class="input w-full border-2 border-green-400 rounded-xl placeholder-gray-500 text-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300"
        />

        <!-- Input Deskripsi -->
        <textarea
          v-model="deskripsi"
          placeholder="Deskripsi..."
          rows="4"
          class="border-2 border-green-400 rounded-xl placeholder-gray-500 text-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300 resize-none"
        ></textarea>

        <!-- Upload Gambar -->
        <input
          @change="handleInputImage"
          required
          type="file"
          accept="image/*"
          id="foto"
          class="hidden"
        />
        <label
          for="foto"
          class="w-full border-2 border-green-400 text-gray-500 text-2xl px-4 py-3 rounded-xl cursor-pointer hover:bg-green-100 transition"
        >
          {{ labelFoto }}
        </label>

        <!-- Input Lokasi -->
        <input
          v-model="lokasi"
          required
          type="text"
          placeholder="Lokasi..."
          class="input w-full border-2 border-green-400 rounded-xl placeholder-gray-500 text-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300"
        />

        <!-- Tombol Aksi -->
        <div class="w-full flex items-center justify-between">
          <router-link
            to="/"
            class="bg-green-600 hover:bg-green-700 text-white text-2xl font-semibold py-3 px-6 rounded-xl transition"
          >
            ← Kembali
          </router-link>
          <button
            class="bg-green-600 hover:bg-green-700 text-white text-2xl font-semibold py-3 px-6 rounded-xl transition"
          >
            Kirim
          </button>
        </div>
      </form>
    </div>
  </BaseLayout>
</template>
<script>
import BaseLayout from "../layouts/base_layout.vue";
import { supabase } from "../../lib/supabaseClient";

export default {
  components: {
    BaseLayout,
  },
  data() {
    return {
      nama: "",
      alamat: "",
      jenis_pengaduan: "",
      deskripsi: "",
      foto: null,
      nama_foto: "",
      lokasi: "",
      labelFoto: "Masukkan foto",
    };
  },
  methods: {
    async complaint() {
      if (!this.foto) {
        alert("Harap masukkan foto terlebih dahulu.");
        return;
      }

      // 1. Upload gambar ke storage
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(this.nama_foto, this.foto, { upsert: false });

      if (uploadError) {
        alert("Gagal mengirim gambar.");
        return;
      }

      // 2. Ambil URL gambar setelah berhasil upload
      const fotoUrl = `https://zlcwuuievxmuwjlksztx.supabase.co/storage/v1/object/public/images/${this.nama_foto}`;

      // 3. Simpan data ke tabel pengaduan
      const { error: insertError } = await supabase.from("pengaduan").insert({
        nama: this.nama,
        alamat: this.alamat,
        jenis_pengaduan: this.jenis_pengaduan,
        deskripsi: this.deskripsi,
        foto: fotoUrl,
        lokasi: this.lokasi,
      });

      if (insertError) {
        alert("Gagal menyimpan pengaduan.");
        return;
      }

      alert("Pengaduan berhasil dikirim!");
      this.$router.push("/report");
    },

    handleInputImage(event) {
      const file = event.target.files[0];
      if (file) {
        const randomName = Math.random().toString(36).substring(2, 7);
        this.nama_foto = randomName + "_" + file.name;
        this.foto = file;
        this.labelFoto = file.name;
      } else {
        this.foto = null;
        this.labelFoto = "Masukkan foto";
      }
    },
  },
};
</script>
