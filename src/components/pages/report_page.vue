<template>
  <BaseLayout>
    <div class="flex flex-col items-center gap-8 px-4 py-10 bg-green-50 min-h-screen">
      <h1 class="text-4xl md:text-5xl font-bold text-green-800 text-center">
        Laporan Pengaduan Petani
      </h1>

      <div
        class="overflow-x-auto w-full max-w-6xl bg-white shadow-lg border border-green-300 rounded-3xl"
      >
        <table class="min-w-full table-auto text-left text-xl text-gray-700">
          <thead class="bg-green-100 text-green-800 font-semibold">
            <tr>
              <th class="px-6 py-4">Nama</th>
              <th class="px-6 py-4">Alamat</th>
              <th class="px-6 py-4">Jenis Pengaduan</th>
              <th class="px-6 py-4">Deskripsi</th>
              <th class="px-6 py-4">Foto</th>
              <th class="px-6 py-4">Lokasi</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-if="data.length === 0"
              class="text-center text-gray-500 italic"
            >
              <td colspan="6" class="px-6 py-6">Belum ada pengaduan</td>
            </tr>
            <tr
              v-for="item in data"
              :key="item.id"
              class="border-t border-gray-200 hover:bg-green-50 transition"
            >
              <td class="px-6 py-4">{{ item.nama }}</td>
              <td class="px-6 py-4">{{ item.alamat }}</td>
              <td class="px-6 py-4">{{ item.jenis_pengaduan }}</td>
              <td class="px-6 py-4 max-w-xs break-words">
                {{ item.deskripsi }}
              </td>
              <td class="px-6 py-4">
                <img
                  :src="item.foto"
                  class="w-16 h-16 object-cover rounded-xl border border-gray-300"
                  alt="Foto"
                />
              </td>
              <td class="px-6 py-4">{{ item.lokasi }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="w-full max-w-6xl flex justify-start">
        <router-link
          to="/"
          class="mt-6 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl text-xl transition"
        >
          ← Kembali
        </router-link>
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import BaseLayout from "../layouts/base_layout.vue";
import { supabase } from "../../lib/supabaseClient";

export default {
  data() {
    return {
      data: [],
    };
  },
  components: {
    BaseLayout,
  },
  async created() {
    const { data, error } = await supabase.from("pengaduan").select();
    if (error) {
      alert("Gagal menampilkan laporan");
      return;
    }
    this.data = data;
  },
};
</script>
