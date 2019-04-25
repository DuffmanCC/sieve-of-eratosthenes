<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['end'],

  data() {
    return {
      nextNumber: 2,
    }
  },

  created() {
    Event.$on('step-2', () => {
      this.setPrime(this.nextNumber);
    });

    Event.$on('step-3', () => {
      this.setMultipleOf(this.nextNumber);
      this.calcNextNumber();
    });

    Event.$on('step-4', () => {
      if (this.end) {
        this.setAllAsPrime(this.nextNumber);
      }      
    });
  },

  updated() {

  },

  methods: {
    calcNextNumber() {
      for (let i = 2; i < this.$children.length; i++) {
        if (this.$children[i-1].isPrime == false && this.$children[i-1].isMultiple == false) {
          this.nextNumber = this.$children[i-1].item;

          Event.$emit('next-number', this.nextNumber);

          console.log(this.nextNumber);

          break;
        }
      }
    },

    setPrime(num) {
      this.$children[num - 1].isPrime = true;
    },

    setMultipleOf(num) {
      for (let i = num; i <= this.$children.length; i = i + num) {
        if (!this.$children[i - 1].isPrime) {
          this.$children[i - 1].isMultiple = true;
        }     
      }
    },

    setAllAsPrime(num) {      
      for (let i = num; i <= this.$children.length; i++) {
        if (!this.$children[i - 1].isPrime && !this.$children[i - 1].isMultiple) {
          this.$children[i - 1].isPrime= true;
        }     
      }    
    }
  }
} 
</script>

