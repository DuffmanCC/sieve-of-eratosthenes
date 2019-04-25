<template>
  <div>
    <div class="mb-12 flex justify-between">
      <button 
        class="border rounded py-2 px-8 text-white font-thin opacity-50"
        :class="[step.isActive ? 'bg-blue opacity-100' : 'bg-blue opacity-50 cursor-not-allowed']"
        v-for="(step, key) in steps"
        :key="key"
        @click="selectStep(step)"
        :disabled="!step.isActive"
      >
        {{ step.name }}
      </button>
    </div>

    <div class="mb-12 p-12 border rounded bg-grey-lighter">
      <slot></slot>
    </div>  
  </div>
</template>

<script>
  export default {
    props: ['end'],

    data() {
      return {
        steps: [],
      }
    },

    mounted() {
      this.steps = this.$children;

      this.steps.forEach((step) => {
        step.isActive = (step.name == 'Step 1');
      })
    },

    methods: {
      selectStep(selectedStep) {
        if (selectedStep.name == 'Step 1') {
          Event.$emit('step-1');

          this.steps.forEach((step) => {
            step.isActive = (step.name == 'Step 2');
          })
        }

        if (selectedStep.name == 'Step 2') {
          Event.$emit('step-2');

          this.steps.forEach((step) => {
            step.isActive = (step.name == 'Step 3');
          })
        }

        if (selectedStep.name == 'Step 3') {
          Event.$emit('step-3');

          this.steps.forEach((step) => {
            step.isActive = (step.name == 'Step 4');
          })
        }

        if (selectedStep.name == 'Step 4') {
          Event.$emit('step-4');

          if (!this.end) {
            this.steps.forEach((step) => {
              step.isActive = (step.name == 'Step 2');
            })
          }
        }
      },
    }
  }
</script>