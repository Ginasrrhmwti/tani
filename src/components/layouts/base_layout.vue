<template>
  <!-- Sidebar -->
  <div class="drawer drawer-end z-50">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side">
      <label
        for="my-drawer-4"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <li class="w-full h-36 flex items-center justify-center">
          <img :src="userPath" class="w-32 rounded-full border-2 border-green-500" />
        </li>
        <li>
          <router-link to="/profile" class="hover:text-green-600 transition">
            Edit profile
          </router-link>
        </li>
        <!-- Pastikan username dibandingkan dengan string 'admin' -->
        <li v-if="username === 'admin'">
          <router-link to="/report" class="hover:text-green-600 transition">
            Laporan
          </router-link>
        </li>
        <li>
          <a @click="logout" class="cursor-pointer hover:text-green-600 transition">
            Logout
          </a>
        </li>
      </ul>
    </div>
  </div>

  <!-- Main Layout -->
  <div class="flex flex-col gap-10 w-screen h-screen bg-white">
    <!-- Topbar (tetap sama seperti aslinya) -->
    <div class="bg-stone-600 flex justify-center">
      <div class="flex items-center py-1 justify-between container">
        <router-link to="/">
          <img v-bind:src="logoPath" class="w-24" />
        </router-link>
        <div class="text-white text-5xl">TANI CARE</div>
        <label for="my-drawer-4">
          <!-- <v-icon name="HiSolidMenu" /> -->
          <img v-bind:src="menuImagePath" class="w-12" />
        </label>
      </div>
    </div>
    <div class="flex flex-col items-center">
      <div class="container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from "../../lib/supabaseClient";

export default {
  props: ["path"],
  data() {
    return {
      logoPath: "636e37f68142fe0d73e6fdc1a75ff952.png",
      menuImagePath: "menu.svg",
      userPath: "user.png",
      username: "",
    };
  },
  async created() {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("id", this.$cookies.get("auth_token"));

    if (error) {
      this.$cookies.remove("auth_token");
      this.$router.push("/login");
      return;
    }

    // Ubah username menjadi lowercase agar pemeriksaan menjadi case-insensitive
    this.username = data[0].nama.toLowerCase();
  },
  methods: {
    logout() {
      this.$cookies.remove("auth_token");
      this.$router.push("/login");
    },
  },
};
</script>
