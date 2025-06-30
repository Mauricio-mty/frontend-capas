<script setup>
</script>

<template>
    <footer
        class="text-white pt-3 px-6 py-0 flex justify-between items-center w-full"
        style="background-color: var(--nav-bg);"
    >

      <div class="font-poppins text-2xl tracking-tight font-extrabold">
        <h1> NextCut </h1>
      </div>
      <div class="w-full max-w-7xl px-2 sm:px-2 lg:px-4 ">
        <div class="flex h-20 items-center justify-end">
          <ul class="flex flex-row gap-6 items-center">
            <li class="px-3 py-2 relative group h-6 w-6">
              <img
                  src="../assets/images/instagramIcon.png"
                  class="absolute top-0 left-0 h-6 w-6 object-contain"a
              />
            </li>
            <li class="px-3 py-2 relative group h-6 w-6">
              <img
                  src="../assets/images/whatsappIcon.png"
                  class="absolute top-0 left-0 h-6 w-6 object-contain "
              />
            </li>
            <li class="px-3 py-2 relative group h-6 w-6">
              <img
                  src="../assets/images/facebookIcon.png"
                  class="absolute top-0 left-0 h-6 w-6 object-contain"
              />
            </li>
          </ul>
        </div>
      </div>
    </footer>
</template>

<style>

html, body, #app {
  height: 100%;
  margin: 0;
}

main {
  flex: 1;
}

</style>