<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div id="app-container">
    <Navbar />
    <main class="flex-1">
      <!-- Sección Hero -->
      <section class="hero-background bg-cover bg-center py-18 px-6">
        <div class="max-w-7xl mx-auto text-left relative z-auto">
          <h1 class="text-4xl sm:text-5xl font-extrabold mb-6 text-color-title font-poppins leading-snug"
              style="word-spacing: 0.2em;">
            Tu nuevo look empieza<br />con un solo clic
          </h1>

          <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-6 ">
            <p class="text-lg text-black font-sans md:flex-1"
               style="word-spacing: 0.2em;">
              Reserva tu corte, afeitado o tratamiento favorito sin<br />llamadas ni filas. Todo desde tu celular.
            </p>
            <router-link to="/agendar-cita" custom v-slot="{navigate}">
              <button
                  @click="navigate"
                  role="link"
                  class="btn-primary w-full md:w-auto px-4 py-2 md:px-6 md:py-3"
              >
                Agenda tu cita ahora
              </button>
            </router-link>
          </div>
        </div>
      </section>

      <!-- Sección de Servicios -->
      <section class="bg-white py-18 px-6 text-center">
        <h1 class="text-4xl sm:text-5xl font-extrabold mb-6 text-color-title font-poppins leading-snug"
            style="word-spacing: 0.2em;">
          Servicios de primer nivel,<br />pensados para tu estilo
        </h1>
        <div class="max-w-7xl mx-auto text-left relative z-auto">
        <p class="text-lg text-black  mb-6 font-maven"
        style="word-spacing: 0.2em;">
          Desde cortes clásicos hasta tratamientos capilares, encuentra todo lo que necesitas para verte y sentirte mejor.<br />
          Agenda tu servicio favorito con un clic.
        </p>
        </div>
        <router-link to="/agendar-cita" custom v-slot="{navigate}">
          <button
              @click="navigate"
              class="btn-primary">
          Explorar servicios
        </button>
        </router-link>
      </section>
    </main>
    <Footer />
  </div>
</template>

<style>


.hero-background {
  background-image: url('../assets/images/fondoIndex.jpg');
}
</style>
