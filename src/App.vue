<template>
  <div id="app" class="h-screen w-screen font-thin">
    <div class="container py-32">
      <div class="mb-12">
        <label class="mr-2">Enter a number:</label>

        <input type="number" @keyup="checkInput" class="border p-2 mb-2" v-model.number="numberToCheck">

        <p v-if="alertBigNumber" class="italic text-sm text-grey-dark thin">That's to big! enter a number under 500</p>
      </div>

      <steps :end="isEnd">
        <step name="Step 1">
          <p class="mb-4">Primer paso: listar los números naturales comprendidos entre 2 hasta el número que se desee, en este caso, hasta el {{ numberToCheck }}.</p>
          
          <p>Click Step 1</p>
        </step>

        <step name="Step 2">
          <p class="mb-4">Segundo paso: Se toma el primer número no rayado ni marcado, como número primo.</p>

          <p>Click Step 2</p>
        </step>

        <step name="Step 3">
          <p class="mb-4">Tercer paso: Se tachan todos los múltiplos del número que se acaba de indicar como primo.</p>

          <p>Click Step 3</p>
        </step>

        <step name="Step 4">
          <p class="mb-4">Cuarto paso: Si el cuadrado del primer número que no ha sido rayado ni marcado es inferior a {{ numberToCheck }}, entonces se repite el segundo paso. Si no, el algoritmo termina, y todos los enteros no tachados son declarados primos.</p>

          <p class="mb-4">En este caso. {{ nextNumber }}^2 = {{ nextNumber * nextNumber}} {{ greaterThan }} {{ numberToCheck }}</p>

          <p v-if="!isEnd">Click Step 4 para volver al Step 2.</p>
          
          <p v-if="isEnd">Fin del algoritmo. Click Step 4.</p>
        </step>
      </steps>

      <list v-if="isList" class="flex flex-row flex-wrap border pl-4 pt-4 bg-grey-lighter" :end="isEnd">
        <item v-for="(item, key) in numberToCheck" :item="item" :key="key"></item>
      </list>
    </div>
  </div>
</template>

<script>


export default {
  name: 'app',

  data() {
    return {
      numberToCheck: null,
      alertBigNumber: false,
      isList: false,
      nextNumber: 2
    }
  },

  computed: {
    greaterThan() {
      if ((this.nextNumber * this.nextNumber) <= this.numberToCheck) {
        return '<=';
      } else {
        return '>';
      }
    },

    isEnd() {
      return ((this.nextNumber * this.nextNumber) >= this.numberToCheck);
    }
  },

  created() {
    // global events
    Event.$on('step-1', () => this.isList = true);
    Event.$on('next-number', (num) => this.nextNumber = num);
  },

  methods: {
    checkInput() {
      if (this.numberToCheck > 500) {
        this.numberToCheck = 500;

        this.alertBigNumber = true;
      } else {
        this.alertBigNumber = false;
      }
    },
  }
}
</script>
