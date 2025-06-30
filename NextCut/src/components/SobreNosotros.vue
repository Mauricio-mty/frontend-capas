<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
    <Navbar />
    <main class="flex-1">
      <!-- Hero Section con imagen principal -->
      <div class="relative h-96 mb-12 overflow-hidden">
        <img src="../assets/images/nosotros/image.png" alt="NextCut Barbería" class="w-full h-full object-cover transform scale-105 transition-transform duration-700 hover:scale-100" />
        <div class="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent flex items-center justify-center">
          <div class="text-center text-white transform translate-y-4 opacity-0 animate-fadeInUp">
            <h1 class="text-5xl font-extrabold mb-4 font-poppins text-shadow-lg">Sobre NextCut</h1>
            <p class="text-xl text-shadow-md">Donde el estilo y la experiencia se encuentran</p>
          </div>
        </div>
      </div>

      <div class="w-full px-8">
        <!-- Historia y Misión/Visión -->
        <div class="grid md:grid-cols-2 gap-12 mb-16">
          <div class="space-y-6 transform translate-x-8 opacity-0 animate-slideInLeft">
            <h2 class="text-3xl font-bold text-[#AE7E41] hover:text-[#8B6B35] transition-colors duration-300">Nuestra Historia</h2>
            <p class="text-gray-700 text-lg leading-relaxed">NextCut nació de la pasión por el arte del barbero y el deseo de crear un espacio donde cada cliente se sienta único. Desde nuestros inicios, nos hemos enfocado en brindar cortes modernos, clásicos y tratamientos de calidad en un ambiente relajado y profesional.</p>
            <div class="grid grid-cols-2 gap-6">
              <div class="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#AE7E41]/20">
                <h3 class="text-xl font-bold mb-3 text-[#AE7E41]">Nuestra Misión</h3>
                <p class="text-gray-700 text-sm">Ofrecer servicios de barbería de alta calidad en un ambiente profesional y acogedor, donde cada visita se convierta en un momento de cuidado personal, confianza y estilo.</p>
              </div>
              <div class="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#AE7E41]/20">
                <h3 class="text-xl font-bold mb-3 text-[#AE7E41]">Nuestra Visión</h3>
                <p class="text-gray-700 text-sm">Ser reconocidos como la barbería de referencia en cada ciudad donde operamos, destacando por nuestra excelencia en el servicio, talento humano y capacidad de adaptación a las nuevas tecnologías.</p>
              </div>
            </div>
          </div>
          <div class="relative h-96 transform translate-x-8 opacity-0 animate-slideInRight">
            <img src="../assets/images/nosotros/image (1).png" alt="Barbería NextCut" class="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105" />
          </div>
        </div>

        <!-- Lo Que Nos Distingue con imagen -->
        <div class="mb-16 transform translate-y-8 opacity-0 animate-fadeInUp">
          <h2 class="text-3xl font-bold text-center mb-8 text-[#AE7E41] hover:text-[#8B6B35] transition-colors duration-300">Lo Que Nos Distingue</h2>
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div class="space-y-4">
              <div class="flex items-start gap-4 p-4 rounded-lg hover:bg-gradient-to-r hover:from-[#AE7E41]/5 hover:to-transparent transition-all duration-300 group">
                <span class="text-3xl group-hover:scale-110 transition-transform duration-300">👥</span>
                <div>
                  <h3 class="font-bold text-lg text-[#0E1B24] group-hover:text-[#AE7E41] transition-colors duration-300">Atención Personalizada</h3>
                  <p class="text-gray-700">Cada cliente recibe atención personalizada y dedicada.</p>
                </div>
              </div>
              <div class="flex items-start gap-4 p-4 rounded-lg hover:bg-gradient-to-r hover:from-[#AE7E41]/5 hover:to-transparent transition-all duration-300 group">
                <span class="text-3xl group-hover:scale-110 transition-transform duration-300">✨</span>
                <div>
                  <h3 class="font-bold text-lg text-[#0E1B24] group-hover:text-[#AE7E41] transition-colors duration-300">Servicios Tradicionales y Modernos</h3>
                  <p class="text-gray-700">Combinamos técnicas clásicas con las últimas tendencias.</p>
                </div>
              </div>
              <div class="flex items-start gap-4 p-4 rounded-lg hover:bg-gradient-to-r hover:from-[#AE7E41]/5 hover:to-transparent transition-all duration-300 group">
                <span class="text-3xl group-hover:scale-110 transition-transform duration-300">📍</span>
                <div>
                  <h3 class="font-bold text-lg text-[#0E1B24] group-hover:text-[#AE7E41] transition-colors duration-300">Múltiples Sucursales</h3>
                  <p class="text-gray-700">Presencia en múltiples ubicaciones con el mismo estándar de calidad.</p>
                </div>
              </div>
              <div class="flex items-start gap-4 p-4 rounded-lg hover:bg-gradient-to-r hover:from-[#AE7E41]/5 hover:to-transparent transition-all duration-300 group">
                <span class="text-3xl group-hover:scale-110 transition-transform duration-300">📅</span>
                <div>
                  <h3 class="font-bold text-lg text-[#0E1B24] group-hover:text-[#AE7E41] transition-colors duration-300">Plataforma Digital</h3>
                  <p class="text-gray-700">Reserva de citas fácil y rápida sin esperas.</p>
                </div>
              </div>
              <div class="flex items-start gap-4 p-4 rounded-lg hover:bg-gradient-to-r hover:from-[#AE7E41]/5 hover:to-transparent transition-all duration-300 group">
                <span class="text-3xl group-hover:scale-110 transition-transform duration-300">💼</span>
                <div>
                  <h3 class="font-bold text-lg text-[#0E1B24] group-hover:text-[#AE7E41] transition-colors duration-300">Equipo Capacitado</h3>
                  <p class="text-gray-700">Barberos altamente capacitados y apasionados por su trabajo.</p>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4 h-96">
              <img src="../assets/images/nosotros/image (2).png" alt="Servicios NextCut" class="w-full h-full object-cover rounded-lg shadow-md hover:shadow-xl transition-all duration-500 hover:scale-105" />
              <img src="../assets/images/nosotros/image (3).png" alt="Ambiente NextCut" class="w-full h-full object-cover rounded-lg shadow-md hover:shadow-xl transition-all duration-500 hover:scale-105" />
            </div>
          </div>
        </div>

        <!-- Nuestro Compromiso con imagen -->
        <div class="mb-16 transform translate-y-8 opacity-0 animate-fadeInUp">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div class="relative h-96">
              <img src="../assets/images/nosotros/image (4).png" alt="Compromiso NextCut" class="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105" />
            </div>
            <div class="bg-gradient-to-br from-[#AE7E41]/10 via-[#AE7E41]/5 to-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-[#AE7E41]/20">
              <h2 class="text-3xl font-bold mb-4 text-[#AE7E41] hover:text-[#8B6B35] transition-colors duration-300">Nuestro Compromiso</h2>
              <p class="text-gray-700 text-lg leading-relaxed">Cada cliente que cruza nuestras puertas es nuestra prioridad. Nos esforzamos por brindar un servicio puntual, higiénico, detallista y que resalte la personalidad de cada uno. Por eso, además de ofrecer los mejores cortes y afeitados, invertimos en herramientas tecnológicas que mejoran tu experiencia con nosotros.</p>
            </div>
          </div>
        </div>

        <!-- Tecnología al Servicio del Estilo -->
        <div class="mb-16 transform translate-y-8 opacity-0 animate-fadeInUp">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div class="bg-gradient-to-br from-[#0E1B24]/10 via-[#0E1B24]/5 to-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-[#0E1B24]/20">
              <h2 class="text-3xl font-bold mb-4 text-[#0E1B24] hover:text-[#AE7E41] transition-colors duration-300">Tecnología al Servicio del Estilo</h2>
              <p class="text-gray-700 text-lg leading-relaxed">Sabemos que tu tiempo vale. Por eso desarrollamos un sistema en línea que te permite reservar tu cita en pocos pasos, elegir tu barbero favorito y recibir recordatorios para que nunca pierdas tu turno. Porque queremos que tu experiencia sea tan moderna como tu estilo.</p>
            </div>
            <div class="grid grid-cols-2 gap-4 h-96">
              <img src="../assets/images/nosotros/image (5).png" alt="Tecnología NextCut" class="w-full h-full object-cover rounded-lg shadow-md hover:shadow-xl transition-all duration-500 hover:scale-105" />
              <img src="../assets/images/nosotros/image (6).png" alt="Experiencia NextCut" class="w-full h-full object-cover rounded-lg shadow-md hover:shadow-xl transition-all duration-500 hover:scale-105" />
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center py-12 bg-gradient-to-br from-[#AE7E41]/15 via-[#0E1B24]/10 to-[#AE7E41]/5 rounded-xl mb-12 shadow-lg hover:shadow-xl transition-all duration-500 transform translate-y-8 opacity-0 animate-fadeInUp">
          <h2 class="text-4xl font-bold mb-4 text-[#AE7E41] hover:text-[#8B6B35] transition-colors duration-300">¡Tu mejor versión empieza aquí!</h2>
          <p class="text-xl text-gray-700 mb-6">En NextCut, no solo cortamos cabello: creamos experiencias. Ven, relájate y déjanos cuidar tu estilo.</p>
          <p class="text-lg font-semibold text-[#0E1B24] hover:text-[#AE7E41] transition-colors duration-300">¿Listo para un cambio? ¡Te esperamos!</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-slideInLeft {
  animation: slideInLeft 0.8s ease-out forwards;
}

.animate-slideInRight {
  animation: slideInRight 0.8s ease-out forwards;
}

.text-shadow-lg {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.text-shadow-md {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

/* Delay animations for staggered effect */
.animate-fadeInUp:nth-child(1) { animation-delay: 0.1s; }
.animate-fadeInUp:nth-child(2) { animation-delay: 0.2s; }
.animate-fadeInUp:nth-child(3) { animation-delay: 0.3s; }
.animate-fadeInUp:nth-child(4) { animation-delay: 0.4s; }
</style> 