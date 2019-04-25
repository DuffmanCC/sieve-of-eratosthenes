<template>
  <div id="app" class="h-screen w-screen font-thin">
    <div class="container py-32">
      <div class="mb-12">
        <label class="mr-2">Enter a number:</label>

        <input type="number" @keyup="checkInput" class="border p-2 mb-2" v-model.number="numberToCheck">

        <p v-if="alertBigNumber" class="italic text-sm text-grey-dark thin">That's to big! enter a number under 500</p>
      </div>

      <steps :end="isEnd" :numberToCheck="numberToCheck">
        <step name="Step 1">
          <p class="mb-4">Step 1: list the natural numbers between 2 and the desired number, in this case, up to {{ numberToCheck }}.</p>
          
          <p>Click Step 1</p>
        </step>

        <step name="Step 2">
          <p class="mb-4">Step 2: take the first number not scratched or marked as a prime number.</p>

          <p>Click Step 2</p>
        </step>

        <step name="Step 3">
          <p class="mb-4">Step 3: all the multiples of the number just indicated as a prime are crossed out.</p>

          <p>Click Step 3</p>
        </step>

        <step name="Step 4">
          <p class="mb-4">Step 4: If the square of the first number that has not been scratched or marked is less than {{ numberToCheck }}, then the second step is repeated. If not, the algorithm ends and all uncross out integers are declared as prime numbers.</p>

          <p class="mb-4">In this case. {{ nextNumber }}^2 = {{ nextNumber * nextNumber}} {{ greaterThan }} {{ numberToCheck }}</p>

          <p v-if="!isEnd">Click Step 4 to go back to Step 2.</p>
          
          <p v-if="isEnd">End of the algorithm. Click Step 4.</p>
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
