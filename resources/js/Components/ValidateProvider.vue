<template>
  <div class="form-group">
    <label :for="name">{{ label }}</label>
    <input
      :id="name"
      :name="name"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :class="inputClass"
      @input="onInput"
      @blur="onBlur"
    />
    <span v-if="showError" class="error-text"> {{ name + ' ' + ' ' + 'is required' }}</span>
  </div>
</template>

<script>
export default {
  name: "FormInput",
  props: {
    modelValue: String,
    label: String,
    name: String,
    type: {
      type: String,
      default: "text",
    },
    placeholder: String,
    required: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isTouched: false,
    };
  },
  computed: {
    showError() {
      return this.required && this.isTouched && !this.modelValue;
    },
    inputClass() {
      return {
        "border-red-500": this.showError,
        "border-gray-300": !this.showError,
      };
    },
  },
  methods: {
    onInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
    onBlur() {
      this.isTouched = true;
    },
  },
};
</script>

<style scoped>

input {
  width: 100%;
  padding: 0.5rem;
  border-width: 1px;
  border-style: solid;
}
.error-text {
  color: red;
  font-size: 0.875rem;
}
</style>
